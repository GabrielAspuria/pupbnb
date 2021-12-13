import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editReview } from '../../store/review';
import { useParams } from 'react-router';

const EditReviewForm = () => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const review = useSelector((state) => state.review)
    const sessionUser = useSelector(state => state.session.user.id);

    const [cleanliness, setCleanliness] = useState(review.cleanliness || 1)
    const [accuracy, setAccuracy] = useState(review.accuracy || 1)
    const [communication, setCommunication] = useState(review.communication || 1)
    const [value, setValue] = useState(review.value || 1)
    const [experience, setExperience] = useState(review.experience || '')
    const [imgUrl, setImgUrl] = useState(review.imgUrl || '')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            spotId: id,
            userId: sessionUser,
            cleanliness,
            accuracy,
            communication,
            value,
            experience,
            imgUrl
        }
        dispatch(editReview(id, payload))
    }

    return (
        <form onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>
            <div>
                Cleanliness:
                <select value={cleanliness} onChange={(e) => setCleanliness(parseInt(e.target.value, 10))}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </div>
            <div>
                Accuracy:
                <select value={accuracy} onChange={(e) => setAccuracy(parseInt(e.target.value, 10))}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </div>
            <div>
                Communication:
                <select value={communication} onChange={(e) => setCommunication(parseInt(e.target.value, 10))}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </div>
            <div>
                Value:
                <select value={value} onChange={(e) => setValue(parseInt(e.target.value, 10))}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </div>
            <div>
                <textarea placeholder='experience' value={experience} onChange={(e) => setExperience(e.target.value)}></textarea>
            </div>
            <input placeholder='photo' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}></input>
            <button>Submit Edits</button>
        </form>
        </form>
    )
}

export default EditReviewForm
