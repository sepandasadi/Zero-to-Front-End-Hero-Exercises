let reviewsStore = {};

export function getReviews(productId) {
  return reviewsStore[productId] || [];
}

export function addReview(productId, review) {
  const newReview = {
    id: Date.now(),
    ...review,
    date: new Date().toLocaleDateString()
  };

  if (!reviewsStore[productId]) {
    reviewsStore[productId] = [];
  }

  reviewsStore[productId].push(newReview);
  return newReview;
}

