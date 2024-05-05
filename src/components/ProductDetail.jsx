import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import mockupImg from '../assets/mockup.jpg';
import { formatPrice } from '../utils';

import ProductOptions from '../components/ProductOptions';

const ProductDetail = ({ handleSearchParams, categoryItems, productId }) => {
  const [selectedItem] = categoryItems?.filter(item => item.id === productId);
  const [productCount, setProductCount] = useState(1);
  const [order, setOrder] = useState({
    main: selectedItem,
    adds: [],
  });

  const getPrice = () => {
    const orderSubtotal = order.main.precio;
    const addsSubtotal = order.adds.map?.(add => add.precio).flat();
    const allPricesArr = [...addsSubtotal, orderSubtotal];
    return allPricesArr.reduce((prev, current) => prev + current, 0);
  };

  const increaseOneProduct = () => {
    if (productCount >= 7) return;
    setProductCount(prev => prev + 1);
  };

  const decreaseOneProduct = () => {
    if (productCount <= 1) return;
    setProductCount(prev => prev - 1);
  };

  const closeProductPopUp = () => {
    handleSearchParams('productId', null);
  };

  const priceFormatted = formatPrice(getPrice() * productCount);

  return (
    <div className='product-detail'>
      <div className='pop-up-window pop-up-product'>
        <IoCloseOutline className='pop-up-close' onClick={closeProductPopUp} />
        <div className='product-detail-content'>
          <h4>{selectedItem.nombre}</h4>
          {selectedItem.ingredientes && <p>{selectedItem.ingredientes}</p>}
          <p className='product-price'>{formatPrice(selectedItem.precio)}</p>

          <ProductOptions
            selectedItem={selectedItem}
            categoryItems={categoryItems}
            setOrder={setOrder}
          />

          <div className='product-detail-btns'>
            <div className='product-controls'>
              <FiMinus onClick={decreaseOneProduct} />
              {productCount}
              <FiPlus onClick={increaseOneProduct} />
            </div>
            <button
              className='product-add-to-cart'
              disabled={productCount <= 0}
            >
              Add {productCount > 0 ? priceFormatted : null}
            </button>
          </div>
        </div>
        <div className='img-container'>
          <img
            src={mockupImg}
            alt='mockup image'
            className='product-detail-img'
          />
        </div>
      </div>
      <div className='overlay' onClick={closeProductPopUp}></div>
    </div>
  );
};

export default ProductDetail;
