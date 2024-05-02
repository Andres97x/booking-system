import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import DrinksNav from '../components/DrinksNav';
import useHandleSearchParams from '../hooks/useHandleSearchParams';
import { items } from '../data/menuData';
import { formatPrice } from '../utils';
import mockupImg from '../assets/mockup.jpg';

const MenuItems = () => {
  const params = useParams();
  const { searchParams, handleSearchParams } = useHandleSearchParams();
  const productId = searchParams.get('productId');
  const drinksCategory = searchParams.get('categoria');
  // console.log(drinksCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryItems = items.filter(item => item.category === params.category);

  const displayedItems =
    params.category === 'bebidas' && drinksCategory
      ? categoryItems.filter(item => item.subcategory === drinksCategory)
      : categoryItems;

  const menuItemsEl = displayedItems?.map((item, i) => {
    const priceFormatted = formatPrice(item.precio);

    return (
      <button
        key={`menu-item-${i}`}
        className={`menu-item ${
          params.category === 'bebidas' ? 'drink-item' : ''
        }`}
        onClick={() => {
          handleSearchParams('productId', item.id);
          handleSearchParams('name', item.nombre);
        }}
      >
        <img src={mockupImg} alt='mockup image' />
        <div className='menu-item-content'>
          <h4>{item.nombre}</h4>
          {item.ingredientes && <p>{item.ingredientes}</p>}
          <span>{priceFormatted}</span>
        </div>
      </button>
    );
  });

  return (
    <div className='section-menu-items'>
      {params.category === 'bebidas' && (
        <DrinksNav drinks={categoryItems} drinksCategory={drinksCategory} />
      )}

      <div className='menu-items-grid'>{menuItemsEl}</div>
      {productId ? (
        <ProductDetail
          handleSearchParams={handleSearchParams}
          categoryItems={categoryItems}
          productId={productId}
        />
      ) : null}
    </div>
  );
};

export default MenuItems;
