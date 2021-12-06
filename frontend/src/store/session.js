import { useSelector } from "react-redux"
import { csrfFetch } from "./csrf"

export const SET_SESSION_USER = 'session/SET_SESSION_USER'
export const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER'

const setUser = (user) => {
    return {
        type: SET_SESSION_USER,
        user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_SESSION_USER
    }
}


export const login = (credential, password) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        }),
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}

export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

export const sessionReducer = (state = {user: null}, action) => {
    switch(action.type) {
        case SET_SESSION_USER:
            return { ...state, user: action.user}
        case REMOVE_SESSION_USER:
            return { ...state, user:null};
        default: return state
    }
}

export default sessionReducer
