import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductDetailModal from '../components/ProductDetailModal';
import DrinksNav from '../components/DrinksNav';
import useHandleSearchParams from '../hooks/useHandleSearchParams';
import { formatPrice } from '../utils';
import useFetchMenu from '../hooks/useFetchMenu';

const MenuItems = () => {
  const { category } = useParams();
  const { searchParams, handleSearchParams } = useHandleSearchParams();
  const productId = searchParams.get('productId');
  // const drinksCategory = searchParams.get('categoria');

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const categoryId = category.split('-')[0];
  const categoryName = category.split('-').slice(1).join(' ');

  const closeProductModal = () => {
    handleSearchParams('productId', null);
  };

  useFetchMenu({
    type: 'items',
    selectedCategoryId: categoryId,
    stateSetterFn: setItems,
    setStatus,
    setError,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   const productModal = document.querySelector('.product-modal');

  //   if (productId) {
  //     productModal.showModal();
  //   } else {
  //     productModal.close();
  //   }
  // }, [productId]);

  // const displayedItems =
  //   params.category === 'bebidas' && drinksCategory
  //     ? categoryItems.filter(item => item.subcategory === drinksCategory)
  //     : categoryItems;

  const menuItemsEl = items.map((item, i) => {
    const priceFormatted = formatPrice(item.price);

    return (
      <button
        key={`menu-item-${i}`}
        className={`menu-item ${
          categoryName === 'bebidas' ? 'drink-item' : ''
        }`}
        onClick={() => {
          handleSearchParams('productId', item.id);
        }}
      >
        <img src={item.image} alt='mockup image' />
        <div className='menu-item-content'>
          <h4>{item.name}</h4>
          {item.description && <p>{item.description}</p>}
          <span>{priceFormatted}</span>
        </div>
      </button>
    );
  });

  return (
    <div className='section-menu-items'>
      {/* {params.category === 'bebidas' && (
        <DrinksNav drinks={categoryItems} drinksCategory={drinksCategory} />
      )} */}

      <div className='menu-items-grid'>{menuItemsEl}</div>

      {/* <ProductDetailModal
        categoryItems={categoryItems}
        productId={productId}
        handleClose={closeProductModal}
      /> */}
    </div>
  );
};

export default MenuItems;
