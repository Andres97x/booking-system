import { useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { categoriesItems } from '../data/menuData';
import { ProductDetail } from '../components/ProductDetail';
import mockupImg from '../assets/mockup.jpg';

const MenuItems = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  console.log(productId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [categoryItems] = categoriesItems.filter(
    cat => cat.category === params.category
  );

  const handleItemClick = (key, value) => {
    setSearchParams(prevSP => {
      if (value === null) {
        prevSP.delete(key);
      } else {
        prevSP.set(key, value);
      }
      return prevSP;
    });
  };

  const menuItemsEl = categoryItems.items?.map((item, i) => {
    const priceFormatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(item.precio);

    return (
      <button
        key={`menu-item-${i}`}
        className='menu-item'
        onClick={() => handleItemClick('productId', item.id)}
      >
        <img src={mockupImg} alt='mockup image' />
        <div className='menu-item-content'>
          <h4>{item.nombre}</h4>
          <p>{item.ingredientes}</p>
          <span>{priceFormatted.split(',')[0]}</span>
        </div>
      </button>
    );
  });

  return (
    <>
      <div className='section-menu-items'>
        <div className='menu-items-grid'>{menuItemsEl}</div>
      </div>
      {productId ? <ProductDetail /> : null}
    </>
  );
};

export default MenuItems;
