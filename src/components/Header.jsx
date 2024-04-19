import { BsFillTelephoneFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Header = () => {
  const telNumber = '555-555-555';

  return (
    <header>
      <a href={`tel:${telNumber}`}>
        <BsFillTelephoneFill />
        Call {telNumber}
      </a>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/menu'>Menu</Link>
        <Link to='/' className='nav-signature'>
          Restaurant Pro
        </Link>
        <Link to='/news'>News</Link>
        <a href='#section-contact'>Contact</a>
      </nav>
      <Link to='/bookings' className='reservation-link'>
        Make a reservation
      </Link>
    </header>
  );
};

export default Header;
