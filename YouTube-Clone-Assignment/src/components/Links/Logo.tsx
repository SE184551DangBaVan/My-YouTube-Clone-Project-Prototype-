import YTLogoLight from '../../assets/YouTube-Logo.wine.svg'
import YTLogoDark from '../../assets/YouTube-White-Full-Color-Logo.wine.svg'

interface LinkProps {
  isLight: boolean
  handleLinkClick: () => void;
}

export default function Logo({isLight, handleLinkClick}:LinkProps) {
  return (
    <form className='YTLogo'>
      <button type='submit' onClick={handleLinkClick} className='logoContain'><img src={isLight ? YTLogoLight : YTLogoDark} alt='YouTube' className='logo'></img></button>
    </form>
  )
}
