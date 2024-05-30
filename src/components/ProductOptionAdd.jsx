import { FiPlus, FiMinus } from 'react-icons/fi';

import mockupImg from '../assets/mockup.jpg';

const ProductOptionAdd = ({
  id,
  items,
  extraItems,
  formatPrice,
  itemsCounts,
  handleAddItem,
  handleRemoveItem,
  additionGroup,
}) => {
  const item =
    items.find(item => item.id === id) ||
    extraItems.find(item => item.id === id);

  const combinedId = `${additionGroup.id}-${id}`;

  return (
    <li>
      <div className='product-option-type'>
        <img src={mockupImg} alt='mockup image' />
        <div className='product-option-content product-option-content-add'>
          <p>{item.nombre}</p>
          <p className='product-option-add-price'>
            {formatPrice(item.precio).replace('$', '+')}
          </p>
        </div>
        <div className='product-option-add-ctrls'>
          {additionGroup.multiple ? (
            <>
              <div
                onClick={() => {
                  handleRemoveItem(combinedId, item);
                }}
              >
                <FiMinus
                  className={`option-remove ${
                    itemsCounts[combinedId] ? '' : 'hidden'
                  }`}
                />
              </div>
              <span
                className={`option-count ${
                  itemsCounts[combinedId] ? '' : 'hidden'
                }`}
              >
                {itemsCounts[combinedId] || 0}
              </span>
              <div
                onClick={() => {
                  handleAddItem(combinedId, item, additionGroup);
                }}
              >
                <FiPlus />
              </div>
            </>
          ) : (
            <div
              className={`single-add ${
                itemsCounts[combinedId] ? 'filled' : ''
              }`}
              onClick={() => {
                itemsCounts[combinedId]
                  ? handleRemoveItem(combinedId, item)
                  : handleAddItem(combinedId, item, additionGroup);
              }}
            ></div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ProductOptionAdd;
