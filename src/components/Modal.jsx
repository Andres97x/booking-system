import { useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({ children, id, handleClose, ...rest }) => {
  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current.close();
  };

  const focusFirstElement = () => {
    let firstInput = modalRef.current.querySelector('input, textarea');

    if (!firstInput) return;

    firstInput.focus();
  };

  return (
    <dialog id={id} ref={modalRef} {...rest} onAnimationEnd={focusFirstElement}>
      {children}
      <button
        className='modal-close'
        onClick={handleClose ? handleClose : closeModal}
      >
        <IoCloseOutline />
      </button>
    </dialog>
  );
};

export default Modal;
