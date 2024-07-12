import { MdDelete, MdEdit } from 'react-icons/md';

// change popup for a modal maybe

import Modal from './Modal';

const CategoryOptionsModal = ({ closePopUp }) => {
  return (
    <Modal id='modal-options'>
      <h3>Opciones de categoría</h3>
      <div className='dashboard-category-options-btns-container'>
        <button className='dashboard-btn'>
          <MdEdit />
          Editar categoría
        </button>
        <button className='dashboard-btn'>
          <MdDelete />
          Eliminar categoría
        </button>
      </div>
    </Modal>
  );
};

export default CategoryOptionsModal;
