import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { HiBars3 } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const telNumber = '555-555-555';
  const { pathname } = useLocation();

  const currentPage = pathname => {
    const formattedPage = pathname.split('/').slice(0, 2).join('/');

    const pages = {
      '/': 'Home',
      '/about': 'Nosotros',
      '/menu': 'Menú',
      '/dashboard': 'Dashboard',
      '/bookings': 'Reservas',
    };

    if (!pages[formattedPage]) return;

    return pages[formattedPage];
  };

  const openMobileNav = () => {
    setIsMobileNavOpen(true);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <header className={isMobileNavOpen ? 'mobile-nav-open' : ''}>
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

      <div className='mobile-header'>
        <p>{currentPage(pathname)}</p>
        <button className='open-mobile-nav-btn' onClick={openMobileNav}>
          <HiBars3 />
        </button>
      </div>

      <div className='mobile-nav-overlay'></div>

      <button className='close-mobile-nav-btn' onClick={closeMobileNav}>
        {<IoMdClose />}
      </button>
    </header>
  );
};

export default Header;
