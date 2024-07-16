import Modal from './Modal';
import { MdCancel, MdOutlineDelete } from 'react-icons/md';

const DashboardDeleteCategoryModal = ({ selectedCategory }) => {
  return (
    <Modal id='modal-delete-category'>
      <div>
        <h3>Añadir categoría al menú</h3>

        <div>
          <p>
            Seguro deseas borrar la categoría{' '}
            <span>{selectedCategory?.name}?</span>
          </p>
          <p style={{ marginTop: '0.8rem' }}>
            Al borrar la catergoría también se borrarán los items que están
            enlazados a esta. *
          </p>
        </div>

        <div className='dashboard-action-btns-container'>
          <button className='dashboard-btn'>
            <MdCancel />
            Cancelar
          </button>
          <button className='dashboard-btn warning'>
            <MdOutlineDelete />
            Eliminar categoría
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DashboardDeleteCategoryModal;
