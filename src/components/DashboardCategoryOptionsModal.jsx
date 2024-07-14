import { MdDelete, MdEdit, MdDone } from 'react-icons/md';

import Modal from './Modal';

const DashboardCategoryOptionsModal = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  console.log(selectedCategory);

  return (
    <Modal
      className='modal-options'
      onClose={() => {
        setSelectedCategory(null);
      }}
      id='modal-options'
    >
      <div>
        <h3>Opciones de categoría</h3>
        <h5>{selectedCategory?.name}</h5>

        <div className='dashboard-edit-data-container'>
          <div>
            <p>Nombre: {selectedCategory?.name}</p>
            <button>
              <MdEdit />
            </button>
            <input type='text' />
          </div>

          <div>
            <p>Orden de visualización: {selectedCategory?.order}</p>
            <button>
              <MdEdit />
            </button>
            <input type='text' />
          </div>

          <div>
            <p>Descripción: {selectedCategory?.description}</p>
            <button>
              <MdEdit />
            </button>
            <input type='text' />
          </div>

          <div>
            <p>Editar imagen</p>
            <button>
              <MdEdit />
            </button>
            <input type='text' />
          </div>
        </div>

        <div className='dashboard-category-options-btns-container'>
          <button className='dashboard-btn'>
            <MdDone />
            Confirmar cambios
          </button>
          <button className='dashboard-btn'>
            <MdDelete />
            Eliminar categoría
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DashboardCategoryOptionsModal;
