import { useState, useUserContext } from 'react';


export default function Profile() {

    //const { logout, currentUsername } = useUserContext();
    //const { logout, currentDescription } = useUserContext();
    //const { logout, currentURL } = useUserContext();

    let currentUsername = "test";
    let currentDescription = "This is my description";
    let currentURL = "URL";
    let currentStoreName = "StoreName";
    
    //for password change
    const [password1, setPassword1] = useState('');
    //for password change confirmation
    const [password2, setPassword2] = useState('');

    const [username, setUsername] = useState('');

    const [pressedChangeUsernameButton, setPressedChangeUsernameButton] = useState(false);

    
    const [pressedChangePasswordButton, setPressedChangePasswordButton] = useState(false);
    const [reviewData, setReviewData] = useState(null);


    

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

   /*  async function GetAllReviewsForStore()
    {
        try
        {
            const reviews = await axios.get(`https://p3-pley.azurewebsites.net/api/Store/`);

            try
            {

                const customers = await Promise.all(

                    reviews.map(async (review) => {
                    
                    const user = await axios.get(`https://p3-pley.azurewebsites.net/api/Customer/${review.customerId}`)
                    
                    return {...review, name: user.data.name}
                    })
                    
                    )
                
            }
            catch (error)
            {
                if (error.response && error.response.status === 400) {
                    //username is available
                    return true;
                }
            }
        }
        catch(error)
        {
            if (error.response && error.response.status === 400) {
                //username is available
                return true;
            }
        }
       
    } */

    function DisplayAllReviews()
    {
        setReviewData(GetAllReviewsForStore());
        currentStoreReviews = []

        for (const review of reviewData)
        {
            if (review.storeId == currentStoreId)
            {
                currentStoreReviews += review;
            }
        }

        return (
            <ul> 
                {currentStoreReviews.map((review, index) => 
                <div>
                    {review.comment}
                    {review.lastUpdated}
                    {review.Rating}
                    {review.name}

                </div>)}

            </ul>
        )
    }

    function UpdatePassword() {

        return (

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

        );

    }

    function UpdateUsername() {

        return (

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

        );

    }


    return (

        <div>
            <h1>Username</h1>
            
            <div>
                <img src="" alt="" /> {/** Store image fetched from URL */}
                Username: {currentUsername}
                <br />
                Store Name: {currentStoreName}
                <br />
                Desc: {currentDescription}
                <br />
                URL: {currentURL}
            </div>

            <div>
                <button onClick={() => {setPressedChangeUsernameButton(true); setPressedChangePasswordButton(false)}}>Update Username</button>
                {pressedChangeUsernameButton && (
                    <div>
                        <UpdateUsername />
                    </div>

                )}


                <br />

                <button onClick={() => {setPressedChangePasswordButton(true); setPressedChangeUsernameButton(false)}}>Update Password</button>
                {pressedChangePasswordButton && (
                    <div>
                        <UpdatePassword />
                    </div>
                )}
                
            </div> 

            <div>
                Reviews

                {/**<DisplayAllReviews></DisplayAllReviews>*/}
            </div>


        </div>

    );

}