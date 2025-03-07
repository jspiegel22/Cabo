export interface Restaurant {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  features: string[];
  link: string;
  cuisine: string;
  location: string;
  availabilityCheck: boolean;
  capacity: number;
  openingHours: {
    [key: string]: string;
  };
  averageDuration: number; // in minutes
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    title: 'Sunset Monalisa',
    description: 'World-renowned fine dining with breathtaking views of the Cabo San Lucas arch. Mediterranean cuisine crafted with local ingredients.',
    image: '/images/restaurant-1.jpg',
    price: '$$$$',
    rating: 4.9,
    features: ['Fine Dining', 'Ocean View', 'Mediterranean', 'Wine List', 'Sunset Views'],
    link: '/restaurants/sunset-monalisa',
    cuisine: 'Mediterranean',
    location: 'Cabo San Lucas',
    availabilityCheck: true,
    capacity: 120,
    openingHours: {
      Monday: '17:00-23:00',
      Tuesday: '17:00-23:00',
      Wednesday: '17:00-23:00',
      Thursday: '17:00-23:00',
      Friday: '17:00-23:00',
      Saturday: '17:00-23:00',
      Sunday: '17:00-23:00',
    },
    averageDuration: 120,
  },
  {
    id: 2,
    title: 'Nobu Los Cabos',
    description: 'Legendary Chef Nobu Matsuhisa's Japanese fusion cuisine in an elegant oceanfront setting at Nobu Hotel Los Cabos.',
    image: '/images/restaurant-2.jpg',
    price: '$$$$',
    rating: 4.8,
    features: ['Japanese Fusion', 'Ocean View', 'Celebrity Chef', 'Sushi Bar', 'Fine Dining'],
    link: '/restaurants/nobu-los-cabos',
    cuisine: 'Japanese Fusion',
    location: 'Pacific Beach',
    availabilityCheck: true,
    capacity: 150,
    openingHours: {
      Monday: '18:00-23:00',
      Tuesday: '18:00-23:00',
      Wednesday: '18:00-23:00',
      Thursday: '18:00-23:00',
      Friday: '18:00-00:00',
      Saturday: '18:00-00:00',
      Sunday: '18:00-23:00',
    },
    averageDuration: 90,
  },
  {
    id: 3,
    title: 'El Farallon',
    description: 'Cliffside seafood restaurant offering the day's catch and champagne terrace with stunning ocean views.',
    image: '/images/restaurant-3.jpg',
    price: '$$$$',
    rating: 4.9,
    features: ['Seafood', 'Ocean View', 'Champagne Bar', 'Fresh Catch', 'Romantic'],
    link: '/restaurants/el-farallon',
    cuisine: 'Seafood',
    location: 'Pedregal',
    availabilityCheck: true,
    capacity: 80,
    openingHours: {
      Monday: '17:00-22:00',
      Tuesday: '17:00-22:00',
      Wednesday: '17:00-22:00',
      Thursday: '17:00-22:00',
      Friday: '17:00-22:00',
      Saturday: '17:00-22:00',
      Sunday: '17:00-22:00',
    },
    averageDuration: 120,
  },
  {
    id: 4,
    title: 'Cocina del Mar',
    description: 'Perched on the cliffs of Esperanza Resort, offering fresh seafood and organic ingredients with panoramic ocean views.',
    image: '/images/restaurant-4.jpg',
    price: '$$$$',
    rating: 4.8,
    features: ['Seafood', 'Ocean View', 'Fine Dining', 'Organic', 'Romantic'],
    link: '/restaurants/cocina-del-mar',
    cuisine: 'Seafood',
    location: 'The Corridor',
    availabilityCheck: true,
    capacity: 100,
    openingHours: {
      Monday: '17:30-22:30',
      Tuesday: '17:30-22:30',
      Wednesday: '17:30-22:30',
      Thursday: '17:30-22:30',
      Friday: '17:30-23:00',
      Saturday: '17:30-23:00',
      Sunday: '17:30-22:30',
    },
    averageDuration: 90,
  },
  {
    id: 5,
    title: 'Don Manuel's',
    description: 'Traditional Mexican cuisine with a modern twist, located in the luxurious Capella Pedregal resort.',
    image: '/images/restaurant-5.jpg',
    price: '$$$',
    rating: 4.7,
    features: ['Mexican', 'Ocean View', 'Fine Dining', 'Wine List', 'Traditional'],
    link: '/restaurants/don-manuels',
    cuisine: 'Mexican',
    location: 'Pedregal',
    availabilityCheck: true,
    capacity: 90,
    openingHours: {
      Monday: '18:00-23:00',
      Tuesday: '18:00-23:00',
      Wednesday: '18:00-23:00',
      Thursday: '18:00-23:00',
      Friday: '18:00-23:00',
      Saturday: '18:00-23:00',
      Sunday: '18:00-23:00',
    },
    averageDuration: 90,
  },
  {
    id: 6,
    title: 'Salvatore's Restaurant',
    description: 'Authentic Italian cuisine in an elegant setting with an extensive wine collection and homemade pasta.',
    image: '/images/restaurant-6.jpg',
    price: '$$$',
    rating: 4.7,
    features: ['Italian', 'Wine List', 'Homemade Pasta', 'Romantic', 'Fine Dining'],
    link: '/restaurants/salvatores',
    cuisine: 'Italian',
    location: 'San José del Cabo',
    availabilityCheck: true,
    capacity: 70,
    openingHours: {
      Monday: '17:30-22:30',
      Tuesday: '17:30-22:30',
      Wednesday: '17:30-22:30',
      Thursday: '17:30-22:30',
      Friday: '17:30-23:00',
      Saturday: '17:30-23:00',
      Sunday: '17:30-22:30',
    },
    averageDuration: 90,
  },
]; 