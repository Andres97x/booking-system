const ProductOptionCheck = ({
  checkGroup,
  i2,
  item,
  checkedOptions,
  handleOptionChange,
}) => {
  const itemId = `${checkGroup.id}-${i2}-${checkGroup.title.replaceAll(
    ' ',
    '-'
  )}`;

  return (
    <li>
      <div className='product-option-type product-option-check'>
        {/* <img src={mockupImg} alt='mockup image' /> */}
        {/* <div className='product-option-radio-content'> */}
        <label htmlFor={`${checkGroup.id}-${i2}`}>{item}</label>
        {/* </div> */}
        <input
          type='checkbox'
          id={`${checkGroup.id}-${i2}`}
          name={checkGroup.id}
          value={item}
          checked={item === checkedOptions.current[itemId]}
          onChange={() => {
            handleOptionChange(itemId, item, checkGroup);
          }}
        />
      </div>
    </li>
  );
};

export default ProductOptionCheck;
