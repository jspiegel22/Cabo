import React from 'react';
import { useRouter } from 'next/router';
import { villas } from '../../server/data/villas';
import { PageLayout } from '../components/PageLayout';
import { ReviewSection } from '../components/ReviewSection';
import { MapPin, Users, Star, Image, Info, HelpCircle } from 'lucide-react';

const VillaDetail: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const villa = villas.find((v) => v.slug === slug);

  if (!villa) {
    return <p>Villa not found</p>;
  }

  // Adjust the stats to include topTags for compatibility
  const villaStats = {
    ...villa.stats,
    topTags: villa.features.map((feature) => ({ name: feature, count: 1 })),
  };

  return (
    <PageLayout
      title={villa.name}
      description={villa.shortDescription}
      backgroundImage={villa.images.main}
    >
      {/* Hero Section */}
      <div className="bg-white/90 backdrop-blur rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{villa.name}</h1>
        <p className="text-gray-600 mb-4">{villa.description}</p>
        <div className="flex items-center gap-4">
          <MapPin className="w-6 h-6 text-blue-600" />
          <span>{villa.location.area}</span>
        </div>
      </div>

      {/* Key Facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Capacity</h3>
          <p className="text-gray-600">{villa.specs.maxGuests} Guests</p>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Rating</h3>
          <p className="text-gray-600">{villa.stats.averageRating} Stars</p>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-lg p-6 text-center">
          <Info className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-1">Features</h3>
          <p className="text-gray-600">{villa.features.join(', ')}</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {villa.images.gallery.map((image, index) => (
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
        <ReviewSection reviews={villa.reviews} stats={villaStats} />
      </div>

      {/* Social Proof */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Social Proof</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {villa.reviews.flatMap((review) => review.images || []).map((image, index) => (
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
              Our villa rates typically include daily housekeeping, concierge service,
              and basic utilities. Some villas also include a private chef and butler.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <HelpCircle className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-2">How far in advance should I book?</h3>
            <p className="text-gray-600">
              For peak seasons (December-April), we recommend booking 6-12 months in
              advance. For other times, 3-6 months is usually sufficient.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <HelpCircle className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-2">What's the booking process?</h3>
            <p className="text-gray-600">
              Select your dates, submit a booking request, and our team will confirm
              availability within 24 hours. A 50% deposit secures your reservation.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6">
            <HelpCircle className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold mb-2">Is transportation included?</h3>
            <p className="text-gray-600">
              Airport transfers can be arranged for an additional fee. Many villas
              also offer daily driver service or rental car arrangements.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Information */}
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
        <p className="text-gray-600 mb-4">
          Contact our concierge team to secure your reservation at {villa.name}.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Contact Us
        </button>
      </div>
    </PageLayout>
  );
};

export default VillaDetail; 