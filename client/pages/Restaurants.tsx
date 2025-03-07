import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import { ItemCard } from '../components/ItemCard';
import { Filter, SortAsc, SortDesc, MapPin, Calendar, Book } from 'lucide-react';
import { checkAvailability, getRestaurants } from '../api/restaurants';
import { ReviewSection } from '../components/ReviewSection';
import { DigitalGuide } from '../components/DigitalGuide';
import type { Restaurant } from '../../server/data/restaurants';
import { reviews, reviewStats } from '../../server/data/reviews';
import { guides } from '../../server/data/guides';

const Restaurants: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError('Failed to load restaurants');
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Filter restaurants based on selected criteria
  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      if (selectedCuisine && restaurant.cuisine !== selectedCuisine) return false;
      if (selectedPrice && restaurant.price !== selectedPrice) return false;
      return true;
    })
    .sort((a, b) => {
      const priceA = a.price.length;
      const priceB = b.price.length;
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

  if (loading) {
    return (
      <PageLayout
        title="Fine Dining"
        description="Experience world-class cuisine in Los Cabos"
        backgroundImage="/images/restaurants-hero.jpg"
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
        title="Fine Dining"
        description="Experience world-class cuisine in Los Cabos"
        backgroundImage="/images/restaurants-hero.jpg"
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
      title="Fine Dining"
      description="Experience world-class cuisine in Los Cabos"
      backgroundImage="/images/restaurants-hero.jpg"
    >
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Prime Locations</h3>
          <p className="text-gray-600">Oceanfront and city views</p>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Easy Booking</h3>
          <p className="text-gray-600">Real-time availability</p>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Book className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Expert Guides</h3>
          <p className="text-gray-600">Local recommendations</p>
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
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
          >
            <option value="">Cuisine Type</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Japanese">Japanese</option>
            <option value="Seafood">Seafood</option>
            <option value="Mexican">Mexican</option>
            <option value="Italian">Italian</option>
          </select>
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">Price Range</option>
            <option value="$">$ (Under $30)</option>
            <option value="$$">$$ ($31-60)</option>
            <option value="$$$">$$$ ($61-100)</option>
            <option value="$$$$">$$$$ (Over $100)</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Location</option>
            <option value="cabo-san-lucas">Cabo San Lucas</option>
            <option value="san-jose-del-cabo">San José del Cabo</option>
            <option value="corridor">The Corridor</option>
            <option value="pacific">Pacific Side</option>
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

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="relative">
            <ItemCard
              title={restaurant.title}
              description={restaurant.description}
              image={restaurant.image}
              price={restaurant.price}
              rating={restaurant.rating}
              features={restaurant.features}
              link={restaurant.link}
            />
            <button
              onClick={() => {
                setSelectedRestaurant(restaurant);
                setIsBookingModalOpen(true);
              }}
              className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <ReviewSection reviews={reviews} stats={reviewStats} />
      </div>

      {/* Digital Guides Section */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Free Dining Guides</h2>
            <p className="text-gray-600 mt-2">
              Download our expert guides for the best dining experiences in Los Cabos
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides
            .filter(guide => guide.category === 'restaurants')
            .map(guide => (
              <DigitalGuide
                key={guide.id}
                title={guide.title}
                description={guide.description}
                image={guide.image}
                downloadUrl={guide.downloadUrl}
                format={guide.format}
                size={guide.size}
              />
            ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Book With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">2.5K+</div>
            <div className="font-semibold mb-1">Happy Diners</div>
            <p className="text-gray-600 text-sm">Monthly reservations</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="font-semibold mb-1">Partner Restaurants</div>
            <p className="text-gray-600 text-sm">Exclusive partnerships</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
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

      {/* Additional Information */}
      <div className="mt-16 bg-white rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Dining in Los Cabos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">World-Class Cuisine</h3>
            <p className="text-gray-600">
              Experience dishes from renowned chefs and award-winning restaurants.
              From fresh seafood to authentic Mexican cuisine, every meal is an adventure.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Ocean Views</h3>
            <p className="text-gray-600">
              Dine with spectacular views of the Pacific Ocean and Sea of Cortez.
              Many restaurants offer sunset views and al fresco dining options.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">VIP Service</h3>
            <p className="text-gray-600">
              Enjoy priority reservations, personalized dining experiences, and
              exclusive access to chef's tables and wine cellars.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">What's the dress code?</h3>
            <p className="text-gray-600">
              Most fine dining restaurants require smart casual attire. We recommend
              collared shirts for men and elegant resort wear for women.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">How far in advance should I book?</h3>
            <p className="text-gray-600">
              For popular restaurants, we recommend booking at least 1-2 weeks in
              advance, especially during peak season (December-April).
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">Can you accommodate dietary restrictions?</h3>
            <p className="text-gray-600">
              Yes, most restaurants can accommodate various dietary requirements.
              Please mention any restrictions when making your reservation.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">Is transportation available?</h3>
            <p className="text-gray-600">
              Yes, we can arrange luxury transportation to and from your restaurant
              of choice. Just request this service when booking.
            </p>
          </div>
        </div>
      </div>

      {selectedRestaurant && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedRestaurant(null);
          }}
          restaurant={selectedRestaurant}
        />
      )}
    </PageLayout>
  );
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, restaurant }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [bookingResponse, setBookingResponse] = useState<{
    available: boolean;
    message: string;
    alternativeTimes?: string[];
    alternativeDates?: string[];
    suggestedRestaurants?: { id: number; name: string; reason: string; }[];
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);

    try {
      const response = await checkAvailability({
        restaurantId: restaurant.id,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequests,
      });

      setBookingResponse(response);
      setStep(3);
    } catch (error) {
      console.error('Error checking availability:', error);
      setBookingResponse({
        available: false,
        message: 'Failed to check availability. Please try again.',
      });
      setStep(3);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{restaurant.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                >
                  <option value="">Select time</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Special Requests</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Check Availability
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">
              Checking availability with the restaurant...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Our AI concierge is confirming your reservation details.
            </p>
          </div>
        )}

        {step === 3 && bookingResponse && (
          <div className="py-6">
            <div className={`mb-6 p-4 rounded-lg ${
              bookingResponse.available ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'
            }`}>
              <p className="text-lg font-medium mb-2">
                {bookingResponse.available ? '✓ Available' : '⚠ Not Available'}
              </p>
              <p>{bookingResponse.message}</p>
            </div>

            {bookingResponse.alternativeTimes && bookingResponse.alternativeTimes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Alternative Times Available:</h3>
                <div className="flex flex-wrap gap-2">
                  {bookingResponse.alternativeTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, time })}
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingResponse.alternativeDates && bookingResponse.alternativeDates.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Alternative Dates Available:</h3>
                <div className="flex flex-wrap gap-2">
                  {bookingResponse.alternativeDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setFormData({ ...formData, date })}
                      className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {new Date(date).toLocaleDateString()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bookingResponse.suggestedRestaurants && bookingResponse.suggestedRestaurants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Similar Restaurants:</h3>
                <div className="space-y-2">
                  {bookingResponse.suggestedRestaurants.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <p className="font-medium">{suggestion.name}</p>
                      <p className="text-sm text-gray-600">{suggestion.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Try Different Time
              </button>
              {bookingResponse.available && (
                <button
                  onClick={() => {
                    // Here we would handle the actual booking
                    alert('Booking confirmed! You will receive a confirmation email shortly.');
                    onClose();
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants; 