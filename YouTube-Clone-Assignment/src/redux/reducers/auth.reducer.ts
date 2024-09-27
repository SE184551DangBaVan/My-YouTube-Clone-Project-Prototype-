import { Action } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, LOAD_PROFILE } from '../hub';

export interface AuthState {
  accessToken: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

interface PayloadAction<T> extends Action {
  payload: T;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: Action | PayloadAction<any>): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      if ('payload' in action && action.payload && action.payload.accessToken) {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(action.payload.user));

        return {
          ...state,
          accessToken: action.payload.accessToken,
          user: action.payload.user,
          loading: false,
          error: null,
        };
      }
      return state;

    case LOGIN_FAIL:
      if ('payload' in action && action.payload && action.payload.accessToken) {
      return {
        ...state,
        loading: false,
        error: action.payload.error || 'Login failed',
      };
      }
      return state;

    case LOG_OUT:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      return {
        ...state,
        accessToken: null,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;