import { FiPlus, FiMinus } from 'react-icons/fi';

import mockupImg from '../assets/mockup.jpg';

const ProductOptionAdd = ({
  id,
  items,
  extraItems,
  formatPrice,
  itemCounts,
  handleAddItem,
  handleRemoveItem,
}) => {
  const item =
    items.find(item => item.id === id) ||
    extraItems.find(item => item.id === id);

  return (
    <li className='product-option-type'>
      <img src={mockupImg} alt='mockup image' />
      <div className='product-option-add-content'>
        <p>{item.nombre}</p>
        <p className='product-option-add-price'>
          {formatPrice(item.precio).replace('$', '+')}
        </p>
      </div>
      <div className='product-option-add-ctrls'>
        <div
          onClick={() => {
            handleRemoveItem(item);
          }}
        >
          <FiMinus
            className={`option-remove ${itemCounts[item.id] ? '' : 'hidden'}`}
          />
        </div>
        <span className={`option-count ${itemCounts[item.id] ? '' : 'hidden'}`}>
          {itemCounts[item.id] || 0}
        </span>
        <div
          onClick={() => {
            handleAddItem(item);
          }}
        >
          <FiPlus />
        </div>
      </div>
    </li>
  );
};

export default ProductOptionAdd;
