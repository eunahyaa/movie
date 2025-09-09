
import React from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  editable?: boolean;
}

const Star: React.FC<{ filled: boolean; onClick?: () => void; onMouseEnter?: () => void, onMouseLeave?: () => void, isEditable: boolean }> = ({ filled, onClick, onMouseEnter, onMouseLeave, isEditable }) => (
  <svg
    className={`w-6 h-6 ${filled ? 'text-yellow-400' : 'text-gray-600'} ${isEditable ? 'cursor-pointer' : ''}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, editable = false }) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleRating = (rate: number) => {
    if (editable && onRatingChange) {
      onRatingChange(rate);
    }
  };
  
  const handleMouseEnter = (rate: number) => {
    if(editable) {
        setHoverRating(rate);
    }
  }

  const handleMouseLeave = () => {
    if(editable) {
        setHoverRating(0);
    }
  }

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={(hoverRating || rating) >= star}
          onClick={() => handleRating(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          isEditable={editable}
        />
      ))}
    </div>
  );
};

export default StarRating;
