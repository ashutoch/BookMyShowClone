import { Link } from 'react-router';
import { Calendar, MapPin } from 'lucide-react';
import { Sport } from '../data/moviesData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SportCardProps {
  sport: Sport;
}

export function SportCard({ sport }: SportCardProps) {
  return (
    <Link 
      to={`/sport/${sport.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={sport.imageUrl}
          alt={sport.title}
          fallbackSrc="https://via.placeholder.com/400x300"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded text-sm font-semibold">
          {sport.date}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base mb-2 line-clamp-2 min-h-[48px]">{sport.title}</h3>
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
          <MapPin size={16} className="mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{sport.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">{sport.category}</span>
        </div>
        <div className="flex items-center justify-between">
          {sport.price > 0 ? (
            <span className="text-lg font-semibold">₹{sport.price} onwards</span>
          ) : (
            <span className="text-lg font-semibold text-green-600">Free</span>
          )}
          <button className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition text-sm font-medium">
            Book
          </button>
        </div>
      </div>
    </Link>
  );
}