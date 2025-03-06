import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { ItemCard } from '../components/ItemCard';

// Sample data - replace with actual API data
const yachts = [
  {
    id: 1,
    title: 'Ocean Symphony',
    description: 'Luxurious 100ft yacht with spacious deck, professional crew, and state-of-the-art entertainment system.',
    image: '/images/yacht-1.jpg',
    price: '$5,000/day',
    rating: 4.9,
    features: ['100ft', '12 Guests', 'Full Crew', 'Bar', 'Water Toys'],
    link: '/yachts/ocean-symphony',
  },
  {
    id: 2,
    title: 'Sea Breeze',
    description: 'Modern 80ft yacht perfect for day trips and sunset cruises around Cabo San Lucas.',
    image: '/images/yacht-2.jpg',
    price: '$3,500/day',
    rating: 4.8,
    features: ['80ft', '8 Guests', 'Crew of 4', 'Jet Skis', 'Snorkeling'],
    link: '/yachts/sea-breeze',
  },
  {
    id: 3,
    title: 'Cabo Luxury',
    description: 'Elegant 120ft superyacht with multiple decks, jacuzzi, and gourmet dining experience.',
    image: '/images/yacht-3.jpg',
    price: '$8,000/day',
    rating: 5.0,
    features: ['120ft', '15 Guests', 'Full Crew', 'Jacuzzi', 'Chef'],
    link: '/yachts/cabo-luxury',
  },
];

export const Yachts: React.FC = () => {
  return (
    <PageLayout
      title="Luxury Yacht Charters"
      description="Set sail in style with our premium yacht experiences in Cabo San Lucas"
      backgroundImage="/images/yachts-hero.jpg"
    >
      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Yacht Size</option>
          <option value="50-80">50-80 ft</option>
          <option value="80-100">80-100 ft</option>
          <option value="100+">100+ ft</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Guest Capacity</option>
          <option value="1-8">1-8 Guests</option>
          <option value="9-12">9-12 Guests</option>
          <option value="13+">13+ Guests</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Duration</option>
          <option value="half-day">Half Day</option>
          <option value="full-day">Full Day</option>
          <option value="multi-day">Multi Day</option>
        </select>
      </div>

      {/* Yacht Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {yachts.map((yacht) => (
          <ItemCard
            key={yacht.id}
            title={yacht.title}
            description={yacht.description}
            image={yacht.image}
            price={yacht.price}
            rating={yacht.rating}
            features={yacht.features}
            link={yacht.link}
          />
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Why Charter with Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Professional Crew</h3>
            <p className="text-gray-600">
              Experienced captains and crew members dedicated to your safety and enjoyment.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Premium Fleet</h3>
            <p className="text-gray-600">
              Meticulously maintained yachts equipped with the latest amenities and safety features.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Customized Experience</h3>
            <p className="text-gray-600">
              Tailor your journey with custom itineraries, catering, and activities.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}; 