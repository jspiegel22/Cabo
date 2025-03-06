import React from 'react';
import { ChatWidget } from '../components/ChatWidget';

const categories = [
  {
    title: 'Luxury Villas',
    description: 'Experience unparalleled comfort in our handpicked luxury villas',
    image: '/images/villa.jpg',
    link: '/villas',
  },
  {
    title: 'Yacht Charters',
    description: 'Set sail in style with our premium yacht experiences',
    image: '/images/yacht.jpg',
    link: '/yachts',
  },
  {
    title: 'Adventures',
    description: 'Discover thrilling experiences in Cabo San Lucas',
    image: '/images/adventure.jpg',
    link: '/adventures',
  },
  {
    title: 'Hotels & Resorts',
    description: 'Stay in world-class hotels and resorts',
    image: '/images/hotel.jpg',
    link: '/hotels',
  },
  {
    title: 'Fine Dining',
    description: 'Savor exceptional cuisine at top-rated restaurants',
    image: '/images/restaurant.jpg',
    link: '/restaurants',
  },
  {
    title: 'Transportation',
    description: 'Travel in comfort with our luxury transportation services',
    image: '/images/transport.jpg',
    link: '/transportation',
  },
];

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/cabo-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Experience Luxury in Cabo
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Your gateway to exclusive villas, yachts, adventures, and more in Cabo San Lucas
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Explore Now
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Discover Cabo's Finest
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <a
              key={category.title}
              href={category.link}
              className="group relative h-96 overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-semibold mb-2">{category.title}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget userId={1} /> {/* Replace with actual user ID */}
    </div>
  );
}; 