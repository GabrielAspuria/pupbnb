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
        {spot.features.split(',').map(feature => <li>{feature}</li>)}</ul>)


    return (
        <main>
            {isLoaded && (
            <div>
                    <>
                    <div>Owner: {spot.User.username}</div>
                    <div>{spot.name}</div>
                    <img src={spot.photos}></img>
                    <div>Description:</div>
                    <div>{spot.description}</div>
                    {features}
                    <div>Reviews:</div>
                    <div>
                    <ReviewForm />
                    </div>
                    <div>
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
                    </>
            </div>
            )}
        </main>
    )
}

export default SpotPage
