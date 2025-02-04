import { useState } from 'react';
import axios from 'axios';
import Rating from './Rating';

export default function ProductReviews({ productId, reviews }) {
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/products/${productId}/reviews`, newReview);
      setNewReview({ rating: 5, comment: '' });
      // Refresh reviews
    } catch (error) {
      console.error('Review submission failed:', error);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-2">Your Rating</label>
          <Rating
            value={newReview.rating}
            onChange={(rating) => setNewReview({ ...newReview, rating })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Review</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review._id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <Rating value={review.rating} />
              <span className="ml-2 text-gray-600 text-sm">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-800">{review.comment}</p>
            <p className="text-sm text-gray-600 mt-2">
              - {review.user.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 