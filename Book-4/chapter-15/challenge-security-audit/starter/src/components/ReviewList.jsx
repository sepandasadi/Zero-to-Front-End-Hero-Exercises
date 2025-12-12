import { useState, useEffect } from 'react';
import { getReviews, addReview } from '../services/reviewService';

function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ author: '', text: '' });

  useEffect(() => {
    setReviews(getReviews(productId));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = addReview(productId, newReview);
    setReviews([...reviews, review]);
    setNewReview({ author: '', text: '' });
  };

  return (
    <>
      <div className="reviews">
        <h2>Customer Reviews</h2>
        {reviews.map(review => (
          <div key={review.id} className="review">
            <h4>{review.author}</h4>
            {/* ❌ VULNERABILITY #5: XSS in reviews via dangerouslySetInnerHTML */}
            <div dangerouslySetInnerHTML={{ __html: review.text }} />
            <small style={{ color: '#999' }}>{review.date}</small>
          </div>
        ))}
      </div>

      <div className="review-form">
        <h3>Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Review:</label>
            <textarea
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              placeholder="Share your thoughts..."
              required
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </>
  );
}

export default ReviewList;

