import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory} from 'react-router-dom';
import { getSpot, deleteSpot, editSpot } from '../../store/spot';
import * as sessionActions from '../../store/session'
import EditSpotForm from '../SpotPage(edit)';
import ReviewForm from '../ReviewForm/Index';
import AddReviewForm from '../Review(create)/Index';
import EditReviewForm from '../Review(edit)/Index';
import "../SpotsPage/SpotsPage.css"

function SpotPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams()

    const spot = useSelector((state) => state.spot[id]);
    const review = useSelector((state) => state.review[id])
    console.log(review)

    const [isLoaded, setIsLoaded] = useState(false);
    const [form, setForm] = useState(false)
    const [reviewForm, setReviewForm] = useState(false)
    const [editRForm, setEditRForm] = useState(false)

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getSpot(id));
    },[dispatch])

    const handleDelete = (id) => {
        dispatch(deleteSpot(id))
        history.push('/spots')
    }

    const handleEdit = (id) => {
        setForm(true)
    }

    const handleReview = () => {
        setReviewForm(true)
    }

    const handleEditReview = () => {
        setEditRForm(true)
    }

    const sessionUser = useSelector((state) => state.session.user)

    let removeSpot;

    if (!spot) return null;

    if (sessionUser.id === spot.userId) {
        removeSpot = (
            <>
            <button className='button' onClick={() => handleDelete(id) }>Delete</button>
            </>
        )
    }

    let editForm = null;
    if (form) {
        editForm = <EditSpotForm />
    }

    let editASpot;
    if (sessionUser.id === spot.userId) {
        editASpot = (
            <>
                <button className='button' onClick={() => handleEdit(id)}>Edit</button>
            </>
        )
    }

    let addReviewForm = null;
    if (reviewForm) {
        addReviewForm = <AddReviewForm />
    }

    let addReview;
    if (sessionUser.id) {
        addReview = (
            <>
                <button className='button' onClick={() => handleReview()}>Add Review</button>
            </>
        )
    }

    let editReviewForm = null;
    if (editRForm) {
        editReviewForm = <EditReviewForm />
    }

    let editReview;
    if (sessionUser) {
        editReview = (
            <>
                <button className='button' onClick={() => handleEditReview()}>Edit Review</button>
            </>
        )
    }

    if (!sessionUser) return <Redirect to='/'/>

    let features = (<ul>
        {spot.features.split(',').map(feature => <li className='featureList'>✓ {feature}</li>)}</ul>)


    return (
        <main>
            {isLoaded && (
            <div>
                    <>
                    <div className='spotHeader'>
                        <img src={spot.photos}></img>
                        <div>👤 {spot.User.username} &nbsp;&nbsp;&nbsp; 🏠 {spot.name} </div>
                        <div></div>
                        <hr id='hrLine'></hr>
                    </div>
                    <div className='spotInfoContainer'>
                        <div className='spotInfo'>
                            <div id='description'>Description:</div>
                            <div id='descriptionData'>{spot.description}</div>
                            <div id='features'> Features: </div>
                            <div id='featuresData'>{features}</div>
                            <div id='reviews'>Reviews:</div>
                            <div>
                            <ReviewForm />
                            </div>
                        </div>
                    </div>
                    <div className='addEditReviewSection'>
                        <div className='addReviewSection'>
                            {addReview}
                            {addReviewForm}
                        </div>
                        <div>
                            {editReview}
                            {editReviewForm}
                        </div>
                        <div>
                            {editASpot}
                            {editForm}
                        </div>
                        <div>{removeSpot}</div>
                    </div>
                    </>
            </div>
            )}
        </main>
    )
}

export default SpotPage
