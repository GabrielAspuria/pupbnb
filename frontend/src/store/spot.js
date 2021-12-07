import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spot/GET_SPOTS'
const get = (payload) => ({
    type: GET_SPOTS,
    payload
})

export const getSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')

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
