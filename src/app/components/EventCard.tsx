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
      className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      style={{ width: '100%', minWidth: 0 }}
    >
      {/* Fixed ratio image */}
      <div className="relative w-full flex-shrink-0" style={{ paddingTop: '75%', position: 'relative' }}>
        <ImageWithFallback
          src={event.imageUrl}
          alt={event.title}
          fallbackSrc="https://via.placeholder.com/400x300"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded text-xs font-semibold shadow">
          {event.date}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-grow p-2">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2" style={{ minHeight: '2.5rem' }}>
          {event.title}
        </h3>
        <div className="flex items-start gap-1 text-xs text-gray-500 mb-1">
          <MapPin size={11} className="mt-0.5 flex-shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>
        <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded w-fit mb-2">
          {event.category}
        </span>
        {/* Push price+button to bottom */}
        <div className="mt-auto flex items-center justify-between gap-1">
          <span className="text-sm font-semibold truncate">₹{event.price} onwards</span>
          <button className="px-2 py-1 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition text-xs font-medium flex-shrink-0">
            Book
          </button>
        </div>
      </div>
    </Link>
  );
}