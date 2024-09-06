const DashboardAddCategoryScreen = ({
  formData,
  error,
  onChangeHandler,
  submitData,
  setImageUpload,
  categoriesLength,
  imageUpload,
}) => {
  return (
    <div>
      <h3>Añadir categoría al menú</h3>
      {error ? <p className='add-category-error-message'>{error}</p> : null}
      <form>
        <div>
          <label htmlFor='dash-add-category-name'>
            Nombre de la categoría *
          </label>
          <input
            id='dash-add-category-name'
            type='text'
            name='name'
            value={formData.name}
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
            name='description'
            rows='5'
            cols='33'
            placeholder='Añade una breve descripción de la categoría (máximo 120 caracteres)'
            value={formData.description}
            onChange={onChangeHandler}
          ></textarea>
        </div>

        <div>
          <label htmlFor='dash-add-category-img'>
            Imagen de la categoría *
          </label>
          <input
            id='dash-add-category-img'
            type='file'
            accept='image/*'
            onChange={e => setImageUpload(e.target.files[0])}
          />
        </div>

        <button
          onClick={e => {
            e.preventDefault();

            submitData({
              categoriesLength,
              imageUpload,
              formData,
            });
          }}
        >
          Añadir categoría
        </button>
      </form>
    </div>
  );
};

export default DashboardAddCategoryScreen;
