import React from 'react';
import { Star } from 'lucide-react';

interface ItemCardProps {
  title: string;
  description: string;
  image: string;
  price: string;
  rating?: number;
  features?: string[];
  link: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  title,
  description,
  image,
  price,
  rating,
  features,
  link,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {rating && (
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {features.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-blue-600 font-semibold">{price}</div>
          <a
            href={link}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}; 