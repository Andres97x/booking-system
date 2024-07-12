import mockupImg from '../assets/mockup.jpg';
import { formatPrice } from '../utils';
import PopUp from './PopUp';

const ProductDetail = ({ handleSearchParams, categoryItems, productId }) => {
  const [selectedItem] = categoryItems?.filter(item => item.id === productId);

  const closeProductPopUp = () => {
    handleSearchParams('productId', null);
  };

  return (
    <div className='product-detail'>
      <PopUp className='pop-up-product' onCloseHandler={closeProductPopUp}>
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
      </PopUp>
    </div>
  );
};

export default ProductDetail;
