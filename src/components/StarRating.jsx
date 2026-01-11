import React, { useState } from 'react';
import './StarRating.css';

function StarRating({ rating, onRatingChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={index}
            className={ratingValue <= (hover || rating) ? "on" : "off"}
            onClick={() => onRatingChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <span className="star">★</span>
          </button>
        );
      })}
    </div>
  );
}
export default StarRating;