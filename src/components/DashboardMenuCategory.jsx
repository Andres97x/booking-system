import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DashboardAddItemModal from './DashboardAddItemModal';

const DashboardMenuCategory = () => {
  const { category } = useParams();

  if (!category) return;

  const categoryId = category.split('-')[0];
  const categoryName = category.split('-').slice(1).join(' ');

  // later fetch the items based on the category ID
  useEffect(() => {}, []);

  return (
    <div className='dashboard-menu-category'>
      <div className='dashboard-menu-bar'>
        <h3>Items de {categoryName}</h3>

        <button className='dashboard-btn' data-modal='modal-add-item'>
          Añadir item
        </button>
      </div>
      <DashboardAddItemModal />
    </div>
  );
};

export default DashboardMenuCategory;
