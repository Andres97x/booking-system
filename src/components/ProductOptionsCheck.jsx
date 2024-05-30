import { useRef } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import ProductOptionCheck from './ProductOptionCheck';
import GroupBadge from './GroupBadge';
import { transformObject, getGroupCount } from '../utils';

const ProductOptionsChecked = ({
  selectedItem,
  setOrder,
  activeGroupId,
  handleGroupClick,
}) => {
  const checkedOptions = useRef({});
  // console.log(checkedOptions.current);

  const groupCount = getGroupCount(checkedOptions.current, 'checkbox');
  // console.log(groupCount);

  const handleOptionChange = (id, value, checkboxGroup) => {
    if (checkedOptions.current[id]) {
      // user selects on checked input
      checkedOptions.current = { ...checkedOptions.current, [id]: null };
    } else {
      // user selects on unchecked input
      if (
        // limiting number of chosen options
        checkboxGroup.count &&
        groupCount[checkboxGroup.id] >= checkboxGroup.count
      )
        return;

      checkedOptions.current = { ...checkedOptions.current, [id]: value };
    }

    setOrder(prev => {
      return { ...prev, optionChecks: transformObject(checkedOptions.current) };
    });
  };

  const checksEl = selectedItem.check.map((checkGroup, i1) => {
    const checkItems = checkGroup.options;

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
            {/* {checkGroup.count && ( )} */}
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
          style={{ '--num-options': checkItems.length || 1 }}
        >
          <ul>
            {checkItems.map((item, i2) => (
              <ProductOptionCheck
                key={`product-option-check-${i2}`}
                checkGroup={checkGroup}
                i2={i2}
                item={item}
                checkedOptions={checkedOptions}
                handleOptionChange={handleOptionChange}
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
