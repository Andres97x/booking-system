import { useEffect, useRef } from 'react';

const useNavbarEffect = () => {
  const headerRef = useRef(null);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      const scrollTop = window.scrollY;
      const scrollingDown = scrollTop > lastScrollTop;
      const isScrolledPast50 = scrollTop > 50;

      // Update navbar visibility
      header.classList.toggle('navbar-hidden', scrollingDown);

      // Update navbar style based on scroll position
      header.classList.toggle('navbar-scrolled', isScrolledPast50);

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
  }, []);

  return headerRef;
};

export default useNavbarEffect;
