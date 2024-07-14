import { MdDelete, MdEdit, MdDone } from 'react-icons/md';
import useDashboardUploadForm from '../hooks/useDashboardUploadForm';

import Modal from './Modal';

const DashboardCategoryOptionsModal = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const {
    categoryForm,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  } = useDashboardUploadForm('update');

  return (
    <Modal
      className='modal-options'
      onClose={() => {
        setSelectedCategory(null);
      }}
      id='modal-options'
    >
      <div>
        <h3>Editar opciones de categoría</h3>
        <h5>{selectedCategory?.name}</h5>

        <div className='dashboard-category-options-container'>
          <div className='dashboard-category-option-group'>
            <div>
              <p>Nombre</p>
              <button>
                <MdEdit />
              </button>
            </div>

            <div>
              <div>
                <input
                  id='dash-add-category-name'
                  type='text'
                  name='categoryName'
                  placeholder={selectedCategory?.name}
                  value={categoryForm.categoryName}
                  onChange={onChangeHandler}
                  required
                  autoFocus
                />
              </div>
            </div>
          </div>

          <div className='dashboard-category-option-group'>
            <div>
              <p>Orden de visualización</p>
              <button>
                <MdEdit />
              </button>
            </div>

            <div>
              <div>
                <input type='number' placeholder={selectedCategory?.order} />
              </div>
            </div>
          </div>

          <div className='dashboard-category-option-group'>
            <div>
              <p>Descripción (máx 120 caracteres)</p>
              <button>
                <MdEdit />
              </button>
            </div>

            <div>
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
          </div>

          <div className='dashboard-category-option-group'>
            <div>
              <p>Editar imagen</p>
              <button>
                <MdEdit />
              </button>
            </div>

            <div>
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
        </div>

        <div className='dashboard-category-options-btns-container'>
          <button className='dashboard-btn'>
            <MdDone />
            Confirmar cambios
          </button>
          <button className='dashboard-btn'>
            <MdDelete />
            Eliminar categoría
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DashboardCategoryOptionsModal;
