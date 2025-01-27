import { useState, useEffect } from 'react';
import {homeCustomer} from './Home.jsx';

export default function Customer() {

    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState("");
    let customer = {
        id: homeCustomer.id,
        name: "Paul",
        rating: 3.5,
        url: "HTTPS"}

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

    function DisplayCustomer()
    {
        return (
            <ul> 
                {error && <p className="error">{error}</p>}
                {!error && (
                    <div className="reviews-container">
                    {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        // TODO, need to route it properly /review/${review.id}: this might not correct routing
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
                    ))
                    ) : (
                    <p>No reviews found.</p>
                    )}
                     </div>
          
                )}
            </ul>
        )
    }

    return (

        <div>Hello, this is the customer component... for now!

            <div className='profile'>
                <h1>Store Name</h1>
            
                <div id="customer">
                    <div id="custImgDiv">
                        <img id="storeImg" src={customer.url} alt="" /> {/** Store image fetched from URL */}
                    </div>
                    
                    <div id="info">
                        Name: {customer.name}
                        <br />
                        Rating: {customer.rating}
                        <br />
                    </div>
               
                </div>

                <div>
                    <h2>Reviews</h2>

                    <DisplayCustomer></DisplayCustomer>
                </div>
            </div>
        </div>

    )

}