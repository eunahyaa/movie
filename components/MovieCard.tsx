
import React from 'react';
import type { Movie } from '../types';
import StarRating from './StarRating';

interface MovieCardProps {
  movie: Movie;
  onDelete: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700 transition-shadow duration-300 hover:shadow-cyan-500/20">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-4">
          <img 
            src={movie.poster || `https://picsum.photos/seed/${movie.id}/400/600`} 
            alt={`${movie.title} poster`} 
            className="w-full h-full object-cover min-h-[300px]" 
          />
        </div>
        <div className="p-6 md:col-span-8 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-white">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.releaseDate}</p>
            </div>
            <button 
              onClick={() => onDelete(movie.id)} 
              className="text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Delete movie entry"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <StarRating rating={movie.rating} />
            {movie.genre && (
              <span className="bg-gray-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">{movie.genre}</span>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700 flex-grow">
            <p className="text-gray-300 whitespace-pre-wrap">{movie.review || "작성된 리뷰가 없습니다."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
