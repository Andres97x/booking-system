import { MdEdit, MdDone, MdCancel } from 'react-icons/md';

const DashboardUpdateCategoryScreen = ({
  selectedCategory,
  error,
  formData,
  onChangeHandler,
  categoriesLength,
  updateFile,
  setImageUpload,
  imageUpload,
}) => {
  const orderOptionsEl = (length, currentOrder) => {
    const options = [];

    for (let i = 1; i <= length; i++) {
      if (i === currentOrder) {
        continue;
      }

      options.push(
        <option key={`order-number-option-${i}`} value={i}>
          {i}
        </option>
      );
    }

    return options;
  };

  return (
    <div>
      <h3>Editar opciones de categoría</h3>
      <h5>{selectedCategory?.name}</h5>

      <div className='dashboard-menu-options-container'>
        {error ? <p className='menu-error-message'>{error}</p> : null}

        <div className='dashboard-menu-option-group'>
          <label htmlFor='dash-update-category-name'>
            <p>Nombre</p>
            <span>
              <MdEdit />
            </span>
          </label>

          <div>
            <input
              id='dash-update-category-name'
              type='text'
              name='name'
              placeholder={selectedCategory?.name}
              value={formData.name}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className='dashboard-menu-option-group'>
          <label htmlFor='dash-update-category-order'>
            <p>Orden de visualización</p>
            <span>
              <MdEdit />
            </span>
          </label>

          <div>
            <select
              id='dash-update-category-order'
              name='order'
              value={formData.order}
              onChange={onChangeHandler}
            >
              <option className='option-placeholder' value=''>
                Orden actual {selectedCategory?.order}
              </option>
              {orderOptionsEl(categoriesLength, selectedCategory?.order)}
            </select>
          </div>
        </div>

        <div className='dashboard-menu-option-group'>
          <label htmlFor='dash-update-category-description'>
            <p>Descripción (máx 120 caracteres)</p>
            <span>
              <MdEdit />
            </span>
          </label>

          <div>
            <textarea
              id='dash-update-category-description'
              name='description'
              rows='5'
              cols='33'
              placeholder={selectedCategory?.description}
              value={formData.description}
              onChange={onChangeHandler}
            ></textarea>
          </div>
        </div>

        <div className='dashboard-menu-option-group'>
          <label htmlFor='dash-update-category-img'>
            <p>Editar imagen</p>
            <span>
              <MdEdit />
            </span>
          </label>

          <div>
            <input
              id='dash-update-category-img'
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
              selectedCategory,
              'modal-category-options'
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

export default DashboardUpdateCategoryScreen;
