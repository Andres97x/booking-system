import { formatPrice } from '../utils';
import Modal from './Modal';

const ProductDetailModal = ({ items, productId, handleClose }) => {
  const [selectedItem] = items?.filter(item => item.id === productId);

  return (
    <Modal className='product-modal' handleClose={handleClose}>
      <div className='product-detail-content'>
        <h4>{selectedItem?.name}</h4>
        {selectedItem?.description && <p>{selectedItem?.description}</p>}
        <p className='product-price'>{formatPrice(selectedItem?.price)}</p>
      </div>
      <div className='img-container'>
        <img
          src={selectedItem?.image}
          alt='mockup image'
          className='product-detail-img'
        />
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
