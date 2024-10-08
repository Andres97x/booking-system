import { useState } from 'react';
// prettier-ignore

import useFetchMenuInRealTime from '../hooks/useFetchMenuInRealTime';
import DashboardMenuCard from '../components/dashboard/DashboardMenuCard';
import DashboardAddCategoryModal from '../components/dashboard/DashboardAddCategoryModal';
import DashboardUpdateCategoryModal from '../components/dashboard/DashboardUpdateCategoryModal';
import DashboardMenuDeleteModal from '../components/dashboard/DashboardMenuDeleteModal';
import Spinner from '../components/utils/Spinner';

const DashboardMenu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      </div>

      {!error && (
        <p className='note dashboard-menu-note'>
          Este es el orden en el que aparecen las categorias en la página de
          Menú
        </p>
      )}

      {error ? (
        <p className='error-message'>{error}</p>
      ) : loading ? (
        <Spinner spinnerContainerClassName='dashboard-main-spinner' />
      ) : categoriesData.length === 0 ? (
        <>
          <p style={{ marginTop: '2rem' }}>
            Aún no hay categorias añadidas al menú
          </p>
          <button data-modal='modal-add-category' className='large'>
            +
          </button>
        </>
      ) : (
        <div className='dashboard-categories-grid'>
          {categoriesDataEl} <button data-modal='modal-add-category'>+</button>
        </div>
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
