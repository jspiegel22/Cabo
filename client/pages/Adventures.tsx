import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { ItemCard } from '../components/ItemCard';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

// Sample data - replace with actual API data
const adventures = [
  {
    id: 1,
    title: 'Luxury Sunset Sailing',
    description: "Experience the magic of Cabo's sunset on a private sailing tour with champagne and gourmet appetizers.",
    image: '/images/adventure-1.jpg',
    price: '$299/person',
    rating: 4.9,
    features: ['3 Hours', 'Private Tour', 'Gourmet Food', 'Drinks Included', 'Sunset Views'],
    link: '/adventures/sunset-sailing',
  },
  {
    id: 2,
    title: 'Desert ATV Adventure',
    description: "Navigate through Baja's stunning desert landscape on premium ATVs with expert guides.",
    image: '/images/adventure-2.jpg',
    price: '$189/person',
    rating: 4.7,
    features: ['4 Hours', 'Equipment', 'Professional Guide', 'Scenic Route', 'Photo Stops'],
    link: '/adventures/atv-adventure',
  },
  {
    id: 3,
    title: 'Whale Watching Experience',
    description: 'Luxury whale watching expedition with marine biologist guide and gourmet lunch.',
    image: '/images/adventure-3.jpg',
    price: '$249/person',
    rating: 4.8,
    features: ['5 Hours', 'Expert Guide', 'Lunch', 'Premium Vessel', 'Photos Included'],
    link: '/adventures/whale-watching',
  },
];

const Adventures: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  return (
    <PageLayout
      title="Adventures in Cabo"
      description="Discover thrilling adventures in Cabo San Lucas"
      backgroundImage="/images/adventures-hero.jpg"
    >
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-4 py-2 bg-white border rounded-lg shadow-sm"
        >
          <span className="flex items-center gap-2">
            <Filter size={20} />
            Filters & Sorting
          </span>
          <span className="text-sm text-gray-500">
            {showFilters ? 'Hide' : 'Show'}
          </span>
        </button>
      </div>

      {/* Filters Section */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Duration</option>
            <option value="0-2">0-2 Hours</option>
            <option value="2-4">2-4 Hours</option>
            <option value="4+">4+ Hours</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Activity Level</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="challenging">Challenging</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Price Range</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">$200+</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? (
              <>
                <SortAsc size={20} />
                Price: Low to High
              </>
            ) : (
              <>
                <SortDesc size={20} />
                Price: High to Low
              </>
            )}
          </button>
        </div>
      </div>

      {/* Adventure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {adventures.map((adventure) => (
          <ItemCard
            key={adventure.id}
            title={adventure.title}
            description={adventure.description}
            image={adventure.image}
            price={adventure.price}
            rating={adventure.rating}
            features={adventure.features}
            link={adventure.link}
          />
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-16 bg-gray-50 rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Why Book with Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Expert Guides</h3>
            <p className="text-gray-600">
              Our experienced local guides ensure safe and memorable adventures.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Luxury Experience</h3>
            <p className="text-gray-600">
              Premium equipment, gourmet refreshments, and VIP treatment.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Flexible Booking</h3>
            <p className="text-gray-600">
              Easy rescheduling and 24/7 customer support for peace of mind.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Adventures; 