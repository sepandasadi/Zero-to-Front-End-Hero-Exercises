import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { getReviews, addReview } from '../services/reviewService';

function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ author: '', text: '' });

  useEffect(() => {
    setReviews(getReviews(productId));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ SECURE: Input validation
    if (newReview.author.length > 100 || newReview.text.length > 1000) {
      alert('Review too long');
      return;
    }

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
            {/* ✅ SECURE: Sanitized with DOMPurify */}
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(review.text, {
                  ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong'],
                  ALLOWED_ATTR: []
                })
              }}
            />
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
              maxLength={100}
              required
            />
          </div>
          <div className="form-group">
            <label>Review:</label>
            <textarea
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              placeholder="Share your thoughts..."
              maxLength={1000}
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

