import './Login.css';
import GoogleIcon from '../../assets/24px.svg';
import GoogleLogo from '../../assets/272px-Google_2015_logo.png';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../redux/actions/auth.action';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/store';
import { ArrowForward, DirectionsWalk } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const handleGoogleLogin = () => {
    if(!loading) dispatch(loginRequest());
  };

  const handlenavigate = () => {
    navigate('/home')
    window.location.reload
  }

  return (
    <div className='loginContainer'>
      <Box>
        <img src={GoogleLogo} alt='Google Logo' className='GGLogo' />
        <h2 className='loginLabel'>Login with Google</h2>
        
        {error && <p className='errorMessage'>{error}</p>}
        {user ? 
        <button onClick={handlenavigate} className='loginButton'>
          <DirectionsWalk/> Head on in <ArrowForward className='GGIcon'/>
        </button> 
        : 
        <button onClick={handleGoogleLogin} className='loginButton'>
          <img src={GoogleIcon} alt='Google Icon' className='GGIcon' /> Login with Google
        </button>}
      </Box>
    </div>
  );
};

export default Login;