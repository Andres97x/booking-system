import { MdCancel, MdOutlineDelete } from 'react-icons/md';

const DashboardDeleteCategoryScreen = ({
  error,
  selectedCategory,
  closeModal,
  deleteCategory,
}) => {
  return (
    <div>
      <div>
        <h3>Eliminar categoría del menú</h3>
        {error ? <p className='add-category-error-message'>{error}</p> : null}
      </div>

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
        <button className='dashboard-btn' onClick={closeModal}>
          <MdCancel />
          Cancelar
        </button>
        <button
          className='dashboard-btn warning'
          onClick={() => {
            deleteCategory(
              selectedCategory.id,
              selectedCategory.imageRef,
              selectedCategory.order
            );
          }}
        >
          <MdOutlineDelete />
          Eliminar categoría
        </button>
      </div>
    </div>
  );
};

export default DashboardDeleteCategoryScreen;
