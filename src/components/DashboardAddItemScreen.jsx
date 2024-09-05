import FilteredOptions from './FilteredOptions';

const DashboardAddItemScreen = ({
  categoryName,
  error,
  formData,
  onChangeHandler,
  onChangeSubCategoryHandler,
  onOptionClick,
  imageUpload,
  setImageUpload,
  submitData,
  categoryId,
  filteredOptions,
  subCategories,
}) => {
  return (
    <>
      <h3>Añadir item a la categoría</h3>
      <h5>{categoryName}</h5>

      <form>
        {error ? <p className='add-category-error-message'>{error}</p> : null}
        <div>
          <label htmlFor='dash-add-item-name'>Nombre del item *</label>
          <input
            id='dash-add-item-name'
            type='text'
            name='name'
            value={formData.name}
            onChange={onChangeHandler}
            required
            autoFocus
          />
        </div>

        <div>
          <label htmlFor='dash-add-item-description'>
            Descripción del item
          </label>
          <textarea
            id='dash-add-item-description'
            name='description'
            rows='5'
            cols='33'
            placeholder='Añade una breve descripción de la categoría o los ingrendientes que contiene.'
            value={formData.description}
            onChange={onChangeHandler}
          ></textarea>
        </div>

        <div>
          <label htmlFor='dash-add-item-price'>Precio</label>
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={onChangeHandler}
            inputMode='numeric'
            pattern='[0-9]+'
            id='dash-add-item-price'
            placeholder='sin puntos ni comas (solo números).'
          />
        </div>

        <div>
          <label htmlFor='dash-add-item-sub-category'>Sub-categoría</label>
          <input
            id='dash-add-item-sub-category'
            type='text'
            name='subCategory'
            value={formData.subCategory}
            onChange={e => {
              onChangeSubCategoryHandler(e, subCategories);
            }}
            placeholder='Necesario solo si se desea un filtro adicional.'
            autoComplete='off'
          />

          {filteredOptions.length > 0 && (
            <FilteredOptions
              filteredOptions={filteredOptions}
              onOptionClick={onOptionClick}
              query={formData.subCategory}
            />
          )}
        </div>

        <div>
          <label htmlFor='dash-add-category-img'>Imagen del item *</label>
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
              categoryId,
              imageUpload,
              formData,
            });
          }}
        >
          Añadir item
        </button>
      </form>
    </>
  );
};

export default DashboardAddItemScreen;
