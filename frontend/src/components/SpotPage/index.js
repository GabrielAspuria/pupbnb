import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { getSpot } from '../../store/spot';
import * as sessionActions from '../../store/session'


function SpotPage() {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);


    useEffect(() => {
        dispatch(getSpot());
    }, [dispatch])

    const sessionUser = useSelector((state) => state.session.user)

    if (!sessionUser) return <Redirect to='/'/>

    return (
        <main>
            {isLoaded && (
            <div>
                {Object.values(spot).map((spot) => (
                    <NavLink to={`/spots/${spot.id}`} key={spot.id} className='spot'>
                        <div>{spot.name}</div>
                        <img src={spot.photos}></img>
                        <div>{spot.description}</div>
                        <div>{spot.features}</div>
                    </NavLink>
                ))}
            </div>
            )}
        </main>
    )
}

export default SpotPage
