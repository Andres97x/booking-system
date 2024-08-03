import { useEffect } from 'react';
import { MdEdit, MdDone, MdCancel } from 'react-icons/md';
import FilteredOptions from './FilteredOptions';

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

    setFormData(prev => ({ ...prev, subCategory: selectedItem.subCategory }));
  }, [selectedItem]);

  return (
    <div>
      <h3>Editar opciones de categoría</h3>
      <h5>{selectedItem?.name}</h5>

      <div className='dashboard-menu-options-container'>
        {error ? <p className='menu-error-message'>{error}</p> : null}

        <div className='dashboard-menu-option-group'>
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
              placeholder={selectedItem?.name}
              value={formData.name}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className='dashboard-menu-option-group'>
          <label htmlFor='dash-update-item-price'>
            <p>Precio (sin puntos ni comas, solo números)</p>
            <span>
              <MdEdit />
            </span>
          </label>

          <div>
            <input
              id='dash-update-item-price'
              type='number'
              name='price'
              value={formData.price}
              onChange={onChangeHandler}
              inputMode='numeric'
              pattern='[0-9]+'
              placeholder={`actual: ${selectedItem?.price}`}
            />
          </div>
        </div>

        <div className='dashboard-menu-option-group'>
          <label htmlFor='dash-update-item-description'>
            <p>Descripción</p>
            <span>
              <MdEdit />
            </span>
          </label>

          <div>
            <textarea
              id='dash-update-item-description'
              name='description'
              rows='5'
              cols='33'
              placeholder={selectedItem?.description}
              value={formData.description}
              onChange={onChangeHandler}
            ></textarea>
          </div>
        </div>

        <div className='dashboard-menu-option-group'>
          <label htmlFor='dash-update-item-sub-category'>
            <p>Sub-categoría</p>
            <span>
              <MdEdit />
            </span>
          </label>

          <p
            style={{
              fontSize: '1.4rem',
              color: selectedItem?.subCategory
                ? 'var(--font-secondary-color)'
                : '#402400',
            }}
          >
            {selectedItem?.subCategory ? (
              <>
                Actualmente hace parte de la subcategoría{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {selectedItem.subCategory}
                </span>
              </>
            ) : (
              'Actualmente no hace parte de alguna subcategoría'
            )}
          </p>

          <div>
            <input
              id='dash-update-item-sub-category'
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
        </div>

        <div className='dashboard-menu-option-group'>
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
