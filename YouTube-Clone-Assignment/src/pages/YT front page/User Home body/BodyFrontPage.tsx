import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import { TopicStringsObj } from '../components/topicsStringObj'
import { useState, useRef, useEffect } from 'react'
import '../components/YTFrontBody.css'
//import { VideosObj } from '../components/videoContents'
import VideoContainer from '../components/VideoContainer'

import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store' // Import RootState

import { useDispatch } from 'react-redux'
import { getHomeVideos } from '../../../redux/actions/video.action'

import timeSince from '../utils/yearPublishedFormat'
import timeWatch from '../utils/timeWatch'
import { formatViews } from '../utils/videoData';

import InfiniteScroll from 'react-infinite-scroll-component'
import { Box } from '@mui/material'

interface HomeSideMenuProps {
  menuState: boolean;
}

interface Video {
  id: string;
  snippet: {
    channelId: string;
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: { medium: { url: string } };
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
  };
}


export default function BodyFrontPage({menuState}:HomeSideMenuProps) {
  const sideListRef = useRef<HTMLDivElement>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scrollLeft = () => {
    if (sideListRef.current) {
      sideListRef.current.scrollLeft -= 100;
      updateButtonVisibility();
    }
  };

  const scrollRight = () => {
    if (sideListRef.current) {
      sideListRef.current.scrollLeft += 100;
      updateButtonVisibility();
    }
  };

  const updateButtonVisibility = () => {
    if (sideListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sideListRef.current;

      setIsAtStart(scrollLeft === 0);

      setIsAtEnd(scrollLeft + clientWidth+10 >= scrollWidth);
    }
  };

  useEffect(() => {
    if (sideListRef.current) {
      sideListRef.current.addEventListener('scroll', updateButtonVisibility);

      updateButtonVisibility();
    }

    return () => {
      if (sideListRef.current) {
        sideListRef.current.removeEventListener('scroll', updateButtonVisibility);
      }
    };
  }, []);

  const { videos, loading, error } = useSelector((state: RootState) => state.homeVideos);

  const dispatch = useDispatch();
  useEffect(() => {
    if (videos.length === 0) { // Prevent re-fetch if videos already exist
      dispatch(getHomeVideos());
    }
  }, [dispatch, videos.length]);
  
  const fetchData = () => {
    dispatch(getHomeVideos());
  }
  
  return (
    <div className={menuState ? 'contentContainerExtend' : 'contentContainer'}>
      <div className='topicsContainer'>
        <button onClick={scrollLeft} className='scrollLeft' style={{ visibility: isAtStart ? 'hidden' : 'visible' }}><ArrowBackIosNewOutlined/></button>
        <div ref={sideListRef} className='topicList'>
          <div className='recomendedTopics'>
            <button className='topics'>{TopicStringsObj.Str1}</button>
            <button className='topics'>{TopicStringsObj.Str2}</button>
            <button className='topics'>{TopicStringsObj.Str3}</button>
            <button className='topics'>{TopicStringsObj.Str4}</button>
            <button className='topics'>{TopicStringsObj.Str5}</button>
            <button className='topics'>{TopicStringsObj.Str6}</button>
            <button className='topics'>{TopicStringsObj.Str7}</button>
            <button className='topics'>{TopicStringsObj.Str8}</button>
            <button className='topics'>{TopicStringsObj.Str9}</button>
            <button className='topics'>{TopicStringsObj.Str10}</button>
            <button className='topics'>{TopicStringsObj.Str11}</button>
            <button className='topics'>{TopicStringsObj.Str12}</button>
            <button className='topics'>{TopicStringsObj.Str13}</button>
          </div>
        </div>
        <button onClick={scrollRight} className='scrollRight' style={{ visibility: isAtEnd ? 'hidden' : 'visible' }}><ArrowForwardIosOutlined/></button>
      </div>
      <InfiniteScroll dataLength={videos.length} next={fetchData} hasMore={true}
                          loader={
                            <>
                            <h3>Sometimes the load is bugged, please reload page to fix</h3>
                            <Box>
                              <div className='loadingAnimation'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                            </Box>
                            </>
                          } className='loaderRow'>
      <div className='videoContent'>
        
          <div className='videoLists'>
            {loading ? (
              <p>loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              videos.map((video: Video) => (
                <VideoContainer
                  key={video.id}
                  thumbnail={video.snippet.thumbnails.medium.url}
                  duration={timeWatch(video.contentDetails.duration)}
                  title={video.snippet.title}
                  creatorImage={video.snippet.channelId}
                  creatorName={video.snippet.channelTitle}
                  views={`${formatViews(Number(video.statistics.viewCount))} views`}
                  age={timeSince(video.snippet.publishedAt)}
                />
              ))
            )}
          
          </div>
      </div>
      </InfiniteScroll>
    </div>
  )
}