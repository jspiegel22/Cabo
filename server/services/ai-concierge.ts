import OpenAI from 'openai';
import { restaurants } from '../data/restaurants';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface BookingRequest {
  restaurantId: number;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

interface BookingResponse {
  available: boolean;
  message: string;
  alternativeTimes?: string[];
  alternativeDates?: string[];
  suggestedRestaurants?: {
    id: number;
    name: string;
    reason: string;
  }[];
}

export async function checkAvailability(booking: BookingRequest): Promise<BookingResponse> {
  const restaurant = restaurants.find(r => r.id === booking.restaurantId);
  
  if (!restaurant) {
    return {
      available: false,
      message: 'Restaurant not found',
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are an AI concierge for luxury restaurants in Los Cabos. 
          Your role is to check restaurant availability and provide helpful suggestions.
          Consider factors like peak hours (7-9 PM), weekends, holidays, and seasonal demand.
          Be helpful and provide alternatives if the requested time is not available.`
        },
        {
          role: "user",
          content: `Check availability for ${restaurant.title}:
          Date: ${booking.date}
          Time: ${booking.time}
          Guests: ${booking.guests}
          Special Requests: ${booking.specialRequests || 'None'}
          
          Consider:
          - Restaurant capacity and typical availability
          - Similar restaurants if unavailable
          - Alternative times/dates
          - Special considerations for the number of guests
          - Any special requests`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;
    
    // Parse AI response to determine availability
    const isAvailable = !response?.toLowerCase().includes('not available') && 
                       !response?.toLowerCase().includes('fully booked');

    // Extract alternative times if mentioned
    const alternativeTimes = response?.match(/\b([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\b/g) || [];
    
    // Extract alternative dates if mentioned
    const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/g;
    const alternativeDates = response?.match(dateRegex) || [];

    // Extract suggested restaurants
    const suggestedRestaurants = restaurants
      .filter(r => r.id !== booking.restaurantId && response?.includes(r.title))
      .map(r => ({
        id: r.id,
        name: r.title,
        reason: 'Similar cuisine and atmosphere',
      }));

    return {
      available: isAvailable,
      message: response || 'Unable to process request',
      alternativeTimes: alternativeTimes.length > 0 ? alternativeTimes : undefined,
      alternativeDates: alternativeDates.length > 0 ? alternativeDates : undefined,
      suggestedRestaurants: suggestedRestaurants.length > 0 ? suggestedRestaurants : undefined,
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    return {
      available: false,
      message: 'Error checking availability. Please try again later.',
    };
  }
} 