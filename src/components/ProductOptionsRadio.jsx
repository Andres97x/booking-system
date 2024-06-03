import { useRef } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import ProductOptionRadio from './ProductOptionRadio';

import { items, extraItems } from '../data/menuData';

const ProductOptionsRadio = ({
  selectedItem,
  setOrder,
  activeGroupId,
  handleGroupClick,
}) => {
  const selectedOptions = useRef({});

  const handleOptionChange = (id, value) => {
    selectedOptions.current = { ...selectedOptions.current, [id]: value };

    setOrder(prev => ({
      ...prev,
      optionRadios: [...Object.values(selectedOptions.current)],
    }));
  };

  const getGroupBadge = (selectedOptions, groupId) => {
    return selectedOptions[groupId] ? (
      <span className='group-status done'>Listo</span>
    ) : (
      <span className='group-status mandatory'>Obligatorio</span>
    );
  };

  const radiosEl = selectedItem.radio.map((radioGroup, i1) => {
    const radioItemsId = radioGroup.options;

    return (
      <div
        className={`product-options-group ${
          activeGroupId === radioGroup.id ? 'group-active' : ''
        }`}
        key={`product-options-radio-${i1}`}
      >
        <div
          className='product-options-header'
          onClick={() => handleGroupClick(radioGroup.id)}
        >
          <div className='product-options-info'>
            <h4>{radioGroup.title}</h4>
          </div>
          <div className='product-options-status'>
            {radioGroup.mandatory &&
              getGroupBadge(selectedOptions.current, radioGroup.id)}
            {activeGroupId === radioGroup.id ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
        </div>
        <div
          className='product-option-accordion'
          style={{ '--num-options': radioItemsId.length || 1 }}
        >
          <ul>
            {radioItemsId.map((id, i2) => (
              <ProductOptionRadio
                key={`product-option-radio-${i2}`}
                id={id}
                items={items}
                extraItems={extraItems}
                handleOptionChange={handleOptionChange}
                radioGroup={radioGroup}
                selectedOptions={selectedOptions}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  });

  return radiosEl;
};

export default ProductOptionsRadio;
