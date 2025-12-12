let reviewsStore = {};

export function getReviews(productId) {
  return reviewsStore[productId] || [];
}

export function addReview(productId, review) {
  // ✅ SECURE: Input validation
  if (review.author.length > 100 || review.text.length > 1000) {
    throw new Error('Review too long');
  }

  const newReview = {
    id: Date.now(),
    author: review.author.trim(),
    text: review.text.trim(),
    date: new Date().toLocaleDateString()
  };

  if (!reviewsStore[productId]) {
    reviewsStore[productId] = [];
  }

  reviewsStore[productId].push(newReview);
  return newReview;
}

