export interface VillaReview {
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
}

export interface VillaRates {
  lowSeason: number;
  highSeason: number;
  peakSeason: number;
}

export interface VillaAvailability {
  unavailableDates: string[];
  minimumStay: number;
}

export interface Villa {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxOccupancy: number;
  squareFeet: number;
  amenities: string[];
  rates: VillaRates;
  images: string[];
  features: string[];
  reviews: {
    rating: number;
    total: number;
    items: VillaReview[];
  };
  availability: VillaAvailability;
} 