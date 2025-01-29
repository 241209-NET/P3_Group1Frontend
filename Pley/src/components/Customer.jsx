import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useUserContext } from "./UserContext";

export default function Customer() {

    const { id } = useParams();

    const [reviewData, setReviewData] = useState([]);
    const [error, setError] = useState("");
    const [customerData, setCustomerData] = useState([]);

    const [newName, setNewName] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(3);
    const {currentUsername,  currentStorename } = useUserContext();

    useEffect(() => {
        const fetchReviews = async () => {
          try {
            // Fetch all reviews (hardcoded for now)
            const response = await axios.get("http://localhost:5028/api/Reviews");
            setReviewData(response.data)

            const currentCustomer = response.data.filter((review) => review.customerId == id);
            setCustomerData(currentCustomer);
          } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch reviews.");
          }
        };
        fetchReviews();
      }, []);


    function DisplayCustomer()
    {
        return (
            <ul> 
                {error && <p className="error">{error}</p>}
                {!error && (
                    <div className="reviews-container">
                    {reviewData.length > 0 ? (
                    reviewData.filter((review) => review.customerId == id)
                          .map((review, index) => (
                        // TODO, need to route it properly /review/${review.id}: this might not correct routing
                        <div className="review-card" key={index}>
                        <div className="review-content">
                            {/* Left div: Review details */}
                            <h3>{review.customer?.name}</h3>
                            <p>Store: {review.store?.name}</p>
                            <p className="rating">Rating: {review.rating}/5 ⭐</p>
                            <p>{review.comment}</p>
                        </div>
                        <div className="review-image">
                            {/* Right div: Image */}
                            <img
                            src={review.store?.url}//TODO: URL from backend
                            alt={`${review.store?.name}'s picture`}
                            />
                        </div>
                        </div>
                    ))
                    ) : (
                    <p>No reviews found.</p>
                    )}
                  </div>
          
                )}
            </ul>
        )
    }

     // Handler for adding a new review
     const handleAddReview = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
        alert("Comment cannot be empty!");
        return;
        }
        const newReview = {
            name: customerData.at(0)?.customer?.name,
            store: currentStorename,
            comment: newComment,
            rating: newRating,
        };

        try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`http://localhost:5028/api/Customers/${id}/reviews` ,newReview,
            {
            headers:
            {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            }
        );
        //response will be 200 if Ok (might be 201)
        if (response.status === 200) {
            // Add the new review to the top of the current list
            setReviewData((prevReviews) => [response.data, ...prevReviews]);
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

        <div>
            <div className='profile'>
                <div id='costomer-profile'>
                    <h2 >{customerData.at(0)?.customer?.name} ({customerData.at(0)?.customer?.avgRating}/5)</h2>
                </div>
                
            
                <div id="customer">
                    <div id="custImgDiv">
                        <img id="storeImg" src={customerData.at(0)?.customer?.url} alt="" /> {/** Store image fetched from URL */}
                    </div>
{/*                     
                    <div id="info">
                        <br />
                        Rating: {customerData.at(0)?.customer?.avgRating}
                        <br />
                    </div> */}
               
                </div>

                <div>
                    <h2>Reviews</h2>

                    <DisplayCustomer></DisplayCustomer>
                </div>
            </div>
            <div className="new-review-form">
                <h3>Add a New Review</h3>
                <form onSubmit={handleAddReview}>
                {/* <input
                    className="input-field"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter customer's name"
                    required
                /> */}
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

    )

}