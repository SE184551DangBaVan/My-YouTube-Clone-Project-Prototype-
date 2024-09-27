import YTHeader from '../../components/Header/YTHeader'
import SideMenu from '../../components/Menu/SideMenu'
import { useState } from 'react';
import { useRef } from 'react';
import ResultsBody from './ResultsBody/ResultsBody';
import DefaultBodyFrontPage from '../YT front page/Default body/DefaultBodyFrontPage';

interface ScreenModeProps {
  isLight: boolean
  isAuthenticated: boolean
}

export default function SearchResult({isLight, isAuthenticated}:ScreenModeProps) {

  const [menuState, setMenuState] = useState(false)
  const sideMenuRef = useRef<HTMLDivElement>(null)

  const toggleMenuState = () => {
    setMenuState(menuState => !menuState);

    if (!menuState && sideMenuRef.current) {
      sideMenuRef.current.scrollTop = 0;
    }
  };


  return (
    

    <div>
      <YTHeader toggleMenuState={toggleMenuState} isLight={isLight} isAuthenticated={isAuthenticated}/>
      <SideMenu menuState={menuState} sideMenuRef={sideMenuRef} isLight={isLight}/>
      {isAuthenticated ? (
        <ResultsBody menuState={menuState}/>
      ) : (
        <DefaultBodyFrontPage menuState={menuState} />
      )}
    </div>
  )
}
