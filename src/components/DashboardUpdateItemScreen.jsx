import { useEffect } from 'react';
import { MdEdit, MdDone, MdCancel } from 'react-icons/md';
import FilteredOptions from './FilteredOptions';
import { formatPrice } from '../utils';

const DashboardUpdateItemScreen = ({
  selectedItem,
  error,
  formData,
  onChangeHandler,
  onChangeSubCategoryHandler,
  onOptionClick,
  updateFile,
  imageUpload,
  setImageUpload,
  filteredOptions,
  subCategories,
  setFormData,
}) => {
  useEffect(() => {
    if (!selectedItem) return;

    const exceptions = ['createdAt', 'id', 'categoryId', 'imageRef'];

    const incomingData = Object.fromEntries(
      Object.entries(selectedItem)
        .filter(([key]) => !exceptions.includes(key))
        .map(([key, value]) => [key, value || ''])
    );

    setFormData(prev => ({
      ...prev,
      ...incomingData,
    }));
  }, [selectedItem]);

  return (
    <div>
      <h3>Editar opciones de categoría</h3>
      <h5>{selectedItem?.name}</h5>

      <div className='dashboard-menu-options-container'>
        {error ? <p className='menu-error-message'>{error}</p> : null}

        <div
          className={`dashboard-menu-option-group ${
            formData.name !== selectedItem?.name ? 'update-detected' : ''
          }`}
        >
          <label htmlFor='dash-update-item-name'>
            <p>Nombre</p>
            <span>
              <MdEdit />
            </span>
          </label>

          <div>
            <input
              id='dash-update-item-name'
              type='text'
              name='name'
              placeholder={`Actual: ${selectedItem?.name}`}
              value={formData.name}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div
          className={`dashboard-menu-option-group ${
            parseInt(formData.price) !== parseInt(selectedItem?.price) &&
            formData.price !== ''
              ? 'update-detected'
              : ''
          }`}
        >
          <label htmlFor='dash-update-item-price'>
            <p>Precio (sin puntos ni comas, solo números)</p>
            <span>
              <MdEdit />
            </span>
          </label>

          {selectedItem?.price && (
            <p className='warning-message'>
              Al dejar este campo vacío se eliminará el precio del item
            </p>
          )}

          <div>
            <input
              id='dash-update-item-price'
              type='number'
              name='price'
              value={formData.price}
              onChange={onChangeHandler}
              inputMode='numeric'
              pattern='[0-9]+'
              placeholder={
                selectedItem?.price
                  ? `Actual: ${formatPrice(selectedItem.price)}`
                  : 'Actualmente este item no tiene precio'
              }
            />
          </div>
        </div>

        <div
          className={`dashboard-menu-option-group ${
            formData.description !== selectedItem?.description &&
            formData.description !== ''
              ? 'update-detected'
              : ''
          }`}
        >
          <label htmlFor='dash-update-item-description'>
            <p>Descripción</p>
            <span>
              <MdEdit />
            </span>
          </label>

          {selectedItem?.description && (
            <p className='warning-message'>
              Al dejar este campo vacío se eliminará la descripción del item
            </p>
          )}

          <div>
            <textarea
              id='dash-update-item-description'
              name='description'
              rows='5'
              cols='33'
              placeholder={
                selectedItem?.description
                  ? `Actual: ${selectedItem.description}`
                  : 'Actualmente este item no tiene descripción'
              }
              value={formData.description}
              onChange={onChangeHandler}
            ></textarea>
          </div>
        </div>

        <div
          className={`dashboard-menu-option-group ${
            formData.subCategory !== selectedItem?.subCategory &&
            formData.subCategory !== ''
              ? 'update-detected'
              : ''
          }`}
        >
          <label htmlFor='dash-update-item-sub-category'>
            <p>Sub-categoría</p>
            <span>
              <MdEdit />
            </span>
          </label>

          {selectedItem?.subCategory && (
            <p className='warning-message'>
              Al dejar este campo vacío se eliminará la subcategoría del item
            </p>
          )}

          <div>
            <input
              id='dash-update-item-sub-category'
              type='text'
              name='subCategory'
              value={formData.subCategory}
              onChange={e => {
                onChangeSubCategoryHandler(e, subCategories);
              }}
              placeholder={
                !selectedItem?.subCategory
                  ? 'Actualmente este item no tiene subcategoría'
                  : ''
              }
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
        </div>

        <div
          className={`dashboard-menu-option-group ${
            imageUpload ? 'update-detected' : ''
          }`}
        >
          <label htmlFor='dash-update-menu-img'>
            <p>Editar imagen</p>
            <span>
              <MdEdit />
            </span>
          </label>

          <div>
            <input
              id='dash-update-menu-img'
              type='file'
              accept='image/*'
              onChange={e => setImageUpload(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      <div className='dashboard-action-btns-container'>
        <button
          className='dashboard-btn'
          onClick={() => {
            updateFile(
              formData,
              imageUpload,
              selectedItem,
              'modal-item-options'
            );
          }}
        >
          <MdDone />
          Confirmar cambios
        </button>
        <button
          className='dashboard-btn'
          onClick={e => {
            const modal = e.target.closest('dialog');

            if (!modal) return;

            modal.close();
          }}
        >
          <MdCancel />
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DashboardUpdateItemScreen;
