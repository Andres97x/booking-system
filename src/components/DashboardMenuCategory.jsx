import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useFetchMenuInRealTime from '../hooks/useFetchMenuInRealTime';
import DashboardMenuCard from './DashboardMenuCard';
import Spinner from './Spinner';
import DashboardAddItemModal from './DashboardAddItemModal';
import DashboardUpdateItemModal from './DashboardUpdateItemModal';
import DashboardMenuDeleteModal from './DashboardMenuDeleteModal';

const DashboardMenuCategory = () => {
  const { category } = useParams();
  const [itemsData, setItemsData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!category) return;

  const categoryId = category.split('-')[0];
  const categoryName = category.split('-').slice(1).join(' ');

  useFetchMenuInRealTime({
    type: 'item',
    selectedCategoryId: categoryId,
    fetchOrderCriteria: 'createdAt',
    stateSetterFn: setItemsData,
    setLoading,
    setError,
  });

  const subCategories = Array.from(
    new Set(
      itemsData.filter(item => item.subCategory).map(item => item.subCategory)
    )
  );

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

      {error && <p className='error-message'>{error}</p>}

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
        subCategories={subCategories}
      />

      <DashboardUpdateItemModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        subCategories={subCategories}
      />

      <DashboardMenuDeleteModal
        type='item'
        selected={selectedItem}
        setSelected={setSelectedItem}
      />
    </div>
  );
};

export default DashboardMenuCategory;
