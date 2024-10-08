import { useEffect, useRef } from 'react';

import { formatPrice } from '../../utils';
import Modal from '../utils/Modal';

const ProductDetailModal = ({ items, productId, handleClose }) => {
  const dialogRef = useRef(null);
  const [selectedItem] = items?.filter(item => item.id === productId) || [null];

  useEffect(() => {
    if (!dialogRef.current) return;

    if (productId && selectedItem) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [productId, selectedItem]);

  if (!selectedItem) return null;

  return (
    <Modal
      className='product-modal'
      handleClose={handleClose}
      ref={dialogRef}
      isHistoryStackReplaced={true}
      targetSP='productId'
    >
      <div className='product-detail-content'>
        <h4>{selectedItem.name}</h4>
        {selectedItem.description && <p>{selectedItem.description}</p>}
        {selectedItem.price && (
          <p className='product-price'>{formatPrice(selectedItem.price)}</p>
        )}
      </div>
      <div className='product-detail-img-container'>
        <img
          src={selectedItem.image}
          alt='mockup image'
          className='product-detail-img'
        />
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
