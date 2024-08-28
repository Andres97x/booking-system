import { useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';

import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

const PageLayout = () => {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);
  const prevPathname = useRef(pathname);
  const telNumber = '555-555-555';

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (prevPathname.current !== pathname) {
      window.scrollTo(0, 0);
    }

    prevPathname.current = pathname;
  }, [pathname]);

  return (
    <>
      <div
        className={`header-wrapper ${pathname === '/' ? `hero-wrapper` : ''}`}
      >
        <Header telNumber={telNumber} />
        {pathname === '/' && <Hero />}

        <div className='util-links-container'>
          <div>
            <a href={`tel:${telNumber}`}>
              <BsFillTelephoneFill />
              {telNumber}
            </a>
          </div>

          <div>
            <NavLink to='/bookings' className='reservation-link'>
              Reservar
            </NavLink>
          </div>
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PageLayout;
