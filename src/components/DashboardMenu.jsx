import { useEffect, useState } from 'react';
// prettier-ignore
import { collection,  query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { IoEllipsisVertical } from 'react-icons/io5';

import useHandleSearchParams from '../hooks/useHandleSearchParams';
import DashboardAddCategoryModal from './DashboardAddCategoryModal';
import DashboardAddItemModal from './DashboardAddItemModal';
import CategoryOptionsModal from './CategoryOptionsModal';

const DashboardMenu = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const { searchParams, handleSearchParams } = useHandleSearchParams();

  useEffect(() => {
    // fetching data in real-time
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
    // Adding event listener to open modals using event delegation, because this button may not exists when the component first mount and I hate that forwardRef syntax
    const dashboardMenuContainer = document.querySelector('.dashboard-menu');

    const handleClick = e => {
      let modalOpener;
      if (e.target.matches('button[data-modal]')) {
        modalOpener = e.target;
      } else {
        modalOpener = e.target.closest('button[data-modal]');
      }

      if (!modalOpener) return;

      const modalElement = document.getElementById(
        `${modalOpener.dataset.modal}`
      );

      if (!modalElement) return;

      modalElement.showModal();
    };

    dashboardMenuContainer.addEventListener('click', handleClick);

    return () => {
      dashboardMenuContainer.removeEventListener('click', handleClick);
    };
  }, []);

  const categoriesDataEl = categoriesData.map((category, i) => {
    return (
      <div
        className='dashboard-menu-category-card'
        key={`dashboard-menu-category-card-${i}`}
      >
        <div className='category-card-header'>
          <p className='category-card-name'>
            {category.name[0].toUpperCase() + category.name.slice(1)}
          </p>
          <span className='category-card-order'>orden: {category.order}</span>
        </div>
        <div className='category-card-options'>
          <button
            className='dashboard-menu-see-items'
            onClick={() => {
              handleSearchParams(
                'category',
                `${category.name.split(' ').join('-').toLowerCase()}`
              );
            }}
          >
            Ver items
          </button>
          <button
            className='dashboard-menu-see-options'
            data-modal='modal-options'
          >
            <IoEllipsisVertical />
          </button>
        </div>
      </div>
    );
  });

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

      <DashboardAddCategoryModal
        categoriesLength={categoriesData.length || 0}
      />

      <DashboardAddItemModal />

      <CategoryOptionsModal />

      <p className='note dashboard-menu-note'>
        Este es el orden en el que aparecen las categorias en la página de Menú
      </p>
      <div className='dashboard-menu-grid'>{categoriesDataEl}</div>
    </div>
  );
};

export default DashboardMenu;
