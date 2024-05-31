import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import ProductOptionAdd from './ProductOptionAdd';
import GroupBadge from './GroupBadge';
import { formatPrice, getGroupCount } from '../utils';
import { items, extraItems } from '../data/menuData';

const ProductOptionsAdd = ({
  selectedItem,
  setOrder,
  activeGroupId,
  handleGroupClick,
  type,
}) => {
  const [itemsCounts, setItemsCounts] = useState({});
  // {a1-90: 1, a1-79: 1, a2-85: 2, a2-106: 1, a3-48: 1}

  const groupCount = getGroupCount(itemsCounts);
  // console.log(groupCount);

  const handleAddItem = (id, item, additionGroup) => {
    if (
      // limiting number of chosen adds
      additionGroup.count &&
      groupCount[additionGroup.id] >= additionGroup.count
    )
      return;

    setItemsCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));

    const optionType = type === 'mandatory' ? 'optionRadioAdds' : 'optionAdds';

    setOrder(prevOrder => ({
      ...prevOrder,
      [optionType]: [...prevOrder[optionType], item].sort(
        (a, b) => a.id - b.id
      ),
    }));
  };

  const handleRemoveItem = (id, item) => {
    if (!itemsCounts[id] || itemsCounts[id] < 1) return;
    setItemsCounts(prevCounts => ({
      ...prevCounts,
      [id]: prevCounts[id] - 1,
    }));

    const optionType = type === 'mandatory' ? 'optionRadioAdds' : 'optionAdds';

    setOrder(prevOrder => {
      const itemIndex = prevOrder[optionType].findIndex(
        el => el.id === item.id
      );

      return {
        ...prevOrder,
        [optionType]: prevOrder[optionType].toSpliced(itemIndex, 1),
      };
    });
  };

  const addType = type === 'mandatory' ? 'radioAdd' : 'add';

  const additionsEl = selectedItem[addType].map((additionGroup, i1) => {
    const addItemsId = additionGroup.options;

    return (
      <div
        className={`product-options-group ${
          activeGroupId === additionGroup.id ? 'group-active' : ''
        }`}
        key={`product-options-add-${i1}`}
      >
        <div
          className='product-options-header'
          onClick={() => handleGroupClick(additionGroup.id)}
        >
          <div className='product-options-info'>
            <h4>{additionGroup.title}</h4>
            <span className='group-requirements'>
              {`Selecciona máximo
              ${additionGroup.count || additionGroup.options.length}
              opciones`}
            </span>
          </div>

          <div className='product-options-status'>
            <GroupBadge groupCount={groupCount} group={additionGroup} />

            {activeGroupId === additionGroup.id ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
        </div>
        <div
          className='product-option-accordion'
          style={{ '--num-options': addItemsId.length || 1 }}
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
                type={type}
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
