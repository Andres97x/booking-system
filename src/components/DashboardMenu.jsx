import { useEffect, useState } from 'react';
// prettier-ignore
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../configs/firebase';

import DashboardAddCategoryModal from './DashboardAddCategoryModal';
import DashboardAddItemModal from './DashboardAddItemModal';
import DashboardCategoryOptionsModal from './DashboardCategoryOptionsModal';
import DashboardCategoryCard from './DashboardCategoryCard';

import { clickOpenModal } from '../utils';

const DashboardMenu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'categories');
      const q = query(collectionRef, orderBy('order'));

      onSnapshot(q, querySnapshot => {
        const retrievedData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        setCategoriesData(retrievedData);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const dashboardMenuContainer = document.querySelector('.dashboard-menu');
    dashboardMenuContainer.addEventListener('click', clickOpenModal);

    return () => {
      dashboardMenuContainer.removeEventListener('click', clickOpenModal);
    };
  }, []);

  const categoriesDataEl = categoriesData.map((category, i) => (
    <DashboardCategoryCard
      category={category}
      handleCategoryClick={handleCategoryClick}
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

        <button
          className='dashboard-btn left-margin'
          data-modal='modal-add-item'
        >
          Añadir item
        </button>
      </div>

      <p className='note dashboard-menu-note'>
        Este es el orden en el que aparecen las categorias en la página de Menú
      </p>
      <div className='dashboard-menu-grid'>{categoriesDataEl}</div>

      <DashboardAddCategoryModal
        categoriesLength={categoriesData.length || 0}
      />

      <DashboardAddItemModal />

      <DashboardCategoryOptionsModal
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default DashboardMenu;
