import { HOME_VIDEOS_REQUEST, SEARCH_VIDEOS_REQUEST } from '../hub';

// Action to request home videos
export const getHomeVideos = () => ({
  type: HOME_VIDEOS_REQUEST,
});

// Action to request search videos
export const getSearchVideos = (searchTerm: string | undefined) => {
  return {
    type: SEARCH_VIDEOS_REQUEST, // Dispatch an action to trigger the saga
    payload: searchTerm,
  };
};
