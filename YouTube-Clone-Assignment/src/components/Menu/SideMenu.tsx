import SideMenuFrontPage from "../../pages/YT front page/components/SideMenuFrontPage";
import SideMenuSettingsPage from "../../pages/YT settings page/components/SideMenuSettingsPage";
import { useLocation, useParams } from "react-router-dom";

interface HomeSideMenuProps {
  isLight: boolean
  menuState: boolean;
  sideMenuRef: React.RefObject<HTMLDivElement>;
}

export default function SideMenu({ isLight, menuState, sideMenuRef }:HomeSideMenuProps) {

  const location = useLocation();
  const { query } = useParams()

  // Check if the current path is `/settings`, and render the appropriate side menu
  const renderSideMenu = () => {
    if (location.pathname === '/home'|| location.pathname === '/' || location.pathname === `/search/${query}`) {
      return <SideMenuFrontPage isLight={isLight}/>;
    }
    if (location.pathname === '/settings'){
      return <SideMenuSettingsPage />;
    }
  };

  return (
    <div ref={sideMenuRef} className={menuState ? 'sideMenuContainerColapsed' : 'sideMenuContainer'}>
      {renderSideMenu()}
    </div>
  )
}