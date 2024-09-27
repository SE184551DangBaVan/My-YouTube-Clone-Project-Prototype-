import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT } from '../hub';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';

// Action creators

// Initiates the login request
export const loginRequest = () => ({ 
  type: LOGIN_REQUEST 
});

// Dispatches when login is successful
export const loginSuccess = (user: any, accessToken: string) => ({
  type: LOGIN_SUCCESS,
  payload: { user, accessToken },
});

// Dispatches when login fails
export const loginFail = (error: string) => ({
  type: LOGIN_FAIL,
  payload: error,
});

// Handles logout
export const logout = () => ({
  type: LOG_OUT
});

// Asynchronous action to login with Google
export const loginWithGoogle = () => {
  return async (dispatch: any) => {
    dispatch(loginRequest());

    const provider = new GoogleAuthProvider();
    provider.addScope("https//www.googleapis.com/auth/youtube.force-ssl");
    try {
      // Sign in with Google using Firebase Auth
      const res: UserCredential = await signInWithPopup(auth, provider);
      const user = res.user;

      if (user) {
        const accessToken = await user.getIdToken();
        dispatch(loginSuccess(user, accessToken));
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(loginFail(error.message));
      }
    }
  };
};

// Asynchronous action to logout
export const logoutUser = () => {
  return async (dispatch: any) => {
    try {
      await auth.signOut();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
};