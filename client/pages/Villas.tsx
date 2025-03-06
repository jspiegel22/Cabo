import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { ItemCard } from '../components/ItemCard';

// Sample data - replace with actual API data
const villas = [
  {
    id: 1,
    title: 'Villa Esperanza',
    description: 'Luxurious 6-bedroom villa with stunning ocean views, infinity pool, and private chef service.',
    image: '/images/villa-1.jpg',
    price: '$2,500/night',
    rating: 4.9,
    features: ['6 Bedrooms', '7 Bathrooms', 'Ocean View', 'Private Pool', 'Chef Service'],
    link: '/villas/villa-esperanza',
  },
  {
    id: 2,
    title: 'Casa del Mar',
    description: 'Beachfront villa featuring modern architecture, private beach access, and panoramic views.',
    image: '/images/villa-2.jpg',
    price: '$3,200/night',
    rating: 4.8,
    features: ['5 Bedrooms', '5.5 Bathrooms', 'Beachfront', 'Infinity Pool', 'Home Theater'],
    link: '/villas/casa-del-mar',
  },
  {
    id: 3,
    title: 'Villa Luna',
    description: 'Contemporary hillside villa with spectacular sunset views and resort-style amenities.',
    image: '/images/villa-3.jpg',
    price: '$1,800/night',
    rating: 4.7,
    features: ['4 Bedrooms', '4 Bathrooms', 'Sunset View', 'Heated Pool', 'Gym'],
    link: '/villas/villa-luna',
  },
];

export const Villas: React.FC = () => {
  return (
    <PageLayout
      title="Luxury Villas in Cabo"
      description="Experience unparalleled comfort and elegance in our handpicked collection of luxury villas"
      backgroundImage="/images/villas-hero.jpg"
    >
      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Bedrooms</option>
          <option value="1-3">1-3 Bedrooms</option>
          <option value="4-6">4-6 Bedrooms</option>
          <option value="7+">7+ Bedrooms</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Price Range</option>
          <option value="0-1000">$0 - $1,000/night</option>
          <option value="1000-2500">$1,000 - $2,500/night</option>
          <option value="2500+">$2,500+/night</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Location</option>
          <option value="beachfront">Beachfront</option>
          <option value="downtown">Downtown</option>
          <option value="hillside">Hillside</option>
        </select>
      </div>

      {/* Villa Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {villas.map((villa) => (
          <ItemCard
            key={villa.id}
            title={villa.title}
            description={villa.description}
            image={villa.image}
            price={villa.price}
            rating={villa.rating}
            features={villa.features}
            link={villa.link}
          />
        ))}
      </div>
    </PageLayout>
  );
}; 