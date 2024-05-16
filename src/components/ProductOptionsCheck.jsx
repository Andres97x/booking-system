import { useRef, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import ProductOptionChecked from './ProductOptionChecked';

const ProductOptionsChecked = ({
  selectedItem,
  setOrder,
  activeGroupId,
  handleGroupClick,
}) => {
  const checkedOptions = useRef({});
  // console.log(checkedOptions.current);

  const transformObject = obj => {
    const result = {};

    for (const key in obj) {
      const name = key.split('-').slice(2).join(' ');

      if (!result[name]) {
        result[name] = [];
      }
      result[name].push(obj[key]);
    }

    return Object.entries(result)
      .map(([name, items]) => ({
        name,
        items: items.filter(Boolean),
      }))
      .filter(obj => obj.items.length > 0);
  };

  const handleOptionChange = (id, value) => {
    if (checkedOptions.current[id]) {
      // user selects on checked input
      checkedOptions.current = { ...checkedOptions.current, [id]: null };
    } else {
      // user selects on unchecked input
      checkedOptions.current = { ...checkedOptions.current, [id]: value };
    }

    setOrder(prev => {
      return { ...prev, optionChecks: transformObject(checkedOptions.current) };
    });
  };

  const checksEl = selectedItem.check.map((checkGroup, i1) => {
    const checkItems = checkGroup.options;

    return (
      <div
        className={`product-options-group ${
          activeGroupId === checkGroup.id ? 'group-active' : ''
        }`}
        key={`product-options-check-${i1}`}
      >
        <div
          className='product-option-header'
          onClick={() => handleGroupClick(checkGroup.id)}
        >
          <h4>{checkGroup.title}</h4>
          {activeGroupId === checkGroup.id ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdKeyboardArrowDown />
          )}
        </div>
        <div
          className='product-option-accordion'
          style={{ '--num-items': checkItems.length || 1 }}
        >
          <ul>
            {checkItems.map((item, i2) => (
              <ProductOptionChecked
                key={`product-option-check-${i2}`}
                checkGroup={checkGroup}
                i2={i2}
                item={item}
                checkedOptions={checkedOptions}
                handleOptionChange={handleOptionChange}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  });

  return checksEl;
};

export default ProductOptionsChecked;
