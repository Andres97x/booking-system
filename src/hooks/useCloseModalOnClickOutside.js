import { useEffect } from 'react';

const useCloseModalOnClickOutside = callbackFn => {
  useEffect(() => {
    const mainSection = document.querySelector('main');

    const clickOutsideHandler = e => {
      let modal;

      if (e.target.matches('dialog')) {
        modal = e.target;
      } else {
        modal = e.target.closest('dialog');
      }

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

    mainSection.addEventListener('click', clickOutsideHandler);

    return () => {
      mainSection.removeEventListener('click', clickOutsideHandler);
    };
  }, []);
};

export default useCloseModalOnClickOutside;
