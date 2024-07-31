import { useState } from 'react';
// prettier-ignore

import DashboardMenuCard from './DashboardMenuCard';
import DashboardAddCategoryModal from './DashboardAddCategoryModal';
import DashboardUpdateCategoryModal from './DashboardUpdateCategoryModal';
import DashboardMenuDeleteModal from './DashboardMenuDeleteModal';
import Spinner from './Spinner';
import useFetchMenuInRealTime from '../hooks/useFetchMenuInRealTime';

const DashboardMenu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(selectedCategory);

  /* TODO */

  // disable close modal button && useCloseModalOnClickOutside when state is set to loading.
  // design the subcategory system

  useFetchMenuInRealTime({
    type: 'category',
    fetchOrderCriteria: 'order',
    stateSetterFn: setCategoriesData,
    setLoading,
    setError,
  });

  const categoriesDataEl = categoriesData.map((category, i) => (
    <DashboardMenuCard
      type='category'
      option={category}
      setSelectedOption={setSelectedCategory}
      key={`dashboard-category-card-${i}`}
    />
  ));

  return (
    <div className='dashboard-menu'>
      <div className='dashboard-menu-bar'>
        <h3>Categorías</h3>
        <button className='dashboard-btn' data-modal='modal-add-category'>
          Añadir categoría
        </button>
      </div>

      <p className='note dashboard-menu-note'>
        Este es el orden en el que aparecen las categorias en la página de Menú
      </p>
      {error && <p className='error-message'>{error}</p>}

      {loading ? (
        <Spinner spinnerContainerClassName='dashboard-menu-spinner' />
      ) : categoriesData.length === 0 ? (
        <p style={{ marginTop: '2rem' }}>
          Aún no hay categorias añadidas al menú
        </p>
      ) : (
        <div className='dashboard-menu-grid'>{categoriesDataEl}</div>
      )}

      <DashboardAddCategoryModal
        categoriesLength={categoriesData.length || 0}
      />

      <DashboardUpdateCategoryModal
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoriesLength={categoriesData.length}
      />

      <DashboardMenuDeleteModal
        type='category'
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
    </div>
  );
};

export default DashboardMenu;
