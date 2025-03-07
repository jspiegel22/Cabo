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

export async function checkAvailability(request: BookingRequest): Promise<BookingResponse> {
  const response = await fetch('/api/restaurants/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to check availability');
  }

  return response.json();
}

export async function getRestaurants() {
  const response = await fetch('/api/restaurants');
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants');
  }
  return response.json();
}

export async function getRestaurant(id: number) {
  const response = await fetch(`/api/restaurants/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch restaurant');
  }
  return response.json();
} 