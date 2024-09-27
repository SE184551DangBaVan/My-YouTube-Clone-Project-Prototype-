import { call, put, takeLatest, select, delay } from 'redux-saga/effects';
import request from '../../api';
import { HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL,
  SEARCH_VIDEOS_REQUEST, SEARCH_VIDEOS_SUCCESS, SEARCH_VIDEOS_FAIL,
  SAVE_SEARCH_HISTORY
} from '../hub';

import { RootState } from '../store';

const getNextPageToken = (state: RootState) => state.homeVideos.nextPageToken;
const getNextPageTokenSearch = (state: RootState) => state.searchedVideos.nextPageTokenSearch;

function* fetchHomeVideos(): Generator<any, void, any> {
  try {
    const nextPageToken: string | null = yield select(getNextPageToken);

    const { data } = yield call(() =>
      request.get('videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          regionCode: 'US', // regional parameter
          maxResults: 9, // ammount parameter
          pageToken: nextPageToken,
        },
      })
    );
    console.log(data);
    yield put({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        video: data.items,
        nextPageToken: data.nextPageToken
      }
    });
  } catch (error) {
    if(error instanceof Error)
      yield put({
        type: HOME_VIDEOS_FAIL,
        payload: error.message || 'Error while fetching videos',
      });
  }
}

export function* watchHomeVideos() {
  yield takeLatest(HOME_VIDEOS_REQUEST, fetchHomeVideos);
}

const checkSearchTerm = (state: RootState) => state.homeVideos.searchHistory;

function* fetchSearchVideos(action: any) {
  try {
    const nextPageTokenSearch: string | null = yield select(getNextPageTokenSearch)
    const searchTerm: string | undefined = action.payload
    if(!searchTerm || searchTerm.trim() === ''){
      return;
    }

    const { data } = yield call(() =>
      request.get('search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          pageToken: nextPageTokenSearch,
          q: searchTerm,
          type: 'video,channel',
        },
      })
    );
    console.log(data)
    const currentSearchHistory: string = yield select(checkSearchTerm)
      if(searchTerm && !currentSearchHistory.includes(searchTerm)){
        yield put({
          type: SAVE_SEARCH_HISTORY,
          payload: searchTerm, // Assuming items is the list of search results
        });
      }
      yield put({
        type: SEARCH_VIDEOS_SUCCESS,
        payload: {
          items: data.items, // Assuming items is the list of search results
          nextPageToken: data.nextPageToken
        }
      });
  } catch (error) {
    if (error instanceof Error)
      yield put({
        type: SEARCH_VIDEOS_FAIL,
        payload: error.message || 'Error while fetching search results',
      });
  }
}

export function* watchSearchVideos() {
  yield takeLatest(SEARCH_VIDEOS_REQUEST, fetchSearchVideos);
}