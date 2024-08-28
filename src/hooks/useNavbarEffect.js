import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useNavbarEffect = () => {
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      const scrollTop = window.scrollY;
      const scrollingDown = scrollTop > lastScrollTop;
      const isScrolledPast50 = scrollTop > 50;
      const isHomePage = pathname === '/';

      // Update navbar visibility
      header.classList.toggle('navbar-hidden', scrollingDown);

      // Update navbar style based on scroll position
      header.classList.toggle('navbar-scrolled', isScrolledPast50);

      // Add special style for non-home pages
      // if (!isHomePage) {
      //   header.classList.toggle('edge-navbar-style', isScrolledPast50);
      // }

      // Update box-shadow
      header.classList.toggle(
        'navbar-shadow',
        scrollTop > 40 && !scrollingDown
      );

      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return headerRef;
};

export default useNavbarEffect;
