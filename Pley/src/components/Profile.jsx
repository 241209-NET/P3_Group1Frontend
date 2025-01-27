import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';


export default function Profile() {

    //const { logout, currentUsername } = useUserContext();
    //const { logout, currentDescription } = useUserContext();
    //const { logout, currentURL } = useUserContext();

    let currentUsername = "test";
    let currentDescription = "Lorem Ipsum";
    let currentURL = "URL";
    let currentStoreName = "StoreName";
    let currentStoreId = 1;
    let customer = {
        id: 1,
        name: "Paul",
        rating: 3.5,
        url: "HTTPS"}
    
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
            setReviewData(response);
          } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch reviews.");
          }
        };
        fetchReviews();
      }, []);
    

    /*
    async function ConfirmPasswordChange() {

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!regex.test(password1)) {

            alert("Password must be at least 8 characters long and include uppercase, lowercase, and a number");
            return;

        }
        if (!password1.test(password2)) {

            alert("passwords do not match");
            return;

        }

        //UPDATE PASSWORD HERE
        try {
            const response = await axios.patch(`https://p3-pley.azurewebsites.net/api/Store/password/${password1}`);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                //username is available
                return true;
            }
            return false;
        }

    }
    */


    function DisplayAllReviews()
    {
        //setReviewData(GetAllReviews());
        var currentStoreReviews = []

        for (const review of reviewData)
        {
            if (review.storeId == currentStoreId)
            {
                currentStoreReviews += review;
            }
        }

        return (
            <ul> 
                {error && <p className="error">{error}</p>}
                {!error && (
                    <div className="reviews-container">
                    {reviewData.length > 0 ? (
                        reviewData.map((review, index) => (
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

        <div className='profile'>
            <h1>Store Name</h1>
            
            <div id="store">
                <div id="storeImgDiv">
                    <img id="storeImg" src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt="" /> {/** Store image fetched from URL */}
                </div>
                
                <div id="info">
                    Username: {currentUsername}
                    <br />
                    Store Name: {currentStoreName}
                    <br />
                    Desc: {currentDescription}
                    <br />
                    URL: {currentURL}
                </div>
               
            </div>

            <div class="buttons">
                <button onClick={() => {setPressedChangeUsernameButton(true); setPressedChangeDescButton(false), setPressedChangePasswordButton(false), setPressedChangeStoreNameButton(false), setPressedChangeUrlButton(false)}}>Update Username</button>
                {pressedChangeUsernameButton && (
                    <div>
                        <form >

                            <div>
                                <input
                                    //className="user-input"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder={currentUsername}
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
                        <form>
                            <div>
                                <input
                                    //className="user-input"
                                    type="password"
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    required
                                    placeholder="new password"
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
                                    placeholder="confirm new password"
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
                        <form >

                            <div>
                                <input
                                    //className="user-input"
                                    type="text"
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    required
                                    placeholder={currentStoreName}
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
                        <form >

                            <div>
                                <textarea
                                    //className="user-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder={currentDescription}
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
                        <form >

                            <div>
                                <input
                                    //className="user-input"
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                    placeholder={currentURL}
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
                <h2>Reviews</h2>

                <DisplayAllReviews></DisplayAllReviews>
            </div>

        </div>

    );

}