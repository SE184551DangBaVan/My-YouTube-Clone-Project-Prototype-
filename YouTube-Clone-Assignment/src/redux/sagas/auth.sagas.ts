import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { auth, User, onAuthStateChanged } from '../../firebase';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT } from '../hub';

// Worker saga to handle login
function* loginSaga(): Generator<any, void, UserCredential> {
  const provider = new GoogleAuthProvider();

  try {
    // Firebase sign-in
    const res: UserCredential = yield call(signInWithPopup, auth, provider);
    const user = res.user;

    if (user) {
      const accessToken = yield call([user, user.getIdToken]);
      
      // Dispatch success action
      yield put({ type: LOGIN_SUCCESS, payload: { user, accessToken } });
    } else {
      throw new Error('No user object returned from sign-in');
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: LOGIN_FAIL, payload: error.message });
    }
  }
}

export function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* handleLogout() {
  try {
    yield call([auth, 'signOut']); 
    yield put({ type: LOG_OUT });
  } catch (error) {
    console.error('Logout failed', error);
  }
}

export function* watchLogoutRequest() {
  yield takeLatest(LOG_OUT, handleLogout);
}
