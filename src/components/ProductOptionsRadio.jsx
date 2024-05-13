import { useState, useEffect } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

// import mockupImg from '../assets/mockup.jpg';
// import { items } from '../data/menuData';

const ProductOptionsRadio = ({
  selectedItem,
  setOrder,
  activeGroupId,
  handleGroupClick,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  // console.log(Object.values(selectedOptions));

  const handleOptionChange = (id, value) => {
    setSelectedOptions(prev => ({ ...prev, [id]: value }));
  };

  // keep 2 states in sync (selectedOptions and order). Can't place setOrder inside handleOptionChange fn because both of the setter functions are of async nature, so it's not garanteed that the selected options will be ready when setOrder runs. pd: if y try to place setOrder inside the callback of setSelected options the next error will be thrown: 'can not update a component while rendering another component'
  useEffect(() => {
    setOrder(prev => ({ ...prev, options: Object.values(selectedOptions) }));
  }, [selectedOptions]);

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
          {activeGroupId === radioGroup.id ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdKeyboardArrowDown />
          )}
        </div>
        <div
          className='product-option-accordion'
          style={{ '--num-items': radioItems.length || 1 }}
        >
          <ul>
            {radioItems.map((item, i2) => {
              return (
                <li
                  key={`product-option-radio-${i2}`}
                  className='product-option-type product-option-radio'
                >
                  {/* <img src={mockupImg} alt='mockup image' /> */}
                  {/* <div className='product-option-radio-content'> */}
                  <label htmlFor={`${radioGroup.id}-${i2}`}>{item}</label>
                  {/* </div> */}
                  <input
                    type='radio'
                    id={`${radioGroup.id}-${i2}`}
                    name={`radio-${i1}`}
                    value={item}
                    checked={item === selectedOptions[radioGroup.id]}
                    onChange={() => {
                      handleOptionChange(radioGroup.id, item);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  });

  return radiosEl;
};

export default ProductOptionsRadio;
