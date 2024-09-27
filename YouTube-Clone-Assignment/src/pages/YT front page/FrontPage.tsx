import YTHeader from '../../components/Header/YTHeader'
import SideMenu from '../../components/Menu/SideMenu'
import { useState } from 'react';
import { useRef } from 'react';

import BodyFrontPage from './User Home body/BodyFrontPage';
import DefaultBodyFrontPage from './Default body/DefaultBodyFrontPage';

interface ScreenModeProps {
  isLight: boolean
  isAuthenticated: boolean
}

export default function FrontPage({isLight, isAuthenticated }:ScreenModeProps) {
  const [menuState, setMenuState] = useState(false)
  const sideMenuRef = useRef<HTMLDivElement>(null)
  
  const toggleMenuState = () => {
    setMenuState(menuState => !menuState);

    if (!menuState && sideMenuRef.current) {
      sideMenuRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      <YTHeader toggleMenuState={toggleMenuState} isLight={isLight} isAuthenticated={isAuthenticated}/>
      <SideMenu menuState={menuState} sideMenuRef={sideMenuRef} isLight={isLight}/>
      {isAuthenticated ? (
        <BodyFrontPage menuState={menuState} />
      ) : (
        <DefaultBodyFrontPage menuState={menuState} />
      )}
    </>
  )
}