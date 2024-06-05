import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import Cart from './Cart';

const PageLayout = () => {
  const { pathname } = useLocation();
  const [cartActive, setCartActive] = useState(false);
  console.log(cartActive);

  return (
    <>
      <div
        className={pathname === '/' ? `header-hero__wrapper` : 'header-wrapper'}
      >
        <Header setCartActive={setCartActive} />
        {pathname === '/' && <Hero />}
      </div>

      <main>
        <Outlet />
      </main>

      {cartActive && (
        <aside>
          <Cart />
        </aside>
      )}

      <Footer />
    </>
  );
};

export default PageLayout;
