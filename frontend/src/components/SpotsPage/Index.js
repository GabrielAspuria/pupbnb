import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spot';
import './SpotsPage.css'


function SpotsPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);


    let addSpot;
    if (sessionUser) {
        addSpot = (
            <>
                <NavLink to='/spots/add'>Add Spot</NavLink>
            </>
        )
    }


    return (
        <main>
            <div>
                {Object.values(spots).map((spot) => (
                    // <NavLink to='/spots' key={spot.id} className='allspots'><img src={spot.photos}></img></NavLink>
                    <NavLink to={`/spots/${spot.id}`} key={spot.id} className='allspots'>
                        <div>{spot.name}</div>
                        <img src={spot.photos}></img>

                    </NavLink>
                    ))}
            </div>
            <div>
                {addSpot}
            </div>
        </main>
    )
}

export default SpotsPage
