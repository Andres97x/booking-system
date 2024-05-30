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
}) => {
  const [itemsCounts, setItemsCounts] = useState({});
  // console.log(itemsCounts);

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
