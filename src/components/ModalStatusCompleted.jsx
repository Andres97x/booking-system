const ModalStatusCompleted = ({
  type,
  categoryName,
  clearInputValues,
  setStatus,
}) => {
  const actionMessage = () => {
    if (type === 'add') return 'añadió';
    if (type === 'update') return 'actualizó';
    if (type === 'delete') return 'eliminó';
  };

  // console.log(categoryName);

  return (
    <div className='category-completed-container'>
      <h3>
        La categoría {categoryName} se {actionMessage()} correctamente
      </h3>

      {type === 'add' && (
        <div className='category-completed-action-btns'>
          <button
            className='dashboard-btn'
            onClick={() => {
              clearInputValues();
              setStatus('idle');
            }}
          >
            Añadir otra categoría
          </button>
          <button
            className='dashboard-btn'
            onClick={e => {
              e.target.closest('dialog').close();
              setStatus('idle');
              clearInputValues();
            }}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ModalStatusCompleted;
