const ProductRating = ({ rating = 4.5, reviews = 0, showReviews = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400">⭐</span>
        ))}
        
        {/* Half star */}
        {hasHalfStar && <span className="text-yellow-400">⭐</span>}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300">⭐</span>
        ))}
      </div>
      
      {showReviews && (
        <span className="text-sm text-gray-600">
          {rating} ({reviews} reviews)
        </span>
      )}
    </div>
  );
};

export default ProductRating;