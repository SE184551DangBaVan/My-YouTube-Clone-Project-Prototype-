import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_SUCCESS } from './redux/hub'
import { onAuthStateChanged, auth, User } from './firebase'

import FrontPage from './pages/YT front page/FrontPage'
import Settings from './pages/YT settings page/Settings'
import Login from './pages/YT Login page/Login'

import PATH_NAME from './constants/pathName'
import SearchResult from './pages/YT search results/SearchResult'

const App: React.FC = () => {
  const [isLight, setIsLight] = useState(false)


  const dispatch = useDispatch()
  
  const { accessToken, user } = useSelector((state: any) => state.auth)

  const toggleScreenMode = () => {
    setIsLight(!isLight)
  }

  // Private Route that checks authentication
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return user ? children : <Navigate to={PATH_NAME.DEFAULT} />
  }

  // UseEffect to handle auth state and initialize Redux on page reload
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser && (!user || user.uid !== firebaseUser.uid)) {
        firebaseUser.getIdToken().then((token) => {
          if (token !== accessToken) { // Ensure you are not dispatching the same token again
            dispatch({
              type: LOGIN_SUCCESS,
              payload: { user: firebaseUser, accessToken: token },
            });
          }
        });
      }
    });
  
    return () => unsubscribe();
  }, [dispatch, accessToken, user]);

  return (
    <div className='app' data-theme={isLight ? 'light' : 'dark'}>
      <Router>
        <Routes>
          <Route path={PATH_NAME.HOME} element={<PrivateRoute><FrontPage isLight={isLight} isAuthenticated={!!user} /></PrivateRoute>} />
          <Route path={PATH_NAME.DEFAULT} element={<FrontPage isLight={isLight} isAuthenticated={!!user} />} />
          <Route path={PATH_NAME.LOGIN} element={<Login />} />
          <Route path={PATH_NAME.SETTINGS} element={<Settings isLight={isLight} toggleScreenMode={toggleScreenMode} isAuthenticated={!!user}/>} />
          <Route path={PATH_NAME.SEARCH} element={<SearchResult isLight={isLight} isAuthenticated={!!user} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App