import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { getSpot } from '../../store/spot';


function SpotPage() {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot);

    useEffect(() => {
        dispatch(getSpot());
    }, [dispatch])

    return (
        <main>
            <div>
                {Object.values(spot).map((spot) => (
                    <NavLink to={`/spots/${spot.id}`} key={spot.photos} className='spot'>
                        <div>{spot.description}</div>
                    </NavLink>
                ))}
            </div>
        </main>
    )
}

export default SpotPage
