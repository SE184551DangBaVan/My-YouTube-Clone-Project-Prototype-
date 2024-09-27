import './ResultsBody.css'
//import { VideosObj } from '../../YT front page/components/videoContents'
import ResultVideoContainer from './ResultVideoContainer'

import timeSince from '../../YT front page/utils/yearPublishedFormat'
import timeWatch from '../../YT front page/utils/timeWatch'
import { formatViews } from '../../YT front page/utils/videoData';

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../redux/store'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { getSearchVideos } from '../../../redux/actions/video.action';
import { useParams } from 'react-router-dom';

interface HomeSideMenuProps {
  menuState: boolean;
}

interface Video {
  id: string;
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: { medium: { url: string } };
  };
}

export default function ResultsBody({menuState}:HomeSideMenuProps) {
  const dispatch = useDispatch();
  const { searchResults, loading, nextPageTokenSearch } = useSelector((state: RootState) => state.searchedVideos);

  const { query } = useParams()
  const fetchData = () => {
    if (nextPageTokenSearch) {
      dispatch(getSearchVideos(query)); // Trigger fetching more data based on the current search term
    }
  };
    return (
      <div className={menuState ? 'contentContainerExtend' : 'contentContainer'}>
        <InfiniteScroll dataLength={searchResults.length} next={fetchData} hasMore={true}
                          loader={
                            <Box>
                              <div className='loadingAnimation'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                            </Box>
                          } className='loaderRow'>
        <div className='videoContent'>
            <div className='videoLists'>
            
            {loading ? (
              <p>Loading...</p>
            ) : (
              searchResults.map((video: Video) => ( // Use the results prop
                <ResultVideoContainer
                  key={video.id}
                  thumbnail={video.snippet.thumbnails.medium.url}
                  duration={timeWatch("PT10M35S")}
                  title={video.snippet.title}
                  creatorImage={video.snippet.channelId}
                  creatorName={video.snippet.channelTitle}
                  views={`${formatViews(Number(2838650))} views`}
                  age={timeSince("2024-09-26T08:50:09Z")}
                />
                ))
            )}
            
            </div>
        </div>
        </InfiniteScroll>
      </div>
    )
  }