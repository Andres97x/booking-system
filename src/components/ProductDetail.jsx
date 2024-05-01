import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import mockupImg from '../assets/mockup.jpg';
import { formatPrice } from '../utils';

import ProductOptions from '../components/ProductOptions';

const ProductDetail = ({ handleSearchParams, categoryItems, productId }) => {
  const [selectedItem] = categoryItems?.filter(item => item.id === productId);

  const [productCount, setProductCount] = useState(0);

  const increaseOneProduct = () => {
    if (productCount >= 7) return;
    setProductCount(prev => prev + 1);
  };

  const decreaseOneProduct = () => {
    if (productCount <= 0) return;
    setProductCount(prev => prev - 1);
  };

  const closeProductPopUp = () => {
    handleSearchParams('productId', null);
    handleSearchParams('name', null);
  };

  const priceFormatted = formatPrice(selectedItem.precio * productCount);

  return (
    <div className='product-detail'>
      <div className='pop-up-window pop-up-product'>
        <IoCloseOutline className='pop-up-close' onClick={closeProductPopUp} />
        <div className='product-detail-content'>
          <h4>{selectedItem.nombre}</h4>
          <p>{selectedItem.ingredientes}</p>

          <ProductOptions />

          <div className='product-cart-fns'>
            <div className='cart-controls'>
              <FiMinus onClick={decreaseOneProduct} />
              {productCount}
              <FiPlus onClick={increaseOneProduct} />
            </div>
            <button className='cart-add' disabled={productCount <= 0}>
              Add {productCount > 0 ? priceFormatted : null}
            </button>
          </div>
        </div>
        <div className='img-container'>
          <img src={mockupImg} alt='mockup image' />
        </div>
      </div>
      <div className='overlay' onClick={closeProductPopUp}></div>
    </div>
  );
};

export default ProductDetail;
