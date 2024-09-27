import { Circle, MoreVert } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import request from '../../../api';

interface VideoProps {
  thumbnail: string;
  duration: string;
  title: string;
  creatorImage: string;
  creatorName: string;
  views: string;
  age: string;
}

export default function ResultVideoContainer({
    thumbnail,
    duration,
    title,
    creatorImage,
    creatorName,
    views,
    age
  }: VideoProps) {

    const [channelIcon, setChannelIcon] = useState(null)

    useEffect(() => {
      const get_channel_icon = async () => {
        const {data:{items}} = await request('channels', {
          params:{
            part:'snippet',
            id: creatorImage,
          },
        })
        setChannelIcon(items[0].snippet.thumbnails.default)
      }
      get_channel_icon()
    }, [creatorImage])

  return (
    <div className='resVideosContainer'>
      <div className='thumbnails'>
        <img src={thumbnail} alt='thumbnail' className='thumbnailImg' />
        <div className='duration'>
          {duration}
        </div>
      </div>
      <div className='titleCard'>
        <div className='videoTitles'>
          <img src={channelIcon?.url} alt='Channel' className='creatorpfp' />
          <div className='title'>
            {title}
            <div className='statistics'>
              <div className='creator'>{creatorName}</div>
              <div className='videoInfo'>
                <span className='views'>{views}</span>
                <Circle />
                <span className='videoAge'>{age}</span>
              </div>
            </div>
          </div>
          <div className='optionIcons'>
            <MoreVert />
          </div>
        </div>
      </div>
    </div>
  )
}
