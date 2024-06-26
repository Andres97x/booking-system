import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';

const PageLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`header-wrapper ${pathname === '/' ? `hero-wrapper` : ''}`}
      >
        <Header />
        {pathname === '/' && <Hero />}
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PageLayout;
