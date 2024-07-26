import { MdEdit, MdDone, MdCancel } from 'react-icons/md';

const DashboardUpdateItemScreen = ({
  selectedItem,
  error,
  formData,
  onChangeHandler,
  updateFile,
  imageUpload,
  setImageUpload,
}) => {
  console.log(formData);

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
            updateFile(formData, imageUpload, selectedItem);
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
