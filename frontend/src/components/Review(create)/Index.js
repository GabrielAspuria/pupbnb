import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom';
import { addReview } from '../../store/review';

function AddReviewForm() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const sessionUser = useSelector(state => state.session.user.id);

    const [cleanliness, setCleanliness] = useState(1)
    const [accuracy, setAccuracy] = useState(1)
    const [communication, setCommunication] = useState(1)
    const [value, setValue] = useState(1)
    const [experience, setExperience] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            spotId: id,
            userId: sessionUser,
            cleanliness,
            accuracy,
            communication,
            value,
            experience,
            imgUrl
        }
        dispatch(addReview(newReview))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Cleanliness:
                <select onChange={(e) => setCleanliness(parseInt(e.target.value, 10))}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </div>
            <div>
                Accuracy:
                <select onChange={(e) => setAccuracy(parseInt(e.target.value, 10))}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </div>
            <div>
                Communication:
                <select onChange={(e) => setCommunication(parseInt(e.target.value, 10))}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </div>
            <div>
                Value:
                <select onChange={(e) => setValue(parseInt(e.target.value, 10))}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </div>
            <div>
                <textarea placeholder='experience' onChange={(e) => setExperience(e.target.value)}></textarea>
            </div>
            <input placeholder='photos' onChange={(e) => setImgUrl(e.target.value)}></input>
            <button>Submit Review</button>
        </form>
    )
}

export default AddReviewForm
