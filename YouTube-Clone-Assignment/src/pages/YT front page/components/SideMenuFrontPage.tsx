import { ArrowForwardIos, ContentCutOutlined, FeedbackOutlined, HelpOutlineOutlined, HistoryOutlined, HomeOutlined, OutlinedFlag, PlaylistPlayOutlined, SettingsOutlined, SlideshowOutlined, SubscriptionsOutlined, SwitchAccountOutlined, ThumbUpOffAltOutlined, WatchLaterOutlined } from "@mui/icons-material";
import YTshortIconL from '../../../assets/icons8-youtube-shorts-192 (white).png'
import YTshortIconD from '../../../assets/icons8-youtube-shorts-192.png'
import YTPremium from '../../../assets/icons8-youtube.svg'
import YTStudio from '../../../assets/icons8-youtube-studio-192.png'
import YTMusic from '../../../assets/icons8-youtube-music-192.png'
import YTKids from '../../../assets/icons8-youtube-192.png'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface HomeSideMenuProps {
  isLight: boolean
}

export default function SideMenuFrontPage({isLight}:HomeSideMenuProps) {

    const navigate = useNavigate();
    const handleLinkClick = () => {
      navigate(`/settings`);
    };
  
  return (
    <>
      <div className="sideMenu">
        <div className="sideTop">
          <Button><HomeOutlined className="sideMenuIcons"/><span>Home</span></Button>
          <Button><img src={isLight ? YTshortIconD : YTshortIconL} alt="YT Short" className="sideMenuIcons"/><span>Shorts</span></Button>
          <Button><SubscriptionsOutlined className="sideMenuIcons"/><span>Subscriptions</span></Button>
        </div>
      </div>
      <div className="sideMenu">
        <div className="sideMid">
          <Button><span>You</span><ArrowForwardIos className="sideMenuIconsSm"/></Button>
          <Button><SwitchAccountOutlined className="sideMenuIcons"/><span>Your channel</span></Button>
          <Button><HistoryOutlined className="sideMenuIcons"/><span>History</span></Button>
          <Button><PlaylistPlayOutlined className="sideMenuIcons"/><span>Playlists</span></Button>
          <Button><SlideshowOutlined className="sideMenuIcons"/><span>Your videos</span></Button>
          <Button><WatchLaterOutlined className="sideMenuIcons"/><span>Watch later</span></Button>
          <Button><ThumbUpOffAltOutlined className="sideMenuIcons"/><span>Liked videos</span></Button>
          <Button><ContentCutOutlined className="sideMenuIcons"/><span>Your clips</span></Button>
        </div>
      </div>
      <div className="sideMenu">
        <div className="sideMid2">
          <p>More from YouTube</p>
          <Button><img src={YTPremium} alt="YT Short" className="sideMenuIcons"/><span>YouTube Premium</span></Button>
          <Button><img src={YTStudio} alt="YT Short" className="sideMenuIcons"/><span>YouTube Studio</span></Button>
          <Button><img src={YTMusic} alt="YT Short" className="sideMenuIcons"/><span>YouTube Music</span></Button>
          <Button><img src={YTKids} alt="YT Short" className="sideMenuIcons"/><span>YouTube Kids</span></Button>
        </div>
      </div>
      <div className="sideMenu">
        <form className="sideBot">
          <Button type='submit' onClick={handleLinkClick}><SettingsOutlined className="sideMenuIcons"/><span>Settings</span></Button>
          <Button><OutlinedFlag className="sideMenuIcons"/><span>Report history</span></Button>
          <Button><HelpOutlineOutlined className="sideMenuIcons"/><span>Help</span></Button>
          <Button><FeedbackOutlined className="sideMenuIcons"/><span>Send feedback</span></Button>
        </form>
      </div>
    </>
  )
}