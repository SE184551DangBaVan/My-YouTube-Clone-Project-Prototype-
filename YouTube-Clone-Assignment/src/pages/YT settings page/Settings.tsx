import './components/settings.css'
import YTHeader from '../../components/Header/YTHeader'
import SideMenu from '../../components/Menu/SideMenu'
import { useState } from 'react';
import { useRef } from 'react';
import { Switch } from '@mui/material';

interface ScreenModeProps {
  isLight: boolean
  isAuthenticated: boolean
  toggleScreenMode: () => void
}

export default function Settings({isLight, toggleScreenMode, isAuthenticated} : ScreenModeProps) {
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
      <YTHeader isLight={isLight} toggleMenuState={toggleMenuState} isAuthenticated={isAuthenticated}/>
      <SideMenu isLight={isLight} menuState={menuState} sideMenuRef={sideMenuRef}/>
      <div className='settingsContainer'>
        <div className='settingsContent'>
            <div>DISPLAY</div>
            <div className='settingsChoices'>
                <div>Screen Mode</div>
                <div className='settingParam'>
                    <span>{isLight ? "Light" : "Dark"}</span><Switch onClick={toggleScreenMode}/>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}