import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import useHandleSearchParams from '../hooks/useHandleSearchParams';
import useFetchMenu from '../hooks/useFetchMenu';
import useCloseModalOnClickOutside from '../hooks/useCloseModalOnClickOutside';
import { formatPrice } from '../utils';
import ProductDetailModal from '../components/menu-items/ProductDetailModal';
import SubCategoriesNav from '../components/menu-items/SubCategoriesNav';
import Spinner from '../components/utils/Spinner';
import ErrorMessage from '../components/utils/ErrorMessage';

const MenuItems = () => {
  const { category } = useParams();
  const { searchParams, handleSearchParams } = useHandleSearchParams();
  const productId = searchParams.get('productId');
  const subCategory = searchParams.get('sub-category');

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const categoryId = category.split('-')[0];
  const categoryName = category.split('-').slice(1).join(' ');

  const closeProductModal = () => {
    handleSearchParams('productId', null);
  };

  useCloseModalOnClickOutside('.product-modal', closeProductModal, [productId]);

  useFetchMenu({
    type: 'items',
    selectedCategoryId: categoryId,
    stateSetterFn: setItems,
    setStatus,
    setError,
  });

  const displayedItems = subCategory
    ? items.filter(item => item.subCategory === subCategory)
    : items;

  const menuItemsEl = displayedItems.map((item, i) => {
    return (
      <button
        key={`menu-item-${i}`}
        className='menu-item'
        onClick={() => {
          handleSearchParams('productId', item.id);
        }}
      >
        <img src={item.image} alt={`imagen de ${item.name}`} />
        <div className='menu-item-content'>
          <h4>{item.name}</h4>
          {item.description && <p>{item.description}</p>}
          {item.price && <span>{formatPrice(item.price)}</span>}
        </div>
      </button>
    );
  });

  if (status === 'loading') {
    return <Spinner spinnerContainerClassName='items-spinner-container' />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        errorContainerClassName='error-menu-container'
      />
    );
  }

  return (
    <div className='section-menu-items'>
      <Link className='back-to-menu-btn' to='..' relative='path'>
        <div className='back-to-menu-btn_svg-container'>
          <IoArrowBack />
        </div>
      </Link>

      <h3>{categoryName}</h3>

      {items.some(item => item.subCategory) && (
        <SubCategoriesNav items={items} selectedSubCategory={subCategory} />
      )}

      {items.length > 0 ? (
        <div className='menu-items-grid'>{menuItemsEl}</div>
      ) : (
        <p>Aún no hay items añadidos a esta categoría</p>
      )}

      <ProductDetailModal
        items={items}
        productId={productId}
        handleClose={closeProductModal}
      />
    </div>
  );
};

export default MenuItems;
