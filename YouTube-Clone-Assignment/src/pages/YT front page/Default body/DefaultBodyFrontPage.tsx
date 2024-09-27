import { useNavigate } from 'react-router-dom';
import '../components/YTFrontBody.css'

interface Props {
  menuState: boolean;
}

export default function DefaultBodyFrontPage({ menuState }: Props) {
  const navigate = useNavigate()

  const handleAccountClick = () => {
    navigate(`/login`);
  };

  return (
    <div className={menuState ? 'contentContainerExtend' : 'contentContainer'}>
      <h2>You need to log in to have search results</h2>
      <button className='logInBth' onClick={handleAccountClick}>
          Log In
        </button>
    </div>
  );
}
