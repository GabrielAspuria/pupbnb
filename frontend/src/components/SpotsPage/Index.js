import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spot';
import './SpotsPage.css'
import CreateSpot from '../SpotPage(create)/Index';


function SpotsPage() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const [form, setForm] = useState(false)

    const sessionUser = useSelector(state => state.session.user);


    let addNewSpot;
    if (sessionUser) {
        addNewSpot = (
            <>
                <button onClick={() => setForm(true)}>Add Spot</button>

            </>
        )
    }

    let addForm = null;
    if (form) {
        addForm = <CreateSpot />
    }


    return (
        <main>
            <div>
                {addNewSpot}
                {addForm}
            </div>
            <div>
                {Object.values(spots).map((spot) => (
                    <NavLink to={`/spots/${spot.id}`} key={spot.id} className='allspots'>
                        <div>{spot.name}</div>
                        <img src={spot.photos}></img>

                    </NavLink>
                    ))}
            </div>
        </main>
    )
}

export default SpotsPage
