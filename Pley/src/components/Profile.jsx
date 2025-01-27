import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
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
            const currentStore = response.data.filter((review) => review.storeId === currentStoreId);

            setReviewData(currentStore);
          } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch reviews.");
          }
        };
        fetchReviews();
      }, []);

    
      

    async function UpdateStore()
    {
        try
        {
            const response = await axios.patch("http://localhost:5028/api/Store");
        } 
        catch (err)
        {
            setError(err.response?.data?.message || "Failed to fetch store.");
        }
        
        setStoreData(response);
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
                        reviewData.filter((review) => review.storeId === currentStoreId)
                        .map((review, index) => (
                // TODO, need to route it properly /review/${review.id}: this might not correct routing
                        <div className="review-card" key={index}>
                        <div className="review-content">
                            {/* Left div: Review details */}
                            <h3>{review.customer?.name}</h3>
                            <p><b>Store: </b>{review.store?.name}</p>
                            <p className="rating"><b>Rating: </b>{review.rating}/5 ⭐</p>
                            <p>{review.comment}</p>
                        </div>
                        <div className="review-image">
                            {/* Right div: Image */}
                            <img
                            src={review.customer?.url} //TODO: URL from backend
                            alt={`${review.customer?.name}'s picture`}
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
            <h1>{JSON.stringify(storeData.at(0)?.store?.name)}</h1>
            
            <div id="store">
                <div id="storeImgDiv">
                    <img id="storeImg" src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt="" /> {/** Store image fetched from URL */}
                </div>
                
{/*                 <div id="info">
                    <p>
                        <b>Username: </b> {JSON.stringify(storeData.at(0).store.username)}
                        <br />
                        <b>Store Name: </b> {JSON.stringify(storeData.at(0).store.name)}
                        <br />
                        <b>Desc: </b> {JSON.stringify(storeData.at(0).store.description)}
                        <br />
                        <b>URL: </b> {JSON.stringify(storeData.at(0).store.url)}
                    </p>

                </div> */}
               
            </div>

            <div className="buttons">
                <button onClick={() => {setPressedChangeUsernameButton(true); setPressedChangeDescButton(false), setPressedChangePasswordButton(false), setPressedChangeStoreNameButton(false), setPressedChangeUrlButton(false)}}>Update Username</button>
                {pressedChangeUsernameButton && (
                    <div>
                        <form onSubmit={UpdateStore} >

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
                        <form onSubmit={UpdateStore}>
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
                        <form onSubmit={UpdateStore} >

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
                        <form onSubmit={UpdateStore} >

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
                        <form onSubmit={UpdateStore} >

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