import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editSpot } from '../../store/spot';
import { useParams } from 'react-router';

const EditSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()
    const spot = useSelector((state) => state.spot[id]);
    const sessionUser = useSelector(state => state.session.user.id);

    const [name, setName] = useState(spot.name || '')
    const [description, setDescription] = useState(spot.description || '')
    const [features, setFeatures] = useState(spot.features || '')
    const [price, setPrice] = useState(spot.price || '')
    const [rating, setRating] = useState(5)
    const [photos, setPhotos] = useState(spot.photos || '')

    const handleSubmit = async (e) => {
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

        dispatch(editSpot(id, payload))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </label>
            </div>
            <div>
                <label>
                    Features:
                    <input placeholder='features' value={features} onChange={(e) => setFeatures(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>
                    Price:
                    <input placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>
                    Photo:
                    <input placeholder='photo' value={photos} onChange={(e) => setPhotos(e.target.value)}></input>
                </label>
            </div>
            <button>Submit</button>
        </form>
    )
}

export default EditSpotForm;
