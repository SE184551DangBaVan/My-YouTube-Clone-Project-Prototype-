import { Menu, Mic, Search, VideoCallOutlined, NotificationsOutlined, History } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import Logo from '../Links/Logo';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logoutRequest, saveSearchHistory } from '../../redux/hub';
import { getSearchVideos } from '../../redux/actions/video.action';

interface HomeSideMenuProps {
  isLight: boolean;
  isAuthenticated: boolean;
  toggleMenuState: () => void;
}

export default function YTHeader({ isLight, toggleMenuState, isAuthenticated }: HomeSideMenuProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;

    dispatch(saveSearchHistory(searchTerm));

    navigate(`/search/${searchTerm}`);
    handleSearchFromTerm(searchTerm);  // Use the new function
    scrollToTop();
  };

  const handleSearchFromTerm = useCallback((term: string) => {
    dispatch(getSearchVideos(term));
    saveSearchTerm(term);  // Optionally save the term if needed
  }, [dispatch]);

  const saveSearchTerm = (term: string) => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    if (!history.includes(term)) {
      const updatedHistory = [term, ...history].slice(0, 10); // Limit at 10 most recent searches
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    });
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    navigate(`/search/${term}`);
    handleSearchFromTerm(term);  // Pass the clicked term
  };

  const handleLogOutClick = async () => {
    try {
      await dispatch(logoutRequest());
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="homeHeaderYT">
      <div className="iconAndLogo">
        <button onClick={toggleMenuState} className="headerIcon">
          <Menu />
        </button>
        <Logo isLight={isLight} handleLinkClick={() => navigate('/home')} />
      </div>

      <form className="searchBar" onSubmit={handleSearchClick}>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="searchHistory">
            {searchHistory.map((term, index) => (
              <div
                key={index}
                className="historyItem"
                onClick={() => handleHistoryClick(term)}
              >
                <History />
                {term}
              </div>
            ))}
          </div>
        </div>
        <button className="searchBtn" type="submit">
          <Search />
        </button>
        <button className="micBtn">
          <Mic />
        </button>
      </form>

      <div className="userUtility">
        <button className="uploadIcon">
          <VideoCallOutlined />
        </button>
        <button className="notificationsIcon">
          <NotificationsOutlined />
        </button>
        {isAuthenticated ? (
          <>
            <button className="profileAvatar">
              <Avatar />
            </button>
            <button className="profileAction" onClick={handleLogOutClick}>
              Log Out
            </button>
          </>
        ) : (
          <button className="profileAction" onClick={() => navigate('/login')}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
}