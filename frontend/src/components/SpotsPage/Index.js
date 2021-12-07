import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { getSpots } from '../../store/spot';


function SpotsPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    if(spots) {
        console.log("HELLO WORLD")
        console.log(spots)
    }

    return (
        <main>
            <div>
                {Object.values(spots).map(({id}) => (
                    <NavLink path='/spots' key={id}></NavLink>
                ))}
            </div>
        </main>
    )
}

export default SpotsPage
