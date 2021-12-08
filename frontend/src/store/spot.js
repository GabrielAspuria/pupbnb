import { csrfFetch } from "./csrf";

const GET_ALL = 'spots/GET_ALL'
const GET_SPOT = 'spot/GET_SPOTS'

const getAll = (all) => ({
    type: GET_ALL,
    all
})

const get = (spot) => ({
    type: GET_SPOT,
    spot
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
        dispatch(get(data))
        return data
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

        case GET_SPOT:
            action.spot.forEach(spot => {
                newState[spot.id] = spot
            });
            return newState;

        default:
            return state;
    }
}
