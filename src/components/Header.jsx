import { Link } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoMdCart } from 'react-icons/io';

const Header = ({ setCartActive }) => {
  const telNumber = '555-555-555';

  return (
    <header>
      <a href={`tel:${telNumber}`}>
        <BsFillTelephoneFill />
        Call {telNumber}
      </a>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>Nosotros</Link>
        <Link to='/' className='nav-signature'>
          Restaurant pro
        </Link>
        <Link to='/menu'>Menú</Link>
        <Link to='/bookings' className='reservation-link'>
          Reservar
        </Link>
      </nav>
      <div>
        <button onClick={() => setCartActive(prev => !prev)}>
          <IoMdCart />
        </button>
      </div>
    </header>
  );
};

export default Header;
