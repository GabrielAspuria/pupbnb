import { csrfFetch } from "./csrf";

const ADD_REVIEW = 'review/addReview'
const GET_ALL_REVIEWS = 'review/getAll'
const GET_SPOT = 'spot/GET_SPOT'
const EDIT_REVIEW = 'spot/editReview'

// Actions

const getAll = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
})

const add = (addOne) => ({
    type: ADD_REVIEW,
    addOne
})

const edit = (edit) => ({
    type: EDIT_REVIEW,
    edit
})
//

export const getAllReviews = (id) =>  async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getAll(data))
    }
}

export const addReview = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const newReview = await res.json();
        dispatch(add(newReview));
        return res
    }
}

export const editReview = (id, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    if (res.ok) {
        const updatedReview = await res.json()
        dispatch(edit(updatedReview))
        return updatedReview;
    }
}

export default function reviewReducer(state={}, action) {
    const newState = {};
    switch(action.type){
        case GET_ALL_REVIEWS:{
            action.reviews.forEach(review => {
                newState[review.id] = review;
            })
            return newState;
        }
        case ADD_REVIEW:{
            // newState [action.addOne.id] = action.addOne
            // return newState
            return { ...state, [action.addOne.id]: action.addOne}
        }
        case EDIT_REVIEW:{
            newState[action.edit.id] = action.edit;
            return newState;
        }
        default:
            return state;
    }
}
