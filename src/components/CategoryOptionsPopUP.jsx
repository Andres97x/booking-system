import { MdDelete, MdEdit } from 'react-icons/md';

// change popup for a modal maybe

import PopUp from './PopUp';

const CategoryOptionsPopUP = ({ closePopUp }) => {
  return (
    <div className='dashboard-category-options-popup' inert>
      <PopUp onCloseHandler={closePopUp}>
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
      </PopUp>
    </div>
  );
};

export default CategoryOptionsPopUP;
