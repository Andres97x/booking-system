import { NavLink } from 'react-router-dom';
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
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Nosotros
        </NavLink>
        <span className='nav-signature'>Éclat Étoilé</span>
        <NavLink
          to='/menu'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Menú
        </NavLink>
        {/* <a href='/'>Contacto</a> */}
        <NavLink
          to='/dashboard'
          className={({ isActive }) =>
            `dashboard-link ${isActive ? 'active' : ''}`
          }
        >
          Dashboard
        </NavLink>
      </nav>
      <div>
        <NavLink to='/bookings' className='reservation-link'>
          Reservar
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
