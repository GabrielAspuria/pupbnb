import { csrfFetch } from "./csrf";

const ADD_REVIEW = 'review/addReview'
const GET_ALL_REVIEWS = 'review/getAll'
const GET_SPOT = 'spot/GET_SPOT'

const getAll = (reviews) => ({
    type: GET_ALL_REVIEWS,
    reviews
})

const add = (addOne) => ({
    type: ADD_REVIEW,
    addOne
})

export const getAllReviews = (id) =>  async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getAll(data))
    }
}

export const addSpot = (id, data) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const newReview = await res.json();
        dispatch(add(newReview));
        return res
    }
}

export default function reviewReducer(state={}, action) {
    const newState = {};
    switch(action.type){
        case GET_ALL_REVIEWS:{
            console.log(action, "ACTION")
            action.reviews.forEach(review => {
                newState[review.id] = review;
            })
            console.log(newState, "NEWSTATE")
            return newState;
        }
    //     case ADD_REVIEW:{
    //         newState(action.payload.id) = action.payload
    //         return newState
    //     }
        default:
            return state;
    }
}
