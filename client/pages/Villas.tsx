import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import { ItemCard } from '../components/ItemCard';
import { Filter, SortAsc, SortDesc, MapPin, Users, Star } from 'lucide-react';
import { villas, villaStats } from '../../server/data/villas';
import type { Villa } from '../../server/data/villas';

const Villas: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedBedrooms, setSelectedBedrooms] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter villas based on selected criteria
  const filteredVillas = villas
    .filter((villa) => {
      if (selectedArea && villa.location.area !== selectedArea) return false;
      if (selectedBedrooms && villa.specs.bedrooms !== parseInt(selectedBedrooms)) return false;
      if (selectedPriceRange) {
        const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
        const lowestRate = Math.min(...villa.rates.map(r => r.nightly));
        if (lowestRate < minPrice || lowestRate > maxPrice) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const priceA = Math.min(...a.rates.map(r => r.nightly));
      const priceB = Math.min(...b.rates.map(r => r.nightly));
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

  if (loading) {
    return (
      <PageLayout
        title="Luxury Villas"
        description="Experience the finest private villas in Los Cabos"
        backgroundImage="/images/villas-hero.jpg"
      >
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout
        title="Luxury Villas"
        description="Experience the finest private villas in Los Cabos"
        backgroundImage="/images/villas-hero.jpg"
      >
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Luxury Villas"
      description="Experience the finest private villas in Los Cabos"
      backgroundImage="/images/villas-hero.jpg"
    >
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Prime Locations</h3>
          <p className="text-gray-600">Oceanfront and hillside views</p>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Full Staff</h3>
          <p className="text-gray-600">Private chef and butler service</p>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">5-Star Amenities</h3>
          <p className="text-gray-600">Pools, spas, and more</p>
        </div>
      </div>

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
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">Location</option>
            {villaStats.popularAreas.map((area) => (
              <option key={area.name} value={area.name}>
                {area.name} ({area.count})
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedBedrooms}
            onChange={(e) => setSelectedBedrooms(e.target.value)}
          >
            <option value="">Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5 Bedrooms</option>
            <option value="6">6+ Bedrooms</option>
          </select>
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="1000-2500">$1,000 - $2,500/night</option>
            <option value="2500-5000">$2,500 - $5,000/night</option>
            <option value="5000-10000">$5,000 - $10,000/night</option>
            <option value="10000-999999">$10,000+/night</option>
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

      {/* Villas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredVillas.map((villa) => (
          <ItemCard
            key={villa.id}
            title={villa.name}
            description={villa.shortDescription}
            image={villa.images.main}
            price={`From $${Math.min(...villa.rates.map(r => r.nightly)).toLocaleString()}/night`}
            rating={villa.stats.averageRating}
            features={[
              `${villa.specs.bedrooms} BR`,
              `${villa.specs.bathrooms} BA`,
              `${villa.specs.maxGuests} Guests`,
              ...villa.features.slice(0, 2)
            ]}
            link={`/villas/${villa.slug}`}
          />
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Book With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{villaStats.totalProperties}</div>
            <div className="font-semibold mb-1">Luxury Villas</div>
            <p className="text-gray-600 text-sm">Hand-picked properties</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{villaStats.totalBookings}</div>
            <div className="font-semibold mb-1">Happy Guests</div>
            <p className="text-gray-600 text-sm">Last 12 months</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{villaStats.averageRating}</div>
            <div className="font-semibold mb-1">Average Rating</div>
            <p className="text-gray-600 text-sm">From verified reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="font-semibold mb-1">Concierge Support</div>
            <p className="text-gray-600 text-sm">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Popular Amenities */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Popular Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {villaStats.topAmenities.map((amenity) => (
            <div key={amenity.name} className="bg-white rounded-lg p-4 text-center">
              <div className="font-semibold mb-1">{amenity.name}</div>
              <p className="text-sm text-gray-600">{amenity.count} villas</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">What's included in the rate?</h3>
            <p className="text-gray-600">
              Our villa rates typically include daily housekeeping, concierge service,
              and basic utilities. Some villas also include a private chef and butler.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">How far in advance should I book?</h3>
            <p className="text-gray-600">
              For peak seasons (December-April), we recommend booking 6-12 months in
              advance. For other times, 3-6 months is usually sufficient.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">What's the booking process?</h3>
            <p className="text-gray-600">
              Select your dates, submit a booking request, and our team will confirm
              availability within 24 hours. A 50% deposit secures your reservation.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">Is transportation included?</h3>
            <p className="text-gray-600">
              Airport transfers can be arranged for an additional fee. Many villas
              also offer daily driver service or rental car arrangements.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Villas; 