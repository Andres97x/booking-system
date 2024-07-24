import { useState } from 'react';
import { useParams } from 'react-router-dom';

import DashboardAddItemModal from './DashboardAddItemModal';
import useFetchInRealTime from '../hooks/useFetchInRealTime';

const DashboardMenuCategory = () => {
  const { category } = useParams();
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!category) return;

  console.log(itemsData);

  const categoryId = category.split('-')[0];
  const categoryName = category.split('-').slice(1).join(' ');

  // later fetch the items based on the category ID
  useFetchInRealTime({
    type: 'item',
    selectedCategoryId: categoryId,
    fetchOrderCriteria: 'createdAt',
    stateSetterFn: setItemsData,
    setLoading,
    setError,
  });

  // console.log(categoryId);

  return (
    <div className='dashboard-menu-category'>
      <div className='dashboard-menu-bar'>
        <h3>Items de {categoryName}</h3>

        <button className='dashboard-btn' data-modal='modal-add-item'>
          Añadir item
        </button>
      </div>

      <DashboardAddItemModal
        categoryName={categoryName}
        categoryId={categoryId}
      />
    </div>
  );
};

export default DashboardMenuCategory;
