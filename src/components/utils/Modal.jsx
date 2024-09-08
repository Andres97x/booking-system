import { useRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import useHandleSearchParams from '../../hooks/useHandleSearchParams';

const Modal = forwardRef(
  (
    {
      children,
      id,
      handleClose,
      status,
      isHistoryStackReplaced,
      targetSP,
      ...rest
    },
    forwardedRef
  ) => {
    const { getNewSearchParamString } = useHandleSearchParams();
    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;

    const closeModal = () => {
      if (ref.current) {
        ref.current.close();
      }
    };

    const focusFirstElement = () => {
      if (!ref.current) return;

      let firstInput = ref.current.querySelector('input, textarea');

      if (firstInput) {
        firstInput.focus();
      }
    };

    return (
      <dialog id={id} ref={ref} {...rest} onAnimationEnd={focusFirstElement}>
        {children}

        {isHistoryStackReplaced ? (
          <Link
            className='modal-close'
            to={getNewSearchParamString(targetSP, null)}
            replace={true}
          >
            <IoCloseOutline />
          </Link>
        ) : (
          <button
            className='modal-close'
            onClick={handleClose || closeModal}
            disabled={status === 'loading'}
            style={{ display: status === 'loading' ? 'none' : 'flex' }}
          >
            <IoCloseOutline />
          </button>
        )}
      </dialog>
    );
  }
);

export default Modal;
