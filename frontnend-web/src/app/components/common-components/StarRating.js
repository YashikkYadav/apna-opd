import React from 'react';

const StarRating = ({ rating = 0, ratingCount = 0, showCount = true, size = "sm" }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  const starSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };
  
  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const renderStar = (index) => {
    const starClass = `${starSizes[size]} inline-block`;
    
    if (index < filledStars) {
      // Filled star
      return (
        <svg 
          key={index} 
          className={`${starClass} text-yellow-400 fill-current`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    } else if (index === filledStars && hasHalfStar) {
      // Half star
      return (
        <svg 
          key={index} 
          className={`${starClass} text-yellow-400`}
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path 
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#half-fill)"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      );
    } else {
      // Empty star
      return (
        <svg 
          key={index} 
          className={`${starClass} text-gray-300`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }
  };

  return (
    <div className="flex items-center gap-1">
      {showCount && (
        <div className="flex items-center">
          {[...Array(totalStars)].map((_, index) => renderStar(index))}
        </div>
      )}
      
      <span className={`${textSizes[size]} font-semibold text-gray-700 ml-1`}>
        {rating > 0 ? rating.toFixed(1) : '0.0'}
      </span>
      
      {showCount && ratingCount > 0 && (
        <span className={`${textSizes[size]} text-gray-500 ml-1`}>
          ({ratingCount})
        </span>
      )}
    </div>
  );
};

export default StarRating; 