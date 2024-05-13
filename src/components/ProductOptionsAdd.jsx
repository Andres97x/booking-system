import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { FiPlus, FiMinus } from 'react-icons/fi';

import { formatPrice } from '../utils';
import mockupImg from '../assets/mockup.jpg';
import { items, extraItems } from '../data/menuData';

const ProductOptionsAdd = ({
  selectedItem,
  setOrder,
  activeGroupId,
  handleGroupClick,
}) => {
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

  const additionsEl = selectedItem.add.map((additionGroup, i1) => {
    const addItemsId = additionGroup.items;

    return (
      <div
        className={`product-options-group ${
          activeGroupId === additionGroup.id ? 'group-active' : ''
        }`}
        key={`product-options-add-${i1}`}
      >
        <div
          className='product-option-header'
          onClick={() => handleGroupClick(additionGroup.id)}
        >
          <h4>{additionGroup.title}</h4>
          {activeGroupId === additionGroup.id ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdKeyboardArrowDown />
          )}
        </div>
        <div
          className='product-option-accordion'
          style={{ '--num-items': addItemsId.length || 1 }}
        >
          <ul>
            {addItemsId?.map((id, i2) => {
              const item =
                items.find(item => item.id === id) ||
                extraItems.find(item => item.id === id);

              return (
                <li
                  key={`product-option-add-${i2}`}
                  className='product-option-type'
                >
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
                      <FiMinus />
                    </div>
                    <span>{itemCounts[item.id] || 0}</span>
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
            })}
          </ul>
        </div>
      </div>
    );
  });

  return additionsEl;
};

export default ProductOptionsAdd;
