import { csrfFetch } from "./csrf";

const GET_ALL = 'spots/GET_ALL'
const GET_SPOT = 'spot/GET_SPOT'
const ADD_SPOT = 'spot/ADD_SPOT'
const EDIT_SPOT = 'spot/EDIT_SPOT'
const DELETE_SPOT = 'spot/DELETE_SPOT'

const getAll = (all) => ({
    type: GET_ALL,
    all
})

const getNote = (spot) => ({
    type: GET_SPOT,
    spot
})

const addOneSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})

const edit = (edit) => ({
    type: EDIT_SPOT,
    edit
})

const remove = (id) => ({
    type: DELETE_SPOT,
    id
})

export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')

    if (res.ok) {
        const data = await res.json();
        dispatch(getAll(data))
    }
}

export const getSpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`)
    const spot = await res.json()
    if (spot) {
        if (res.ok) {
            dispatch(getNote(spot))
        }

    }
}

export const addSpot = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const newSpot = await res.json();
        dispatch(addOneSpot(newSpot));
        return res
    }
}

export const editSpot = (id,data) => async (dispatch) => {
    console.log(id, "ID")
    console.log(data, "DATA")
    const res = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
    })
    if (res.ok) {
        const updatedSpot = await res.json()
        dispatch(edit(updatedSpot))
        return updatedSpot
    }
}

export const deleteSpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`, {method: 'DELETE'})
    if (res.ok) {
        dispatch(remove(id))
    }
}

export default function spotReducer(state = {}, action) {
    const newState = {...state};
    switch(action.type) {
        case GET_ALL:
            action.all.forEach(all => {
                newState[all.id] = all;
            });
            return newState;

        case GET_SPOT:{
            newState[action.spot.id] = action.spot;
            return newState;
        }

        case ADD_SPOT:{
            newState[action.spot.id] = action.spot;
            return newState;
        }

        case EDIT_SPOT:{
            newState[action.edit.id] = action.edit;
            return newState;
        }

        case DELETE_SPOT:{
            delete newState[action.id]
            return newState;
        }

        default:
            return state;
    }
}
