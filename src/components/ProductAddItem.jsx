import { useState, useRef } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import { formatPrice } from '../utils';
import mockupImg from '../assets/mockup.jpg';
import { items } from '../data/menuData';

const ProductAddItem = ({ selectedItem }) => {
  const [activeGroup, setActiveGroup] = useState(null);
  const additionGroupBtnRef = useRef([]);

  const handleGroupClick = iterator => {
    if (activeGroup === null) {
      setActiveGroup(additionGroupBtnRef.current[iterator]);
    } else if (
      activeGroup &&
      activeGroup === additionGroupBtnRef.current[iterator]
    ) {
      setActiveGroup(null);
    } else {
      setActiveGroup(null);
      setActiveGroup(additionGroupBtnRef.current[iterator]);
    }
  };

  const additionsEl = selectedItem.add.map((additionGroup, i) => {
    const addItemsId = additionGroup.items;
    const addItems = items.filter(item => addItemsId.includes(item.id));

    return (
      <div
        className={`product-add-item ${
          activeGroup === additionGroupBtnRef.current[i] &&
          additionGroupBtnRef.current[i] !== null
            ? 'group-active'
            : ''
        }`}
        key={`product-add-item-${i}`}
      >
        <div
          className='product-add-item-header'
          ref={el => (additionGroupBtnRef.current[i] = el)}
          onClick={() => handleGroupClick(i)}
        >
          <h4>{additionGroup.title}</h4>
          {activeGroup === additionGroupBtnRef.current[i] ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdKeyboardArrowDown />
          )}
        </div>
        <div className='product-options-accordion'>
          <ul>
            {addItems.map((item, i) => {
              return (
                <li
                  key={`product-option-add-${i}`}
                  className='product-option-add'
                >
                  <img src={mockupImg} alt='mockup image' />
                  <div className='product-option-add-content'>
                    <p>{item.nombre}</p>
                    <p>{formatPrice(item.precio).replace('$', '+')}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  });

  return additionsEl;
};

export default ProductAddItem;
