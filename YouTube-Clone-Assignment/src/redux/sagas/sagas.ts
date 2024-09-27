import { all } from 'redux-saga/effects';
import { watchLoginRequest } from './auth.sagas';
import { watchLogoutRequest } from './auth.sagas';
import { watchHomeVideos, watchSearchVideos } from './video.sagas';

export function* rootSaga() {
  yield all([watchLoginRequest(), watchLogoutRequest(), watchHomeVideos(), watchSearchVideos()]);
}

export default rootSaga;