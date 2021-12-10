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

// const edit = (edit) => ({
//     type: EDIT_SPOT,
//     edit
// })

const remove = (remove) => ({
    type: DELETE_SPOT,
    remove
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

    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(getNote(data))
        return data
    }
}

export const addSpot = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`, {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(addOneSpot(data));
    }
    return res
}

export const deleteSpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`, {method: 'DELETE'})

    if (res.ok) {
        const spot = await res.json()
        dispatch(remove(spot))
    }
}

export default function spotReducer(state = {}, action) {
    switch(action.type) {
        case GET_ALL:
            const newState = {};
            action.all.forEach(all => {
                newState[all.id] = all;
            });
            return newState;

        case GET_SPOT:{
            const newState = {};
            newState[action.spot.id] = action.spot;
            return newState;
        }

        case ADD_SPOT:{
            const newState = {};
            newState[action.spot.id] = action.spot;
            return newState;
        }

        case EDIT_SPOT:{
            const newState = {};
            newState[action.edit.id] = action.spot;
            return newState;
        }

        case DELETE_SPOT:{
            const newState = {...state};
            // newState[action.remove.id] = action.spot;
            delete newState[action.remove.id]
            return newState;
        }

        default:
            return state;
    }
}
