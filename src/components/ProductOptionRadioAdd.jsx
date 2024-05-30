import { FiPlus, FiMinus } from 'react-icons/fi';

import mockupImg from '../assets/mockup.jpg';

const ProductOptionRadioAdd = ({
  i2,
  item,
  radioAddGroup,
  itemsCounts,
  handleAddItem,
  handleRemoveItem,
}) => {
  const itemId = `${radioAddGroup.id}-${i2}-${radioAddGroup.title.replaceAll(
    ' ',
    '-'
  )}`;

  return (
    <li>
      <div className='product-option-type product-option-radio-add'>
        {/* <img src={mockupImg} alt='mockup image' /> */}
        <div className='product-option-content'>
          <p>{item}</p>
        </div>
        <div className='product-option-add-ctrls'>
          <>
            <div
              onClick={() => {
                handleRemoveItem(itemId);
              }}
            >
              <FiMinus
                className={`option-remove ${
                  itemsCounts[itemId] ? '' : 'hidden'
                }`}
              />
            </div>
            <span
              className={`option-count ${itemsCounts[itemId] ? '' : 'hidden'}`}
            >
              {itemsCounts[itemId] || 0}
            </span>
            <div
              onClick={() => {
                handleAddItem(itemId, item, radioAddGroup);
              }}
            >
              <FiPlus />
            </div>
          </>
        </div>
      </div>
    </li>
  );
};

export default ProductOptionRadioAdd;
