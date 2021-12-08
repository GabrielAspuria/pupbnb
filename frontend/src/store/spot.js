import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spot/GET_SPOTS'
const get = (spots) => ({
    type: GET_SPOTS,
    spots
})

export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')

    if (res.ok) {
        const data = await res.json();
        dispatch(get(data))
    }
}

export const getSpot = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/:id')

    if (res.ok) {
        const data = await res.json();
        dispatch(get(data))
    }
}

export default function spotReducer(state = {}, action) {
    switch(action.type) {
        case GET_SPOTS:
            const newState = {};
            action.spots.forEach(spot => {
                newState[spot.id] = spot;
            });
            return newState;

        default:
            return state;
    }
}
