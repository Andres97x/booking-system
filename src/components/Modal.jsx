import { useRef, forwardRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = forwardRef(
  ({ children, id, handleClose, ...rest }, forwardedRef) => {
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
        <button className='modal-close' onClick={handleClose || closeModal}>
          <IoCloseOutline />
        </button>
      </dialog>
    );
  }
);

export default Modal;
