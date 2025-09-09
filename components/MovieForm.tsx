
import React, { useState } from 'react';
import type { Movie } from '../types';
import StarRating from './StarRating';
import { generateReviewQuestions } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface MovieFormProps {
  onAddMovie: (movie: Omit<Movie, 'id'>) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [poster, setPoster] = useState('');
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiQuestions, setAiQuestions] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPoster(result);
        setPosterPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!title.trim()) {
        setAiQuestions("영화 제목을 먼저 입력해주세요.");
        return;
    }
    setIsAiLoading(true);
    setAiQuestions('');
    try {
        const questions = await generateReviewQuestions(title);
        setAiQuestions(questions);
    } catch (error) {
        setAiQuestions("질문 생성 중 오류가 발생했습니다.");
    } finally {
        setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !releaseDate || !rating) {
      alert('영화 제목, 개봉일, 별점은 필수 항목입니다.');
      return;
    }
    onAddMovie({ title, releaseDate, genre, rating, review, poster });
    setTitle('');
    setReleaseDate('');
    setGenre('');
    setRating(0);
    setReview('');
    setPoster('');
    setPosterPreview(null);
    setAiQuestions('');
    const fileInput = document.getElementById('poster-upload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 sticky top-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">새 영화 기록하기</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">영화 제목</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
        </div>
        <div>
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-300 mb-1">관람일</label>
          <input type="date" id="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" required />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">장르</label>
          <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">별점</label>
          <StarRating rating={rating} onRatingChange={setRating} editable={true} />
        </div>
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label htmlFor="review" className="block text-sm font-medium text-gray-300">리뷰</label>
                <button type="button" onClick={handleGenerateQuestions} disabled={isAiLoading} className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <SparklesIcon className="w-4 h-4" />
                    {isAiLoading ? '생성 중...' : 'AI 질문 받기'}
                </button>
            </div>
            {aiQuestions && (
                <div className="bg-gray-700/50 p-3 rounded-md border border-gray-600">
                    <p className="text-sm text-gray-300 whitespace-pre-wrap">{aiQuestions}</p>
                </div>
            )}
          <textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} rows={5} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"></textarea>
        </div>
        <div>
          <label htmlFor="poster-upload" className="block text-sm font-medium text-gray-300 mb-1">포스터 이미지</label>
          <input id="poster-upload" type="file" onChange={handleImageChange} accept="image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600" />
        </div>
        {posterPreview && (
          <div className="mt-4">
            <img src={posterPreview} alt="Poster Preview" className="w-full h-auto rounded-md object-cover" />
          </div>
        )}
        <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg">
          기록 추가하기
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
