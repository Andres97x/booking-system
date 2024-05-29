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
  // console.log(selectedOptions.current);

  const handleOptionChange = (id, value) => {
    selectedOptions.current = { ...selectedOptions.current, [id]: value };
    setOrder(prev => ({
      ...prev,
      // transforming result object to an array of  {name, value} objects
      optionRadios: Object.values(
        Object.entries(selectedOptions.current).map(([name, value]) => ({
          name: name.split('-').slice(1).join(' '),
          value,
        }))
      ),
    }));
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
          className='product-option-header'
          onClick={() => handleGroupClick(radioGroup.id)}
        >
          <h4>{radioGroup.title}</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {radioGroup.mandatory && (
              <span className='group-mandatory'>Mandatory</span>
            )}
            {activeGroupId === radioGroup.id ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
        </div>
        <div
          className='product-option-accordion'
          style={{ '--num-items': radioItems.length || 1 }}
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
