import { MdCancel, MdOutlineDelete } from 'react-icons/md';

const DashboardMenuDeleteScreen = ({
  type,
  error,
  selected,
  closeModal,
  deleteSelected,
}) => {
  return (
    <div>
      <div>
        <h3>Eliminar {type === 'category' ? 'categoría' : 'item'} del menú</h3>
        {error ? <p className='menu-error-message'>{error}</p> : null}
      </div>

      <div>
        <p>
          Seguro deseas borrar{' '}
          {type === 'category' ? 'la categoría' : 'el item'}{' '}
          <span>{selected?.name}?</span>
        </p>
        {type === 'category' && (
          <p style={{ marginTop: '0.8rem' }}>
            Al borrar la catergoría también se borrarán los items que están
            enlazados a esta. *
          </p>
        )}
      </div>

      <div className='dashboard-action-btns-container'>
        <button className='dashboard-btn' onClick={closeModal}>
          <MdCancel />
          Cancelar
        </button>
        <button
          className='dashboard-btn warning'
          onClick={() => {
            deleteSelected({
              id: selected.id,
              imageRef: selected.imageRef,
              order: selected.order,
            });
          }}
        >
          <MdOutlineDelete />
          Eliminar {type === 'category' ? 'categoría' : 'item'}
        </button>
      </div>
    </div>
  );
};

export default DashboardMenuDeleteScreen;
