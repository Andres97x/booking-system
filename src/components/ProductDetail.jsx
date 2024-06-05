import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

import mockupImg from '../assets/mockup.jpg';
import { formatPrice } from '../utils';

const ProductDetail = ({ handleSearchParams, categoryItems, productId }) => {
  const [selectedItem] = categoryItems?.filter(item => item.id === productId);

  const closeProductPopUp = () => {
    handleSearchParams('productId', null);
  };

  return (
    <div className='product-detail'>
      <div className='pop-up-window pop-up-product'>
        <IoCloseOutline className='pop-up-close' onClick={closeProductPopUp} />
        <div className='product-detail-content'>
          <h4>{selectedItem.nombre}</h4>
          {selectedItem.ingredientes && <p>{selectedItem.ingredientes}</p>}
          <p className='product-price'>{formatPrice(selectedItem.precio)}</p>
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
