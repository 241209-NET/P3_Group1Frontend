import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(3);

  // Fetch reviews from the API when the component loads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch all reviews
        const response = await axios.get("http://localhost:5028/api/Reviews");
        setReviews(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch reviews.");
      }
    };
    fetchReviews();
  }, []);

  // Handler for adding a new review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert("Name cannot be empty!");
      return;
    }
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    const newReview = {
      name: newName,
      // store: store_name, // TODO: Handle getting the store name from user credentials
      comment: newComment,
      rating: newRating,
    };

    try {
      const response = await axios.post("http://localhost:5028/api/Reviews", newReview);
      //response will be 200 if Ok (might be 201)
      if (response.status === 200) {
        // Add the new review to the top of the current list
        setReviews((prevReviews) => [response.data, ...prevReviews]);
        setNewName("");
        setNewComment("");
        setNewRating(3);
      }
    } catch (err) {
      console.error("Error adding review:", err);
      alert("An error occurred while adding the review. Please try again.");
    }
  };

  
  return (
    <div className="whole-page">
      {/* Review-card List Section */}
      <div className="homepage">
        {/* TODO: Add storeName from user at the top of page */}
        <h1 id="slogan">The Reverse Yelp App</h1>
        <br />
        {error && <p className="error">{error}</p>}
        {!error && (
          <div className="reviews-container">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                // TODO: Route properly /customer/${review.customer.id}
                <Link to={`/customer/${review.customer?.id}`} key={review.id} className="link-card">
                  <div className="review-card" key={index}>
                    <div className="review-content">
                      {/* Left div: Review details */}
                      <h3>{review.customer?.name}</h3>
                      <p><b>Store:</b> {review.store?.name}</p>
                      <p className="rating"><b>Rating:</b> {review.rating}/5 ⭐</p>
                      <p>{review.comment}</p>
                    </div>
                    <div className="review-image">
                      {/* Right div: Image */}
                      <img
                        // src="https://thispersondoesnotexist.com/" // TODO: Use the correct URL from the backend
                        src={review.customer?.url }
                        alt={`${review.customer?.name || "Customer"}'s picture`}
                      />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No reviews found.</p>
            )}
          </div>
        )}
      </div>

      {/* Add Review Section */}
      <div className="new-review-form">
        <h3>Add a New Review</h3>
        <form onSubmit={handleAddReview}>
          <input
            className="input-field"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter customer's name"
            required
          />
          <textarea
            id="textarea-field"
            className="input-field"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter your comment"
            required
          />
          <select
            id="select-field"
            className="input-field"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type="submit" className="submit-button">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
