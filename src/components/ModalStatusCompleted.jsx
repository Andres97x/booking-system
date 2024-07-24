const ModalStatusCompleted = ({
  type,
  action,
  passedName,
  clearInputValues,
  setStatus,
}) => {
  const actionMessage = action => {
    if (action === 'add') {
      return 'añadió';
    } else if (action === 'update') {
      return 'actualizó';
    } else if (action === 'delete') {
      return 'eliminó';
    }
  };

  return (
    <div className='category-completed-container'>
      <h3>
        {type === 'category' ? 'La categoría' : 'El item'} {passedName || ''} se{' '}
        {actionMessage()} correctamente
      </h3>

      {action === 'add' && (
        <div className='category-completed-action-btns'>
          <button
            className='dashboard-btn'
            onClick={() => {
              clearInputValues();
              setStatus('idle');
            }}
          >
            Añadir {type === 'category' ? 'otra categoría' : 'otro item'}
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
