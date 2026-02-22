import { Link } from 'react-router';
import { Star } from 'lucide-react';
import { Movie } from '../data/moviesData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <ImageWithFallback
          src={movie.imageUrl}
          alt={movie.title}
          fallbackSrc="https://via.placeholder.com/300x450"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Star size={12} fill="gold" stroke="gold" />
          <span>{movie.rating}/10</span>
          <span className="ml-1 text-gray-300">{movie.votes} Votes</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-base mb-1 truncate">{movie.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>{movie.genres.slice(0, 2).join('/')}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {movie.languages.slice(0, 3).map(lang => (
            <span key={lang} className="text-xs px-2 py-0.5 bg-gray-100 rounded">
              {lang}
            </span>
          ))}
        </div>
        <button className="w-full mt-2 bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition font-medium">
          Book Now
        </button>
      </div>
    </Link>
  );
}