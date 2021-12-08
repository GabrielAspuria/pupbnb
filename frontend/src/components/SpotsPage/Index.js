import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { getSpots } from '../../store/spot';
import './SpotsPage.css'


function SpotsPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    return (
        <main>
            <div>
                {Object.values(spots).map((spot) => (
                    <NavLink to='/spots' key={spot.id} className='allspots'><img src={spot.photos}></img></NavLink>
                    // <NavLink to={`/spots/${spot.id}`} key={spot.id} className='spot'><img src={spot.photos}></img></NavLink>
                    ))}
            </div>
        </main>
    )
}

export default SpotsPage
