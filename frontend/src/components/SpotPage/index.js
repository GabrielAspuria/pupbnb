import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory} from 'react-router-dom';
import { getSpot, deleteSpot } from '../../store/spot';
import * as sessionActions from '../../store/session'

function SpotPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector((state) => state.spot);
    const currUser = Object.values(spot).map(spot => spot.User.username)
    const features = Object.values(spot).map(spot => spot.features.split(','))
    const eachFeature = {...features[0]}

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [bnbFeatures, setBnbFeatures] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [photos, setPhotos] = useState('');


    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);


    const {id} = useParams()

    useEffect(() => {
        dispatch(getSpot(id));
    }, [dispatch])


    const handleDelete = (id) => {
        dispatch(deleteSpot(id))
        history.push('/spots')
    }

    const sessionUser = useSelector((state) => state.session.user)

    let removeSpot;
    console.log(sessionUser.username)
    console.log(currUser)
    if (sessionUser.username == currUser[0]) {
        removeSpot = (
            <>
            <button className='button' onClick={() => handleDelete(id) }>Delete</button>
            {/* <Redirect to='/spots'/> */}
            </>
        )
    }


    if (!sessionUser) return <Redirect to='/'/>


    return (
        <main>
            {isLoaded && (
            <div>
                {Object.values(spot).map((spot) => (
                    <>
                    <div>Owner: {spot.User.username}</div>
                    <div>{spot.name}</div>
                    <img src={spot.photos}></img>
                    <div>Description:</div>
                    <div>{spot.description}</div>
                    <ul>
                        Features:
                        <li key={'1'}>{[eachFeature][0][0]}</li>
                        <li key={'2'}>{[eachFeature][0][1]}</li>
                        <li key={'3'}>{[eachFeature][0][2]}</li>
                    </ul>
                    <div>Reviews:</div>
                    <div>{removeSpot}</div>
                    </>
                ))}
            </div>
            )}
        </main>
    )
}

export default SpotPage
