import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from 'react-router-dom';

function Home() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  //const [newStore, setNewStore] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(3);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch all reviews (hardcoded for now)
        //const response = await axios.get("http://localhost:8080/api/Reviews");
        const response = [
          {
            name: "John Doe",
            store: "Pizza Hut",
            comment: "Excellent",
            rating: 5,
          },
          {
            name: "Jane Smith",
            store: "McDonald",
            comment: "Good",
            rating: 4,
          },
          {
            name: "Sam Lee",
            store: "Taco Bell",
            comment: "Bad",
            rating: 2,
          },
          {
            name: "Emily Davis",
            store: "Walmart",
            comment: "Not bad",
            rating: 3,
          },
        ];
        setReviews(response);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch reviews.");
      }
    };
    fetchReviews();
  }, []);

  // Handler for adding a new review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if(!newName.trim()){
        alert("Name cannot be empty!");
        return;
    }
    if(!newComment.trim()) {
        alert("Comment cannot be empty!");
        return;
    }
    const newReview = {
        name: newName,
        //store: store_name, //i don't know how to get this yet from credentials
        comment: newComment,
        rating: newRating,
    };

    // try {
    //     const response = await axios.post("http://localhost:8080/api/Reviews", newReview);

    //     if(response.stats === 200) {
    //         //appending new Review to what we have in the state "reviews" at index 0 (top)
    //         setReviews((prevReviews) => [ newReview, ...prevReviews]); 
    //         setNewName("");
    //         setNewComment("");
    //         setNewRating(3);
    //     }
    // } catch (err) {
    //     console.error("Error adding review:", err);
    //     alert("An error occurred while adding the review. Please try again.");
    // }

    //appending new Review to what we have in the state "reviews" at index 0 (top)
    setReviews((prevReviews) => [ newReview, ...prevReviews]); 
    setNewName("");
    setNewComment("");
    setNewRating(3);
    
  };

  return (
    <div className="whole-page">
        {/* Review-card List Section */}
        <div className="homepage">
        <h1>PLEY!</h1>
        {/* TODO: need to add storeName from user at the top of page*/}
        <h2>The Reverse Yelp App</h2>
        <br/>
        {error && <p className="error">{error}</p>}
        {!error && (
            <div className="reviews-container">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                // TODO, need to route it properly /review/${review.id}: this might not correct routing
                <Link to={`/review/${review.id}`} key={review.id} className="link-card">
                    <div className="review-card" key={index}>
                    <div className="review-content">
                        {/* Left div: Review details */}
                        <h3>{review.name}</h3>
                        <p>Store: {review.store}</p>
                        <p className="rating">Rating: {review.rating}/5 ⭐</p>
                        <p>{review.comment}</p>
                    </div>
                    <div className="review-image">
                        {/* Right div: Image */}
                        <img
                        src="https://thispersondoesnotexist.com/" //TODO: URL from backend
                        alt={`${review.name}'s picture`}
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
                id = "textarea-field"
                className="input-field"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment"
                required
            />
            <select
                id = "select-field"
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
            <button type="submit" className="submit-button">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default Home;