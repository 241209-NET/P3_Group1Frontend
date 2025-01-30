import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUserContext } from "./UserContext";

function Home() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  // Fetch reviews from the API when the component loads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("authToken");
        // Fetch all reviews
        const response = await axios.get("http://localhost:5028/api/Reviews",
          {
            headers:
            {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setReviews(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch reviews.");
      }
    };
    fetchReviews();
  }, []);
 
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
    </div>
  );
}

export default Home;
