import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSpot } from '../../store/spot'

const CreateSpot = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user.id);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [features, setFeatures] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState(5)
    const [photos, setPhotos] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            userId: sessionUser,
            name,
            description,
            features,
            price,
            rating,
            photos
        }

        dispatch(addSpot(payload))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></input>
            <input placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <input placeholder='features' value={features} onChange={(e) => setFeatures(e.target.value)}></input>
            <input placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)}></input>
            <input placeholder='photos' value={photos} onChange={(e) => setPhotos(e.target.value)}></input>
            <button id='submitButton'>Submit</button>
        </form>
    )
}

export default CreateSpot
