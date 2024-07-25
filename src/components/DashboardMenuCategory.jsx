import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import DashboardAddItemModal from './DashboardAddItemModal';
import useFetchInRealTime from '../hooks/useFetchInRealTime';
import DashboardMenuCard from './DashboardMenuCard';
import Spinner from './Spinner';
import DashboardUpdateItemModal from './DashboardUpdateItemModal';

const DashboardMenuCategory = () => {
  const { category } = useParams();
  const [itemsData, setItemsData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!category) return;

  // console.log(itemsData);

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

  const itemsDataEl = itemsData.map((item, i) => (
    <DashboardMenuCard
      type='item'
      option={item}
      setSelectedOption={setSelectedItem}
      key={`dashboard-item-card-${i}`}
    />
  ));

  return (
    <div className='dashboard-menu-category'>
      <div className='dashboard-menu-bar category-bar'>
        <Link to='/dashboard/menu'>
          <h3>Categorías</h3>
        </Link>
        <span>&gt;</span>
        <h3> {categoryName}</h3>
        <button className='dashboard-btn' data-modal='modal-add-item'>
          Añadir item
        </button>
      </div>

      {loading ? (
        <Spinner spinnerContainerClassName='dashboard-menu-spinner' />
      ) : itemsData.length === 0 ? (
        <p style={{ marginTop: '2rem' }}>
          Aún no hay items añadidos a esta categoría
        </p>
      ) : (
        <div className='dashboard-menu-grid'>{itemsDataEl}</div>
      )}

      <DashboardAddItemModal
        categoryName={categoryName}
        categoryId={categoryId}
      />

      <DashboardUpdateItemModal />
    </div>
  );
};

export default DashboardMenuCategory;
