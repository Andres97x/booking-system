import { Link } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';

const Header = () => {
  const telNumber = '555-555-555';

  return (
    <header>
      <div>
        <a href={`tel:${telNumber}`}>
          <BsFillTelephoneFill />
          {telNumber}
        </a>
      </div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>Nosotros</Link>
        <span className='nav-signature'>Éclat Étoilé</span>
        <Link to='/menu'>Menú</Link>
        {/* <a href='/'>Contacto</a> */}
        <Link className='dashboard-link' to='/dashboard'>
          Dashboard
        </Link>
      </nav>
      <div>
        <Link to='/bookings' className='reservation-link'>
          Reservar
        </Link>
      </div>
    </header>
  );
};

export default Header;
