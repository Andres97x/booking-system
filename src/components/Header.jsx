import { Link } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';

const Header = () => {
  const telNumber = '555-555-555';

  return (
    <header>
      <a href={`tel:${telNumber}`}>
        <BsFillTelephoneFill />
        {telNumber}
      </a>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>Nosotros</Link>
        <Link to='/' className='nav-signature'>
          Restaurant pro
        </Link>
        <Link to='/menu'>Menú</Link>
        <a href='/#section-contact'>Contacto</a>
      </nav>
      <div>
        <Link to='/bookings' className='reservation-link'>
          Hacer una reserva
        </Link>
      </div>
    </header>
  );
};

export default Header;
