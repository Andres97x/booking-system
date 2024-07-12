import { useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({ children, id, handleClose, ...rest }) => {
  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current.close();
  };

  return (
    <>
      <dialog id={id} ref={modalRef} {...rest}>
        <button
          className='modal-close'
          onClick={handleClose ? handleClose : closeModal}
        >
          <IoCloseOutline />
        </button>
        {children}
      </dialog>
    </>
  );
};

export default Modal;
