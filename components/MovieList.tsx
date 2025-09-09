
import React from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onDeleteMovie: (id: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onDeleteMovie }) => {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700 p-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <h3 className="text-xl font-semibold mt-4 text-gray-300">아직 기록된 영화가 없습니다.</h3>
        <p className="text-gray-500 mt-1">왼쪽 양식을 사용하여 첫 영화를 기록해보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onDelete={onDeleteMovie} />
      ))}
    </div>
  );
};

export default MovieList;
