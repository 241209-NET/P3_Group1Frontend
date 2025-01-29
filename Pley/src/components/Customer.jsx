import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios";

export default function Customer() {

    const { id } = useParams();

    const [reviewData, setReviewData] = useState([]);
    const [error, setError] = useState("");
    const [customerData, setCustomerData] = useState([]);


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
      console.log(customerData.at(0)?.customer);
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
                            <p className="rating">Rating: {review.customer?.avgRating}/5 ⭐</p>
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
        </div>

    )

}