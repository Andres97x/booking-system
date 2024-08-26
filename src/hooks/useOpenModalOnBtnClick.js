import { useEffect } from 'react';
import { clickOpenModal } from '../utils';

const useOpenModalOnBtnClick = () => {
  useEffect(() => {
    document.addEventListener('click', clickOpenModal);

    return () => {
      document.removeEventListener('click', clickOpenModal);
    };
  }, []);
};

export default useOpenModalOnBtnClick;
