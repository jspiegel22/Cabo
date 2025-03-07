import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sendBookingConfirmation } from '../../../../utils/activeCampaign';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      restaurantId,
      restaurantName,
      date,
      time,
      guests,
      name,
      email,
      phone,
      specialRequests,
    } = body;

    // Validate required fields
    if (!restaurantId || !restaurantName || !date || !time || !guests || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Integrate with actual restaurant booking system
    // For now, simulate a booking response
    const isAvailable = Math.random() > 0.3; // 70% chance of availability

    if (isAvailable) {
      // Split full name into first and last name
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');

      // Send booking confirmation via ActiveCampaign
      try {
        await sendBookingConfirmation(
          {
            email,
            firstName,
            lastName,
            phone,
          },
          {
            restaurantName,
            date,
            time,
            guests,
            specialRequests,
          }
        );
      } catch (error) {
        console.error('Failed to send booking confirmation:', error);
        // Continue with the booking process even if notification fails
      }

      return NextResponse.json({
        available: true,
        message: 'Your table is available! Please confirm your booking.',
      });
    }

    // If not available, provide alternative times and dates
    const alternativeTimes = ['18:30', '19:30', '20:30'].filter(t => t !== time);
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(date);
    dayAfter.setDate(dayAfter.getDate() + 2);

    return NextResponse.json({
      available: false,
      message: 'Unfortunately, this time slot is not available. Here are some alternatives:',
      alternativeTimes,
      alternativeDates: [
        tomorrow.toISOString().split('T')[0],
        dayAfter.toISOString().split('T')[0],
      ],
      suggestedRestaurants: [
        {
          id: 2,
          name: 'Nobu Los Cabos',
          reason: 'Similar cuisine and ambiance, available at your requested time',
        },
        {
          id: 3,
          name: 'El Farallon',
          reason: 'Also offers ocean views and is available at your requested time',
        },
      ],
    });
  } catch (error) {
    console.error('Error processing booking request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 