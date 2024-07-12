import mockupImg from '../assets/mockup.jpg';
import { formatPrice } from '../utils';
import Modal from './Modal';

const ProductDetailModal = ({ categoryItems, productId, handleClose }) => {
  const [selectedItem] = categoryItems?.filter(item => item.id === productId);

  return (
    <Modal className='product-modal' handleClose={handleClose}>
      <div className='product-detail-content'>
        <h4>{selectedItem?.nombre}</h4>
        {selectedItem?.ingredientes && <p>{selectedItem?.ingredientes}</p>}
        <p className='product-price'>{formatPrice(selectedItem?.precio)}</p>
      </div>
      <div className='img-container'>
        <img
          src={mockupImg}
          alt='mockup image'
          className='product-detail-img'
        />
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
