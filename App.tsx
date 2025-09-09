
import React, { useState } from 'react';
import type { Movie } from './types';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleAddMovie = (newMovieData: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...newMovieData,
      id: Date.now(),
    };
    setMovies(prevMovies => [newMovie, ...prevMovies]);
  };

  const handleDeleteMovie = (id: number) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="py-6 bg-gray-800/50 backdrop-blur-sm shadow-lg border-b border-gray-700">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            2025 영화 기록
          </h1>
          <p className="text-center text-gray-400 mt-1">나만의 영화 일지를 작성해보세요.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <MovieForm onAddMovie={handleAddMovie} />
        </div>
        <div className="lg:col-span-8">
          <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} />
        </div>
      </main>
    </div>
  );
};

export default App;
