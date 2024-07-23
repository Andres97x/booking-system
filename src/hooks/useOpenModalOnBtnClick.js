import { useEffect } from 'react';

import { clickOpenModal } from '../utils';

const useOpenModalOnBtnClick = () => {
  useEffect(() => {
    const mainSection = document.querySelector('main');

    mainSection.addEventListener('click', clickOpenModal);

    return () => {
      mainSection.removeEventListener('click', clickOpenModal);
    };
  }, []);
};

export default useOpenModalOnBtnClick;
