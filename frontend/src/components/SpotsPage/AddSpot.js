import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSpot } from '../../store/spot';


const AddSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [photos, setPhotos] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            description,
            features,
            price,
            rating,
            photos
        }

        const spot = await dispatch(addSpot(payload));

        if (spot) {
            onclose()
            history.push(`/spots/${spot.id}`)
        }
    }

    return (
        <form>
            <p>Yuh</p>
        </form>
    )
}

