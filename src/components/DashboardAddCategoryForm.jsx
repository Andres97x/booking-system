const DashboardAddCategoryForm = ({
  addCategoryForm,
  error,
  onChangeHandler,
  submitCategory,
  setImageUpload,
}) => {
  return (
    <form>
      <h3>Añadir categoría al menú</h3>

      {error ? <p className='add-category-error-message'>{error}</p> : null}
      <div>
        <label htmlFor='dash-add-category-name'>Nombre de la categoría *</label>
        <input
          id='dash-add-category-name'
          type='text'
          name='categoryName'
          value={addCategoryForm.categoryName}
          onChange={onChangeHandler}
          required
          autoFocus
        />
      </div>

      <div>
        <label htmlFor='dash-add-category-description'>
          Descripción de la catergoría
        </label>
        <textarea
          id='dash-add-category-description'
          name='categoryDescription'
          rows='5'
          cols='33'
          placeholder='Añade una breve descripción de la categoría (máximo 120 caracteres)'
          value={addCategoryForm.categoryDescription}
          onChange={onChangeHandler}
        ></textarea>
      </div>

      <div>
        <label htmlFor='dash-add-category-img'>Imagen de la categoría *</label>
        <input
          id='dash-add-category-img'
          type='file'
          accept='image/*'
          onChange={e => setImageUpload(e.target.files[0])}
        />
      </div>

      <button onClick={submitCategory}>Añadir categoría</button>
    </form>
  );
};

export default DashboardAddCategoryForm;
