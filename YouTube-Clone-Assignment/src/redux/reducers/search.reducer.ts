import { SEARCH_VIDEOS_REQUEST, SEARCH_VIDEOS_SUCCESS, SEARCH_VIDEOS_FAIL,
    SAVE_SEARCH_HISTORY
  } from '../hub';
  
  export interface VideoState{
    loading: boolean,
    videos: [],
    channelId: string | null,
    channelIcon: string | null,
    searchResults: any[],
    error: string | null,
    nextPageTokenSearch: string | null,
    searchHistory: string[],
  } 
  
  const initialState: VideoState = {
    loading: false,
    videos: [],
    channelId: null,
    channelIcon: null,
    searchResults: [],
    error: null,
    nextPageTokenSearch: null,
    searchHistory: [],
  }
  
  const searchVideoReducer = (state = initialState, action: any): VideoState => {
    switch (action.type) {
      case SEARCH_VIDEOS_REQUEST:
        return {
          ...state,
          loading: true,
        };
        case SEARCH_VIDEOS_SUCCESS:
          return {
            ...state,
            searchResults: [...state.searchResults, ...action.payload.items],
            nextPageTokenSearch: action.payload.nextPageToken,
            loading: false,
          };
      case SEARCH_VIDEOS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case SAVE_SEARCH_HISTORY:
        return {
          ...state,
          searchHistory: [...state.searchHistory, action.payload],  // Append the new search term
        };
      default:
        return state;
    }
  };
  
  export default searchVideoReducer;