import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory} from 'react-router-dom';
import { getSpot, deleteSpot } from '../../store/spot';
import * as sessionActions from '../../store/session'

function SpotPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()
    // console.log(User.id)

    const spot = useSelector((state) => state.spot[id]);
    console.log(spot, "spot")
    // const user = useSelector(state => state.session.user)
    // const currUser = Object.values(spot).map(spot => spot.User.username)
    // const features = Object.values(spot).map(spot => spot.features.split(','))
    // const eachFeature = {...features[0]}


    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        console.log("getSpot")
        dispatch(getSpot(id));
    },[dispatch])

    const handleDelete = (id) => {
        dispatch(deleteSpot(id))
        history.push('/spots')
    }

    const sessionUser = useSelector((state) => state.session.user)

    let removeSpot;

    if (!spot) return null;

    if (sessionUser.id == spot.userId) {
        removeSpot = (
            <>
            <button className='button' onClick={() => handleDelete(id) }>Delete</button>
            {/* <Redirect to='/spots'/> */}
            </>
        )
    }


    if (!sessionUser) return <Redirect to='/'/>

    let features = (<ul>
        {spot.features.split(',').map(feature => <li>{feature}</li>)}</ul>)


    return (
        <main>
            {isLoaded && (
            <div>
                {/* {Object.values(spot).map((spot) => ( */}
                    <>
                    <div>Owner: {spot.User.username}</div>
                    <div>{spot.name}</div>
                    <img src={spot.photos}></img>
                    <div>Description:</div>
                    <div>{spot.description}</div>
                    {features}
                    <div>Reviews:</div>
                    <div>{removeSpot}</div>
                    </>
                {/* )} */}
            </div>
            )}
        </main>
    )
}

export default SpotPage
