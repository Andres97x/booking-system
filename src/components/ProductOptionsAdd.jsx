import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import { formatPrice } from '../utils';
import { items, extraItems } from '../data/menuData';
import ProductOptionAdd from './ProductOptionAdd';

const ProductOptionsAdd = ({
  selectedItem,
  setOrder,
  activeGroupId,
  handleGroupClick,
}) => {
  const [itemsCounts, setItemsCounts] = useState({});

  const getGroupCount = () => {
    const result = {};

    for (const [key, value] of Object.entries(itemsCounts)) {
      const group = key.split('-')[0];

      if (!result[group]) {
        result[group] = 0;
      }

      result[group] += value;
    }

    return result;
  };
  const groupCount = getGroupCount();

  const handleAddItem = (id, item, additionGroup) => {
    if (
      additionGroup.maxItems &&
      groupCount[additionGroup.id] >= additionGroup.maxItems
    )
      return;

    setItemsCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));

    setOrder(prevOrder => ({
      ...prevOrder,
      optionAdds: [...prevOrder.optionAdds, item].sort((a, b) => a.id - b.id),
    }));
  };

  const handleRemoveItem = (id, item) => {
    if (!itemsCounts[id] || itemsCounts[id] < 1) return;
    setItemsCounts(prevCounts => ({
      ...prevCounts,
      [id]: prevCounts[id] - 1,
    }));

    setOrder(prevOrder => {
      const itemIndex = prevOrder.optionAdds.findIndex(el => el.id === item.id);
      return {
        ...prevOrder,
        optionAdds: prevOrder.optionAdds.toSpliced(itemIndex, 1),
      };
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
            {addItemsId?.map((id, i2) => (
              <ProductOptionAdd
                key={`product-option-add-${i2}`}
                id={id}
                items={items}
                extraItems={extraItems}
                formatPrice={formatPrice}
                itemsCounts={itemsCounts}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
                additionGroup={additionGroup}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  });

  return additionsEl;
};

export default ProductOptionsAdd;
