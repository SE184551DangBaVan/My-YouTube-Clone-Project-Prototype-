import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import videoReducer from './video.reducer';
import searchVideoReducer from './search.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: videoReducer,
  searchedVideos: searchVideoReducer,
})

export default rootReducer