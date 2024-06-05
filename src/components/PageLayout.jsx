import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import Cart from './Cart';

const PageLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={pathname === '/' ? `header-hero__wrapper` : 'header-wrapper'}
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
