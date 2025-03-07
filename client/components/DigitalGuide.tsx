import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';

interface DigitalGuideProps {
  title: string;
  description: string;
  image: string;
  downloadUrl: string;
  format: string;
  size: string;
}

export const DigitalGuide: React.FC<DigitalGuideProps> = ({
  title,
  description,
  image,
  downloadUrl,
  format,
  size,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would typically send the email to your API
    // and handle the actual download

    setIsLoading(false);
    setIsSubmitted(true);
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span>Format: {format}</span>
          <span>Size: {size}</span>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your email to download
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Download size={20} />
                  Download Guide
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <Check className="text-green-600" size={24} />
            </div>
            <p className="text-green-600 font-medium">
              Check your email for the download link!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 