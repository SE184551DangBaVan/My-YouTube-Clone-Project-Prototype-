import { HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL } from '../hub';

export interface VideoState{
  loading: boolean,
  videos: any[],
  channelId: string | null,
  channelIcon: string | null,
  searchResults: any[],
  error: string | null,
  nextPageToken: string | null,
  searchHistory: string[],
} 

const initialState: VideoState = {
  loading: false,
  videos: [],
  channelId: null,
  channelIcon: null,
  searchResults: [],
  error: null,
  nextPageToken: null,
  searchHistory: [],
}

const videoReducer = (state = initialState, action: any): VideoState => {
  switch (action.type) {
    case HOME_VIDEOS_REQUEST:
      return { 
        ...state,
        loading: true,
      };
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: [...state.videos, ...action.payload.video],
        loading: false,
        nextPageToken: action.payload.nextPageToken,
      };
    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default videoReducer;
