import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import { Event } from '../data/moviesData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ display: 'block', width: '100%', minWidth: 0 }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <ImageWithFallback
          src={event.imageUrl}
          alt={event.title}
          fallbackSrc="https://via.placeholder.com/400x300"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded text-xs font-semibold">
          {event.date}
        </div>
      </div>
      <div className="p-2">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2 min-h-[36px]">{event.title}</h3>
        <div className="flex items-start gap-1 text-xs text-gray-600 mb-1">
          <MapPin size={12} className="mt-0.5 flex-shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>
        <div className="mb-2">
          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">{event.category}</span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <span className="text-sm font-semibold truncate">₹{event.price} onwards</span>
          <button className="px-2 py-1 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition text-xs font-medium flex-shrink-0">
            Book
          </button>
        </div>
      </div>
    </Link>
  );
}