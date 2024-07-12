import { useEffect } from 'react';

const useCloseModalOnClickOutside = () => {
  useEffect(() => {
    const mainSection = document.querySelector('main');

    mainSection.addEventListener('click', e => {
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
        modal.close();
      }
    });
  }, []);
};

export default useCloseModalOnClickOutside;
