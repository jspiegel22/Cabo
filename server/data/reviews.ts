export interface Review {
  id: number;
  restaurantId: number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
  source: 'OpenTable' | 'Google' | 'Direct' | 'TripAdvisor';
  language: string;
  helpful: number;
  tags: string[];
}

export const reviews: Review[] = [
  {
    id: 1,
    restaurantId: 1,
    author: "Sarah M.",
    avatar: "/images/avatars/sarah-m.jpg",
    rating: 5,
    date: "2024-03-15",
    title: "Unforgettable Sunset Dining Experience",
    content: "The combination of world-class Mediterranean cuisine and the breathtaking sunset view of the Arch made this evening truly magical. The sommelier's wine pairing suggestions were perfect, and the service was impeccable.",
    images: ["/images/reviews/sunset-monalisa-1.jpg", "/images/reviews/sunset-monalisa-2.jpg"],
    verified: true,
    source: "OpenTable",
    language: "en",
    helpful: 45,
    tags: ["Sunset View", "Wine Pairing", "Special Occasion"]
  },
  {
    id: 2,
    restaurantId: 2,
    author: "James K.",
    avatar: "/images/avatars/james-k.jpg",
    rating: 5,
    date: "2024-03-10",
    title: "Nobu Never Disappoints",
    content: "Chef Nobu's signature dishes were exceptional as always. The black cod miso was perfectly prepared, and the oceanfront setting added an extra layer of luxury to the experience. Worth every penny!",
    verified: true,
    source: "Direct",
    language: "en",
    helpful: 32,
    tags: ["Celebrity Chef", "Japanese Fusion", "Ocean View"]
  },
  {
    id: 3,
    restaurantId: 3,
    author: "Maria R.",
    rating: 5,
    date: "2024-03-12",
    title: "Fresh Seafood Paradise",
    content: "El Farallon's catch of the day was incredible. The champagne terrace experience before dinner was a perfect start to the evening. The sound of the waves crashing below makes this place truly unique.",
    images: ["/images/reviews/el-farallon-1.jpg"],
    verified: true,
    source: "TripAdvisor",
    language: "en",
    helpful: 28,
    tags: ["Fresh Seafood", "Romantic", "Champagne"]
  }
];

export const reviewStats = {
  totalReviews: 2547,
  averageRating: 4.8,
  ratingDistribution: {
    5: 2012,
    4: 423,
    3: 89,
    2: 15,
    1: 8
  },
  topTags: [
    { name: "Ocean View", count: 1523 },
    { name: "Romantic", count: 1245 },
    { name: "Fine Dining", count: 1102 },
    { name: "Sunset", count: 987 },
    { name: "Wine Selection", count: 856 }
  ]
}; 