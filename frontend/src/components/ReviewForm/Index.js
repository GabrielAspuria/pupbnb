import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory} from 'react-router-dom';
import { getAllReviews} from '../../store/review';

function ReviewForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const {id} = useParams();

    const [cleanliness, setCleanliness] = useState('')
    const [accuracy, setAccuracy] = useState('')
    const [communication, setCommunication] = useState('')
    const [value, setValue] = useState('')
    const [experience, setExperience] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        dispatch(getAllReviews(id));
    }, [dispatch])

    const reviews = useSelector((state) => state.review)

    if (!reviews || !id) return null


    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            cleanliness,
            accuracy,
            communication,
            value,
            experience,
            imgUrl
        }
        dispatch()
    }

    let reviewInfo = (<ul>
        {Object.values(reviews).map(review =>

        <li>
            <div>
                Experience: {review.experience}
            </div>
        </li>
        )}
    </ul>)


    return (
        <form onSubmit={handleSubmit}>
            {reviewInfo}
        </form>
    )
}

export default ReviewForm
