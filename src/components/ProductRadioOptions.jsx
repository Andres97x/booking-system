import { useState, useRef } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { FiPlus, FiMinus } from 'react-icons/fi';

import mockupImg from '../assets/mockup.jpg';
import { items } from '../data/menuData';

const ProductRadioOption = ({ selectedItem, setOrder }) => {
  const [activeGroup, setActiveGroup] = useState(null);
  const additionGroupBtnRef = useRef([]);
  const [itemCounts, setItemCounts] = useState({});

  // console.log(itemCounts);

  const handleAddItem = item => {
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [item.id]: (prevCounts[item.id] || 0) + 1,
    }));

    setOrder(prevOrder => ({
      ...prevOrder,
      adds: [...prevOrder.adds, item],
    }));
  };

  const handleRemoveItem = item => {
    if (!itemCounts[item.id] || itemCounts[item.id] < 1) return;
    setItemCounts(prevCounts => ({
      ...prevCounts,
      [item.id]: prevCounts[item.id] - 1,
    }));

    setOrder(prevOrder => {
      const itemIndex = prevOrder.adds.findIndex(el => el.id === item.id);
      return { ...prevOrder, adds: prevOrder.adds.toSpliced(itemIndex, 1) };
    });
  };

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

  const additionsEl = selectedItem.add.map((additionGroup, i1) => {
    const addItemsId = additionGroup.items;

    const addItems = items.filter(item => addItemsId.includes(item.id));

    const addExtraItems = extraItems.filter(item =>
      addItemsId.includes(item.id)
    );
    const addItemsCombined = [...addExtraItems, ...addItems];

    // to display the option items in the order they come in addItemsId array (items data)
    const allAddItems = addItemsId
      .map(id => addItemsCombined.find(item => item.id === id))
      .filter(Boolean);

    return (
      <div
        className={`product-option product-radio-item ${
          activeGroup === additionGroupBtnRef.current[i1] &&
          additionGroupBtnRef.current[i1] !== null
            ? 'group-active'
            : ''
        }`}
        key={`product-radio-item-${i1}`}
      >
        <div
          className='product-option-header'
          ref={el => (additionGroupBtnRef.current[i1] = el)}
          onClick={() => handleGroupClick(i1)}
        >
          <h4>{additionGroup.title}</h4>
          {activeGroup === additionGroupBtnRef.current[i1] ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdKeyboardArrowDown />
          )}
        </div>
        <div className='product-options-accordion'>
          <ul>
            {allAddItems?.map((item, i2) => {
              return (
                <li
                  key={`product-option-radio-${i2}`}
                  className='product-option-type'
                >
                  {/* <img src={mockupImg} alt='mockup image' /> */}
                  <div className='product-option-radio-content'>
                    <p>{item.nombre}</p>
                    {/* <p className='option-add-price'>
                      {formatPrice(item.precio).replace('$', '+')}
                    </p> */}
                  </div>
                  <input type='radio' />
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

export default ProductRadioOption;
