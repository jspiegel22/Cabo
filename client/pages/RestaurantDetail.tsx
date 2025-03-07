import React from 'react';
import { useRouter } from 'next/router';
import { restaurants } from '../../server/data/restaurants';
import { PageLayout } from '../components/PageLayout';
import { ReviewSection } from '../components/ReviewSection';
import { MapPin, Users, Star, Info, HelpCircle } from 'lucide-react';

const RestaurantDetail: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const restaurant = restaurants.find((r) => r.slug === slug);

  if (!restaurant) {
    return <p>Restaurant not found</p>;
  }

  // Adjust the stats to include topTags for compatibility
  const restaurantStats = {
    totalReviews: restaurant.reviews.length,
    averageRating: restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) / restaurant.reviews.length,
    ratingDistribution: restaurant.reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number }),
    topTags: restaurant.features.map((feature) => ({ name: feature, count: 1 })),
  };

  return (
    <PageLayout
      title={restaurant.title}
      description={restaurant.description}
      backgroundImage={restaurant.image}
    >
      {/* Hero Section */}
      <div className="bg-white/90 backdrop-blur rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{restaurant.title}</h1>
        <p className="text-gray-600 mb-4">{restaurant.description}</p>
        <div className="flex items-center gap-4">
          <MapPin className="w-6 h-6 text-blue-600" />
          <span>{restaurant.location}</span>
        </div>
      </div>

      {/* Key Facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Capacity</h3>
          <p className="text-gray-600">{restaurant.capacity} Guests</p>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Rating</h3>
          <p className="text-gray-600">{restaurantStats.averageRating.toFixed(1)} Stars</p>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Info className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Features</h3>
          <p className="text-gray-600">{restaurant.features.join(', ')}</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {restaurant.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
        <ReviewSection reviews={restaurant.reviews} stats={restaurantStats} />
      </div>

      {/* Social Proof */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Social Proof</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {restaurant.reviews.flatMap((review) => review.images || []).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`User image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <HelpCircle className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-2">What's included in the rate?</h3>
            <p className="text-gray-600">
              Our restaurant rates typically include a full dining experience with
              options for wine pairings and chef's specials.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <HelpCircle className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-2">How far in advance should I book?</h3>
            <p className="text-gray-600">
              For peak dining times, we recommend booking 1-2 weeks in advance.
              For special events, consider booking 1-2 months ahead.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <HelpCircle className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-2">What's the dress code?</h3>
            <p className="text-gray-600">
              Our restaurant maintains a smart casual dress code. We recommend
              collared shirts for men and elegant attire for women.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <HelpCircle className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-2">Is transportation available?</h3>
            <p className="text-gray-600">
              We offer transportation services to and from the restaurant for an
              additional fee. Please inquire when booking.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Information */}
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Dine?</h2>
        <p className="text-gray-600 mb-4">
          Contact our reservation team to secure your table at {restaurant.title}.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </PageLayout>
  );
};

export default RestaurantDetail; 