import { useRef } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import ProductOptionRadio from './ProductOptionRadio';

// import mockupImg from '../assets/mockup.jpg';
// import { items } from '../data/menuData';

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
      // transforming result object to an array of  {name, value} objects
      optionRadios: Object.entries(selectedOptions.current).map(
        ([name, value]) => ({
          name: name.split('-').slice(1).join(' '),
          value,
        })
      ),
    }));
  };

  const getGroupStatus = obj => {
    const groupChecked = {};

    for (const key in obj) {
      const groupName = key.split('-')[0];

      if (!groupChecked[groupName]) {
        groupChecked[groupName] = true;
      }
    }

    return groupChecked;
  };

  const groupStatus = getGroupStatus(selectedOptions.current);

  const getGroupBadge = group => {
    return groupStatus[group.id] ? (
      <span className='group-status done'>Listo</span>
    ) : (
      <span className='group-status mandatory'>Obligatorio</span>
    );
  };

  const radiosEl = selectedItem.radio.map((radioGroup, i1) => {
    const radioItems = radioGroup.options;

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
          <h4>{radioGroup.title}</h4>
          <div className='product-options-status'>
            {radioGroup.mandatory && getGroupBadge(radioGroup)}
            {activeGroupId === radioGroup.id ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
        </div>
        <div
          className='product-option-accordion'
          style={{ '--num-options': radioItems.length || 1 }}
        >
          <ul>
            {radioItems.map((item, i2) => (
              <ProductOptionRadio
                key={`product-option-radio-${i2}`}
                radioGroup={radioGroup}
                i2={i2}
                item={item}
                selectedOptions={selectedOptions}
                handleOptionChange={handleOptionChange}
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
