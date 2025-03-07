export interface Guide {
  id: number;
  title: string;
  description: string;
  image: string;
  downloadUrl: string;
  format: string;
  size: string;
  category: 'restaurants' | 'villas' | 'yachts' | 'adventures';
  topics: string[];
  pages: number;
  language: string;
  lastUpdated: string;
}

export const guides: Guide[] = [
  {
    id: 1,
    title: "Los Cabos Fine Dining Guide 2024",
    description: "Discover the best restaurants, hidden gems, and culinary experiences in Los Cabos. Includes chef interviews, wine pairing tips, and seasonal specialties.",
    image: "/images/guides/dining-guide-cover.jpg",
    downloadUrl: "/guides/los-cabos-dining-guide-2024.pdf",
    format: "PDF",
    size: "4.2 MB",
    category: "restaurants",
    topics: ["Restaurant Reviews", "Wine Pairing", "Chef Interviews", "Local Ingredients", "Seasonal Menus"],
    pages: 45,
    language: "English",
    lastUpdated: "2024-03-01",
  },
  {
    id: 2,
    title: "Ultimate Wine Lover's Guide to Los Cabos",
    description: "Expert recommendations for wine tasting, vineyard tours, and the best wine lists in Los Cabos restaurants. Perfect for oenophiles!",
    image: "/images/guides/wine-guide-cover.jpg",
    downloadUrl: "/guides/wine-lovers-guide.pdf",
    format: "PDF",
    size: "3.8 MB",
    category: "restaurants",
    topics: ["Wine Lists", "Vineyard Tours", "Wine Pairing", "Storage Tips", "Tasting Notes"],
    pages: 32,
    language: "English",
    lastUpdated: "2024-02-15",
  },
  {
    id: 3,
    title: "Los Cabos Restaurant Reservation Tips",
    description: "Insider tips for securing reservations at the most exclusive restaurants in Los Cabos, including best times to book and seasonal considerations.",
    image: "/images/guides/reservation-guide-cover.jpg",
    downloadUrl: "/guides/reservation-tips.pdf",
    format: "PDF",
    size: "2.5 MB",
    category: "restaurants",
    topics: ["Booking Strategies", "Peak Seasons", "Special Occasions", "Private Dining", "Group Bookings"],
    pages: 28,
    language: "English",
    lastUpdated: "2024-01-20",
  }
]; 