import { auth } from '../firebase'
import { Dispatch } from 'redux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOG_OUT = 'LOG_OUT';
export const LOAD_PROFILE = 'LOAD_PROFILE';

export const HOME_VIDEOS_SUCCESS = "HOME_VIDEOS_SUCCESS"
export const HOME_VIDEOS_FAIL = "HOME_VIDEOS_FAIL"
export const HOME_VIDEOS_REQUEST = "HOME_VIDEOS_REQUEST"

export const SEARCH_VIDEOS_REQUEST = 'SEARCH_VIDEOS_REQUEST';
export const SEARCH_VIDEOS_SUCCESS = 'SEARCH_VIDEOS_SUCCESS';
export const SEARCH_VIDEOS_FAIL = 'SEARCH_VIDEOS_FAIL';

export const SAVE_SEARCH_HISTORY = 'SAVE_SEARCH_HISTORY';

export const saveSearchHistory = (term: string) => ({
  type: SAVE_SEARCH_HISTORY,
  payload: term,
});

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const logoutRequest = () => {
  return async (dispatch:Dispatch) => {
    try {
      await auth.signOut()
      dispatch({type: LOG_OUT})
    } catch (error) {
      console.error("Error during logout:", error)
    }
  };
};

export const homeVideoRequest = () => ({
  type: HOME_VIDEOS_REQUEST,
});

export const searchVideoRequest = () => ({
  type: SEARCH_VIDEOS_REQUEST,
});