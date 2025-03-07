export interface VillaAmenity {
  name: string;
  icon: string;
  description?: string;
}

export interface VillaRate {
  seasonName: string;
  startDate: string;
  endDate: string;
  minNights: number;
  nightly: number;
  weekly?: number;
}

export interface VillaReview {
  id: number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
  source: 'Direct' | 'VRBO' | 'Airbnb' | 'TripAdvisor';
  language: string;
  helpful: number;
  stayDate: string;
  tags: string[];
}

export interface Villa {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: {
    area: string;
    resort?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    squareFeet: number;
    stories: number;
  };
  amenities: VillaAmenity[];
  images: {
    main: string;
    gallery: string[];
  };
  rates: VillaRate[];
  features: string[];
  reviews: VillaReview[];
  stats: {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
      [key: number]: number;
    };
  };
  availability: {
    nextAvailable: string;
    bookedDates: string[];
  };
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    deposit: string;
    pets: boolean;
    smoking: boolean;
    events: boolean;
  };
  staff: {
    included: string[];
    additional: {
      name: string;
      pricePerDay: number;
    }[];
  };
}

export const villas: Villa[] = [
  {
    id: 1,
    name: "Villa Vista Ballena",
    slug: "villa-vista-ballena",
    description: "Perched on a cliff in the exclusive Pedregal community, Villa Vista Ballena offers breathtaking views of the Pacific Ocean and Cabo San Lucas. This stunning 6-bedroom villa combines modern luxury with traditional Mexican architecture.",
    shortDescription: "Luxury 6-bedroom villa with ocean views in Pedregal",
    location: {
      area: "Pedregal",
      coordinates: {
        lat: 22.885841,
        lng: -109.916119
      }
    },
    specs: {
      bedrooms: 6,
      bathrooms: 6.5,
      maxGuests: 12,
      squareFeet: 6500,
      stories: 3
    },
    amenities: [
      {
        name: "Infinity Pool",
        icon: "pool",
        description: "Heated infinity pool overlooking the Pacific Ocean"
      },
      {
        name: "Home Theater",
        icon: "theater",
        description: "Professional-grade theater room with 85-inch TV"
      },
      {
        name: "Chef's Kitchen",
        icon: "kitchen",
        description: "Gourmet kitchen with professional-grade appliances"
      },
      {
        name: "Gym",
        icon: "gym",
        description: "Private fitness center with ocean views"
      }
    ],
    images: {
      main: "/images/villas/vista-ballena/main.jpg",
      gallery: [
        "/images/villas/vista-ballena/living.jpg",
        "/images/villas/vista-ballena/pool.jpg",
        "/images/villas/vista-ballena/kitchen.jpg",
        "/images/villas/vista-ballena/master.jpg",
        "/images/villas/vista-ballena/theater.jpg",
        "/images/villas/vista-ballena/gym.jpg"
      ]
    },
    rates: [
      {
        seasonName: "Low Season",
        startDate: "2024-05-01",
        endDate: "2024-10-31",
        minNights: 3,
        nightly: 2500,
        weekly: 15000
      },
      {
        seasonName: "High Season",
        startDate: "2024-11-01",
        endDate: "2024-12-14",
        minNights: 4,
        nightly: 3500,
        weekly: 21000
      },
      {
        seasonName: "Holiday Season",
        startDate: "2024-12-15",
        endDate: "2025-01-05",
        minNights: 7,
        nightly: 5000
      }
    ],
    features: [
      "Ocean Views",
      "Private Pool",
      "Beach Access",
      "Home Theater",
      "Fitness Center",
      "Full Staff",
      "Gated Community",
      "24/7 Security"
    ],
    reviews: [
      {
        id: 1,
        author: "Michael S.",
        rating: 5,
        date: "2024-02-15",
        title: "Absolutely Perfect Luxury Experience",
        content: "We couldn't have asked for a better experience. The villa is stunning, the staff was incredible, and the views are unmatched. The chef prepared amazing meals and the concierge arranged all our activities perfectly.",
        verified: true,
        source: "Direct",
        language: "en",
        helpful: 12,
        stayDate: "2024-02-01",
        tags: ["Family Vacation", "Ocean Views", "Great Staff"]
      }
    ],
    stats: {
      averageRating: 4.9,
      totalReviews: 45,
      ratingDistribution: {
        5: 40,
        4: 4,
        3: 1,
        2: 0,
        1: 0
      }
    },
    availability: {
      nextAvailable: "2024-04-15",
      bookedDates: [
        "2024-03-20",
        "2024-03-21",
        "2024-03-22",
        "2024-04-01",
        "2024-04-02",
        "2024-04-03"
      ]
    },
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "60 days notice for full refund, 30 days for 50% refund",
      deposit: "50% due at booking, balance due 60 days prior to arrival",
      pets: false,
      smoking: false,
      events: true
    },
    staff: {
      included: [
        "House Manager",
        "Daily Housekeeping",
        "Pool Maintenance",
        "24/7 Security"
      ],
      additional: [
        {
          name: "Private Chef",
          pricePerDay: 350
        },
        {
          name: "Butler",
          pricePerDay: 250
        },
        {
          name: "Driver",
          pricePerDay: 300
        }
      ]
    }
  }
];

export const villaStats = {
  totalProperties: 156,
  averageRating: 4.8,
  totalBookings: 2547,
  topAmenities: [
    { name: "Private Pool", count: 142 },
    { name: "Ocean View", count: 128 },
    { name: "Chef's Kitchen", count: 115 },
    { name: "Beach Access", count: 89 },
    { name: "Home Theater", count: 76 }
  ],
  popularAreas: [
    { name: "Pedregal", count: 45 },
    { name: "Palmilla", count: 38 },
    { name: "Puerto Los Cabos", count: 29 },
    { name: "Cabo del Sol", count: 24 },
    { name: "Punta Ballena", count: 20 }
  ]
};