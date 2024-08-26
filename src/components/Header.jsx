import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { HiBars3 } from 'react-icons/hi2';
import Modal from './Modal';

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

  const renderNav = () => {
    const closeMobileNav = e => {
      const mobileNavModal = e.target.closest('dialog#mobile-nav');

      if (!mobileNavModal) return;

      mobileNavModal.close();
    };

    return (
      <nav>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={closeMobileNav}
        >
          Home
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={closeMobileNav}
        >
          Nosotros
        </NavLink>
        <span className='nav-signature'>Éclat Étoilé</span>
        <NavLink
          to='/menu'
          className={({ isActive }) => (isActive ? 'active' : '')}
          onClick={closeMobileNav}
        >
          Menú
        </NavLink>
        <NavLink
          to='/dashboard'
          className={({ isActive }) =>
            `dashboard-link ${isActive ? 'active' : ''}`
          }
          onClick={closeMobileNav}
        >
          Dashboard
        </NavLink>
      </nav>
    );
  };

  return (
    <header className={isMobileNavOpen ? 'mobile-nav-open' : ''}>
      <div>
        <a href={`tel:${telNumber}`}>
          <BsFillTelephoneFill />
          {telNumber}
        </a>
      </div>

      {renderNav()}

      <div>
        <NavLink to='/bookings' className='reservation-link'>
          Reservar
        </NavLink>
      </div>

      <div className='mobile-header'>
        <p>{currentPage(pathname)}</p>
        <button className='open-mobile-nav-btn' data-modal='mobile-nav'>
          <HiBars3 />
        </button>
      </div>

      <Modal id='mobile-nav'>{renderNav()}</Modal>
    </header>
  );
};

export default Header;
