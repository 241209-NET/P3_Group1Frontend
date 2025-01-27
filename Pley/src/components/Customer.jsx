import { useState } from 'react';

export default function Customer() {

    const [] = useState()

     /*  async function GetAllReviews()
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
            if (review.customer == currentCustomerId)
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

    return (

        <div>Hello, this is the customer component... for now!

            <div>
                <img src="" alt="" /> {/** customer image fetched from URL */}
                Name: {currentName}
                <br />
                Rating: {rating}
            </div>
        </div>

    )

}