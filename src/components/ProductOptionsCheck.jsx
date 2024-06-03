import { useRef } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import ProductOptionCheck from './ProductOptionCheck';
import GroupBadge from './GroupBadge';
import { getGroupCount } from '../utils';
import { items, extraItems } from '../data/menuData';

const ProductOptionsChecked = ({
  selectedItem,
  setOrder,
  activeGroupId,
  handleGroupClick,
}) => {
  const checkedOptions = useRef({});

  const groupCount = getGroupCount(checkedOptions.current);
  // console.log(groupCount);

  const handleOptionChange = (id, item, checkboxGroup) => {
    if (checkedOptions.current[id]) {
      // user selects on checked input
      checkedOptions.current = { ...checkedOptions.current, [id]: 0 };

      setOrder(prevOrder => {
        const itemIndex = prevOrder.optionChecks.findIndex(
          el => el.id === item.id
        );

        return {
          ...prevOrder,
          optionChecks: prevOrder.optionChecks.toSpliced(itemIndex, 1),
        };
      });
    } else {
      // user selects on unchecked input
      if (
        // limiting number of chosen options
        checkboxGroup.count &&
        groupCount[checkboxGroup.id] >= checkboxGroup.count
      )
        return;

      checkedOptions.current = { ...checkedOptions.current, [id]: 1 };

      setOrder(prevOrder => {
        return {
          ...prevOrder,
          optionChecks: [...prevOrder.optionChecks, item],
        };
      });
    }
  };

  const checksEl = selectedItem.check.map((checkGroup, i1) => {
    const checkItemsId = checkGroup.options;

    return (
      <div
        className={`product-options-group ${
          activeGroupId === checkGroup.id ? 'group-active' : ''
        }`}
        key={`product-options-check-${i1}`}
      >
        <div
          className='product-options-header'
          onClick={() => handleGroupClick(checkGroup.id)}
        >
          <div className='product-options-info'>
            <h4>{checkGroup.title}</h4>
            <span className='group-requirements'>
              {checkGroup.mandatory
                ? `Selecciona ${checkGroup.count} opciones`
                : `Selecciona máximo ${
                    checkGroup.count || checkGroup.options.length
                  } opciones`}
            </span>
          </div>
          <div className='product-options-status'>
            <GroupBadge groupCount={groupCount} group={checkGroup} />

            {activeGroupId === checkGroup.id ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
        </div>
        <div
          className='product-option-accordion'
          style={{ '--num-options': checkItemsId.length || 1 }}
        >
          <ul>
            {checkItemsId.map((id, i2) => (
              <ProductOptionCheck
                key={`product-option-check-${i2}`}
                id={id}
                items={items}
                extraItems={extraItems}
                handleOptionChange={handleOptionChange}
                checkGroup={checkGroup}
                checkedOptions={checkedOptions}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  });

  return checksEl;
};

export default ProductOptionsChecked;
