const DashboardAddCategoryCompleted = ({
  addCategoryForm,
  clearInputValues,
  setStatus,
}) => {
  return (
    <div className='category-completed-container'>
      <h3>
        La categoría {addCategoryForm.categoryName} se añadió correctamente
      </h3>

      <div className='category-completed-action-btns'>
        <button
          onClick={() => {
            clearInputValues();
            setStatus('idle');
          }}
        >
          Añadir otra categoría
        </button>
        <button
          onClick={e => {
            e.target.closest('dialog').close();
            setStatus('idle');
            clearInputValues();
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DashboardAddCategoryCompleted;
