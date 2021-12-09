import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, Redirect } from 'react-router-dom';
import { getSpot, deleteSpot } from '../../store/spot';
import * as sessionActions from '../../store/session'

function SpotPage() {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot);
    const user = Object.values(spot).map(spot => spot.User.username)
    const features = Object.values(spot).map(spot => spot.features.split(','))
    const eachFeature = {...features[0]}

    console.log([eachFeature][0][0], "YO")
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);


    const {id} = useParams()

    useEffect(() => {
        dispatch(getSpot(id));
    }, [dispatch])

    const sessionUser = useSelector((state) => state.session.user)

    let removeSpot;

    if (sessionUser.username == user[0]) {
        removeSpot = (
            <>
            <button className='button' onClick={() => deleteSpot(id) }>Delete</button>
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
                        <li>{[eachFeature][0][0]}</li>
                        <li>{[eachFeature][0][1]}</li>
                        <li>{[eachFeature][0][2]}</li>
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
