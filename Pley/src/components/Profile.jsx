import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Profile.css';
import { useParams } from 'react-router-dom'
import { useUserContext } from './UserContext';



export default function Profile() {

    //const { logout, currentUsername } = useUserContext();
    //const { logout, currentDescription } = useUserContext();
    //const { logout, currentURL } = useUserContext();

    const {currentStoreId} = useUserContext();
    
    //for password change
    const [password1, setPassword1] = useState('');
    //for password change confirmation
    const [password2, setPassword2] = useState('');

    const [username, setUsername] = useState('');
    const [storeName, setStoreName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');


    const [error, setError] = useState("");

    const [pressedChangeUsernameButton, setPressedChangeUsernameButton] = useState(false);
    const [pressedChangePasswordButton, setPressedChangePasswordButton] = useState(false);
    const [pressedChangeStoreNameButton, setPressedChangeStoreNameButton] = useState(false);
    const [pressedChangeDescButton, setPressedChangeDescButton] = useState(false);
    const [pressedChangeUrlButton, setPressedChangeUrlButton] = useState(false);

    const [reviewData, setReviewData] = useState([]);
    const [storeData, setStoreData] = useState([]);

    

      useEffect(() => {
        const fetchReviews = async () => {
          try {
            // Fetch all reviews (hardcoded for now)
            const response = await axios.get("http://localhost:5028/api/Reviews");
            setReviewData(response.data)

            const currentStore = response.data.filter((review) => review.storeId == currentStoreId);
            setStoreData(currentStore);
          } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch reviews.");
          }
        };
        fetchReviews();
      }, []);


    async function UpdateLogin()
    {
        storeData.at(0).store.username = username;
        storeData.at(0).store.password = password2;

        try
        {
            const response = await axios.patch("http://localhost:5028/api/Store", {
                username: storeData.at(0)?.store?.username,
                password: storeData.at(0)?.store?.password,
            });

            setStoreData({
                ...storeData,
                username: response.data.username,
                password: response.data.password});
        }
        catch (err)
        {
            setError(err.response?.data?.message || "Failed to fetch store.");
        }
    }

    async function UpdateStore()
    {
        storeData.at(0).store.name = storeName;
        storeData.at(0).store.description = description;
        storeData.at(0).store.url = url;

        try
        {
            const response = await axios.patch("http://localhost:5028/api/Store", {
                name: storeData.at(0)?.store?.name,
                description: storeData.at(0)?.store?.description,
                url: storeData.at(0)?.store?.url
            });

            setStoreData({
                ...storeData,
                name: response.data.name,
                description: response.data.description,
                url: response.data.url});
        }
        catch (err)
        {
            setError(err.response?.data?.message || "Failed to fetch store.");
        }
    }

    async function DeleteReview(customerId, reviewId)
    {
        
        try
        {
            const token = localStorage.getItem("authToken");
            const response = await axios.delete(`http://localhost:5028/api/Customers/${customerId}/reviews/${reviewId}`,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status == 200 || response.status == 201)
            {
                fetchReviews();
            }
        }
        catch (err)
        {
            setError(err.response?.data?.message || "Failed to delete review.");
        }
    }
    
    function DisplayAllReviews()
    {
        //]console.log(storeData.at(0));
        return (
            <ul> 
                {error && <p className="error">{error}</p>}
                {!error && (
                <div className="reviews-container">
                    {reviewData.length > 0 ? (
                    reviewData.filter((review) => review.storeId == currentStoreId)
                    .map((review, index) => (
                        // TODO: Route properly /customer/${review.customer.id}
                        <div className="review-items-profile">
                            <Link to={`/customer/${review.customer?.id}`} key={review.id} className="link-card-profile">
                                <div className="review-card-profile" key={index}>
                                    <div className="review-content-profile">
                                    {/* Left div: Review details */}
                                    <h3>{review.customer?.name}</h3>
                                    <p><b>Store:</b> {review.store?.name}</p>
                                    <p className="rating"><b>Rating:</b> {review.rating}/5 ⭐</p>
                                    <p>{review.comment}</p>
                                    </div>
                                    <div className="img-and-delete">
                                        <div className="review-image-profile">
                                        {/* Right div: Image */}
                                            <img
                                                // src="https://thispersondoesnotexist.com/" // TODO: Use the correct URL from the backend
                                                src={review.customer?.url }
                                                alt={`${review.customer?.name || "Customer"}'s picture`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="review-btns">
                                <button className="review-edit-btn" onClick={(event) => {
                                    event.stopPropagation();
                                    DeleteReview(review.customerId, review.id)}}>Edit Review</button>
                                <button className="review-delete-btn" onClick={(event) => {
                                    event.stopPropagation();
                                    DeleteReview(review.customerId, review.id)}}>Delete Review</button>
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

        <div className='profile'>
            <h1 id='profile-h1'>{storeData.at(0)?.store?.name}</h1>
            
            <div id="store">
                <div id="storeImgDiv">
                    <img id="storeImg" src={`${storeData.at(0)?.store?.url}`} alt="" /> {/** Store image fetched from URL */}
                </div>
                
                <div id="info">
                    <p>
                        <b>Username: </b> {storeData.at(0)?.store?.username}
                        <br />
                        <b>Store Name: </b> {storeData.at(0)?.store?.name}
                        <br />
                        <b>Desc: </b> {storeData.at(0)?.store?.description}
                        <br />
                        <b>URL: </b> {storeData.at(0)?.store?.url}
                    </p>

                </div>
               
            </div>

            <div className="buttons">
                <button onClick={() => {setPressedChangeUsernameButton(true); setPressedChangeDescButton(false), setPressedChangePasswordButton(false), setPressedChangeStoreNameButton(false), setPressedChangeUrlButton(false)}}>Update Username</button>
                {pressedChangeUsernameButton && (
                    <div>
                        <form onSubmit={UpdateLogin} >

                            <div>
                                <input
                                    //className="user-input"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder={"Username"}
                                />
                            </div>
                            <button type="submit" className="user-button">
                                Submit
                            </button>
                            <button onClick={() => setPressedChangeUsernameButton(false)}>Cancel</button>

                        </form>
                    </div>

                )}

                <button onClick={() => {setPressedChangeUsernameButton(false); setPressedChangeDescButton(false), setPressedChangePasswordButton(true), setPressedChangeStoreNameButton(false), setPressedChangeUrlButton(false)}}>Update Password</button>
                {pressedChangePasswordButton && (
                    <div>
                        <form onSubmit={UpdateLogin}>
                            <div>
                                <input
                                    //className="user-input"
                                    type="password"
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    required
                                    placeholder="New Password"
                                />
                            </div>
                            confirm change
                            <div>
                                <input
                                    //className="user-input"
                                    type="password"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    required
                                    placeholder="Confirm New Password"
                                />
                            </div>
                            <button type="submit" className="user-button">
                                Submit
                            </button>

                            <button onClick={() => setPressedChangePasswordButton(false)}>Cancel</button>

                        </form>
                    </div>
                )}

                <button onClick={() => {setPressedChangeUsernameButton(false); setPressedChangeDescButton(false), setPressedChangePasswordButton(false), setPressedChangeStoreNameButton(true), setPressedChangeUrlButton(false)}}>Update Store Name</button>
                {pressedChangeStoreNameButton && (
                    <div>
                        <form onSubmit={UpdateStore} >

                            <div>
                                <input
                                    //className="user-input"
                                    type="text"
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    required
                                    placeholder={"Store Name"}
                                />
                            </div>
                            <button type="submit" className="user-button">
                                Submit
                            </button>
                            <button onClick={() => setPressedChangeStoreNameButton(false)}>Cancel</button>

                        </form>
                    </div>
                )}

                <button onClick={() => {setPressedChangeUsernameButton(false); setPressedChangeDescButton(true), setPressedChangePasswordButton(false), setPressedChangeStoreNameButton(false), setPressedChangeUrlButton(false)}}>Update Description</button>
                {pressedChangeDescButton && (
                    <div>
                        <form onSubmit={UpdateStore} >

                            <div>
                                <textarea
                                    //className="user-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder={"Description"}
                                />
                            </div>
                            <button type="submit" className="user-button">
                                Submit
                            </button>
                            <button onClick={() => setPressedChangeDescButton(false)}>Cancel</button>

                        </form>
                    </div>
                )}

                <button onClick={() => {setPressedChangeUsernameButton(false); setPressedChangeDescButton(false), setPressedChangePasswordButton(false), setPressedChangeStoreNameButton(false), setPressedChangeUrlButton(true)}}>Update Image URL</button>
                {pressedChangeUrlButton && (
                    <div>
                        <form onSubmit={UpdateStore} >

                            <div>
                                <input
                                    //className="user-input"
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                    placeholder={"URL"}
                                />
                            </div>
                            <button type="submit" className="user-button">
                                Submit
                            </button>
                            <button onClick={() => setPressedChangeUrlButton(false)}>Cancel</button>

                        </form>
                    </div>
                )}
                
            </div> 

            <div>
                <h2 id='profile-h1'>Reviews</h2>

                <DisplayAllReviews></DisplayAllReviews>
            </div>
   
        </div>

    );

}