const ProductOptionChecked = ({
  checkGroup,
  i2,
  item,
  checkedOptions,
  handleOptionChange,
}) => {
  const checkId = `${checkGroup.id}-${i2}-${checkGroup.title.replaceAll(
    ' ',
    '-'
  )}`;

  return (
    <li className='product-option-type product-option-check'>
      {/* <img src={mockupImg} alt='mockup image' /> */}
      {/* <div className='product-option-radio-content'> */}
      <label htmlFor={`${checkGroup.id}-${i2}`}>{item}</label>
      {/* </div> */}
      <input
        type='checkbox'
        id={`${checkGroup.id}-${i2}`}
        name={checkGroup.id}
        value={item}
        checked={item === checkedOptions.current[checkId]}
        onChange={() => {
          handleOptionChange(checkId, item);
        }}
      />
    </li>
  );
};

export default ProductOptionChecked;
