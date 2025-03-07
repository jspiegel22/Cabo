import React from 'react';
import { Star, ThumbsUp, Award, CheckCircle } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
  source: 'OpenTable' | 'Google' | 'Direct' | 'TripAdvisor' | 'VRBO' | 'Airbnb';
  language: string;
  helpful: number;
  tags: string[];
}

interface ReviewSectionProps {
  reviews: Review[];
  stats: {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: {
      [key: number]: number;
    };
    topTags: {
      name: string;
      count: number;
    }[];
  };
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, stats }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const calculatePercentage = (count: number) => {
    return ((count / stats.totalReviews) * 100).toFixed(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(Math.round(stats.averageRating))}</div>
            <span className="text-lg font-semibold">{stats.averageRating}</span>
            <span className="text-gray-500">({stats.totalReviews} reviews)</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Write a Review
          </button>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {Object.entries(stats.ratingDistribution)
              .reverse()
              .map(([rating, count]) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="w-12">{rating} stars</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${calculatePercentage(count)}%` }}
                    ></div>
                  </div>
                  <span className="w-16 text-right text-gray-500">
                    {calculatePercentage(count)}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Popular Tags */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Most Mentioned</h3>
          <div className="flex flex-wrap gap-2">
            {stats.topTags.map((tag) => (
              <span
                key={tag.name}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {tag.name} ({tag.count})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              {review.avatar ? (
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-600">
                    {review.author[0]}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.author}</span>
                  {review.verified && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span>·</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                  <span>·</span>
                  <span>{review.source}</span>
                </div>
                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-gray-700 mb-4">{review.content}</p>
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-gray-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 pt-8 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-blue-600" />
            <div>
              <h4 className="font-semibold">Verified Reviews</h4>
              <p className="text-sm text-gray-600">All reviews are from real guests</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-400" />
            <div>
              <h4 className="font-semibold">{stats.averageRating} Average Rating</h4>
              <p className="text-sm text-gray-600">Based on {stats.totalReviews} reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThumbsUp className="w-8 h-8 text-green-600" />
            <div>
              <h4 className="font-semibold">95% Recommend</h4>
              <p className="text-sm text-gray-600">From verified guests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 