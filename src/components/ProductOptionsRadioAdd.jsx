import { useState, useRef } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import ProductOptionRadioAdd from './ProductOptionRadioAdd';
import GroupBadge from './GroupBadge';
import { getGroupCount, transformObject } from '../utils';
// import { items, extraItems } from '../data/menuData';

const ProductOptionsRadioAdd = ({
  selectedItem,
  setOrder,
  activeGroupId,
  handleGroupClick,
}) => {
  // const items = useRef([]);
  // console.log(items.current);

  const [itemsCounts, setItemsCounts] = useState({});
  // console.log(itemsCounts);

  const groupCount = getGroupCount(itemsCounts);
  // console.log(groupCount);

  const handleAddItem = (id, item, radioAddGroup) => {
    if (
      // limiting number of chosen radio-adds
      radioAddGroup.count &&
      groupCount[radioAddGroup.id] >= radioAddGroup.count
    )
      return;

    setItemsCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));

    // items.current = [...items.current, { [id]: item }];

    setOrder(prev => {
      return {
        ...prev,
        optionRadioAdds: [
          ...prev.optionRadioAdds,
          { name: radioAddGroup.title, id, item },
        ],
      };
    });

    // Try to not use that silly ID as name, instead use the radioAddGroup that is coming to extract title
    // console.log({ name: radioAddGroup.title, item, id });

    // setOrder(prev => {
    //   return { ...prev, optionChecks: transformObject(checkedOptions.current) };
    // });
  };

  const handleRemoveItem = id => {
    if (!itemsCounts[id] || itemsCounts[id] < 1) return;
    setItemsCounts(prevCounts => ({
      ...prevCounts,
      [id]: prevCounts[id] - 1,
    }));

    setOrder(prev => {
      // console.log(id);
      const itemIndex = prev.optionRadioAdds.findIndex(el => el.id === id);
      return {
        ...prev,
        optionRadioAdds: prev.optionRadioAdds.toSpliced(itemIndex, 1),
      };
    });
  };

  const additionsEl = selectedItem.radioAdd.map((radioAddGroup, i1) => {
    const radioAddItems = radioAddGroup.options;

    return (
      <div
        className={`product-options-group ${
          activeGroupId === radioAddGroup.id ? 'group-active' : ''
        }`}
        key={`product-options-radio-add-${i1}`}
      >
        <div
          className='product-options-header'
          onClick={() => handleGroupClick(radioAddGroup.id)}
        >
          <div className='product-options-info'>
            <h4>{radioAddGroup.title}</h4>
            {/* {radioAddGroup.count && ( )} */}
            <span className='group-requirements'>
              {`Selecciona máximo
              ${radioAddGroup.count || radioAddGroup.options.length}
              opciones`}
            </span>
          </div>

          <div className='product-options-status'>
            <GroupBadge groupCount={groupCount} group={radioAddGroup} />

            {activeGroupId === radioAddGroup.id ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
        </div>
        <div
          className='product-option-accordion'
          style={{ '--num-options': radioAddItems.length || 1 }}
        >
          <ul>
            {radioAddItems?.map((item, i2) => (
              <ProductOptionRadioAdd
                key={`product-option-radio-add-${i2}`}
                i2={i2}
                item={item}
                radioAddGroup={radioAddGroup}
                itemsCounts={itemsCounts}
                handleAddItem={handleAddItem}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  });

  return additionsEl;
};

export default ProductOptionsRadioAdd;
