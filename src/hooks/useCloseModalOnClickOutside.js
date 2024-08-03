import { useEffect } from 'react';

const useCloseModalOnClickOutside = (selector, callbackFn, dependenciesArr) => {
  useEffect(() => {
    const clickOutsideHandler = e => {
      const modal = e.target.closest(selector);

      if (!modal) return;

      const dialogDimensions = modal.getBoundingClientRect();

      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        callbackFn(modal);
      }
    };

    document.addEventListener('mousedown', clickOutsideHandler);

    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, dependenciesArr);
};

export default useCloseModalOnClickOutside;
