interface Contact {
  email: string;
  firstName: string;
  lastName?: string;
  phone: string;
}

interface BookingDetails {
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export async function addContact(contact: Contact) {
  const { email, firstName, lastName, phone } = contact;
  
  try {
    const response = await fetch(`${process.env.ACTIVE_CAMPAIGN_API_URL}/api/3/contacts`, {
      method: 'POST',
      headers: {
        'Api-Token': process.env.ACTIVE_CAMPAIGN_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          email,
          firstName,
          lastName,
          phone,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add contact to ActiveCampaign');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding contact to ActiveCampaign:', error);
    throw error;
  }
}

export async function sendBookingConfirmation(contact: Contact, booking: BookingDetails) {
  try {
    // First, ensure the contact exists in ActiveCampaign
    const contactResponse = await addContact(contact);
    const contactId = contactResponse.contact.id;

    // Trigger the booking confirmation automation
    const response = await fetch(`${process.env.ACTIVE_CAMPAIGN_API_URL}/api/3/contactAutomations`, {
      method: 'POST',
      headers: {
        'Api-Token': process.env.ACTIVE_CAMPAIGN_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactAutomation: {
          contact: contactId,
          automation: process.env.BOOKING_CONFIRMATION_AUTOMATION_ID,
        },
        fields: [
          { field: 'RESTAURANT', value: booking.restaurantName },
          { field: 'DATE', value: booking.date },
          { field: 'TIME', value: booking.time },
          { field: 'GUESTS', value: booking.guests.toString() },
          { field: 'SPECIAL_REQUESTS', value: booking.specialRequests || 'None' },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to trigger booking confirmation automation');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    throw error;
  }
}

export async function sendBookingReminder(contact: Contact, booking: BookingDetails) {
  try {
    // Trigger the booking reminder automation
    const response = await fetch(`${process.env.ACTIVE_CAMPAIGN_API_URL}/api/3/contactAutomations`, {
      method: 'POST',
      headers: {
        'Api-Token': process.env.ACTIVE_CAMPAIGN_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactAutomation: {
          contact: contact.email,
          automation: process.env.BOOKING_REMINDER_AUTOMATION_ID,
        },
        fields: [
          { field: 'RESTAURANT', value: booking.restaurantName },
          { field: 'DATE', value: booking.date },
          { field: 'TIME', value: booking.time },
          { field: 'GUESTS', value: booking.guests.toString() },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to trigger booking reminder automation');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending booking reminder:', error);
    throw error;
  }
} 