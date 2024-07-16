import { MdEdit, MdDone, MdCancel } from 'react-icons/md';

const DashboardUpdateCategoryForm = ({
  selectedCategory,
  error,
  categoryForm,
  onChangeHandler,
  categoriesLength,
  updateFile,
  setImageUpload,
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

      <div className='dashboard-category-options-container'>
        {error ? <p className='add-category-error-message'>{error}</p> : null}
        <div className='dashboard-category-option-group'>
          <div>
            <p>Nombre</p>
            <span>
              <MdEdit />
            </span>
          </div>

          <div>
            <input
              id='dash-add-category-name'
              type='text'
              name='categoryName'
              placeholder={selectedCategory?.name}
              value={categoryForm.categoryName}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className='dashboard-category-option-group'>
          <div>
            <p>Orden de visualización</p>
            <span>
              <MdEdit />
            </span>
          </div>

          <div>
            <select
              name='order'
              value={categoryForm.order}
              onChange={onChangeHandler}
            >
              <option className='option-placeholder' value=''>
                Orden actual {selectedCategory?.order}
              </option>
              {orderOptionsEl(categoriesLength, selectedCategory?.order)}
            </select>
          </div>
        </div>

        <div className='dashboard-category-option-group'>
          <div>
            <p>Descripción (máx 120 caracteres)</p>
            <span>
              <MdEdit />
            </span>
          </div>

          <div>
            <textarea
              id='dash-add-category-description'
              name='categoryDescription'
              rows='5'
              cols='33'
              placeholder={selectedCategory?.description}
              value={categoryForm.categoryDescription}
              onChange={onChangeHandler}
            ></textarea>
          </div>
        </div>

        <div className='dashboard-category-option-group'>
          <div>
            <p>Editar imagen</p>
            <span>
              <MdEdit />
            </span>
          </div>

          <div>
            <input
              id='dash-add-category-img'
              type='file'
              accept='image/*'
              onChange={e => setImageUpload(e.target.files[0])}
            />
          </div>
        </div>
      </div>

      <div className='dashboard-action-btns-container'>
        <button className='dashboard-btn' onClick={updateFile}>
          <MdDone />
          Confirmar cambios
        </button>
        <button className='dashboard-btn'>
          <MdCancel />
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default DashboardUpdateCategoryForm;
