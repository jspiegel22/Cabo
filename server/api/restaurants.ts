import express from 'express';
import { checkAvailability } from '../services/ai-concierge';
import { restaurants } from '../data/restaurants';

const router = express.Router();

// Get all restaurants
router.get('/', (req, res) => {
  res.json(restaurants);
});

// Get a specific restaurant
router.get('/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  res.json(restaurant);
});

// Check availability and create booking
router.post('/check-availability', async (req, res) => {
  try {
    const {
      restaurantId,
      date,
      time,
      guests,
      name,
      email,
      phone,
      specialRequests,
    } = req.body;

    // Validate required fields
    if (!restaurantId || !date || !time || !guests || !name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if restaurant exists and supports availability check
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    if (!restaurant.availabilityCheck) {
      return res.status(400).json({ error: 'Restaurant does not support online booking' });
    }

    // Check availability using AI concierge
    const availability = await checkAvailability({
      restaurantId,
      date,
      time,
      guests,
      name,
      email,
      phone,
      specialRequests,
    });

    res.json(availability);
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 