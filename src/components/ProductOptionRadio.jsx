const ProductOptionRadio = ({
  radioGroup,
  i2,
  item,
  selectedOptions,
  handleOptionChange,
}) => {
  const itemId = `${radioGroup.id}-${radioGroup.title.replaceAll(' ', '-')}`;

  return (
    <li className='product-option-type product-option-radio'>
      {/* <img src={mockupImg} alt='mockup image' /> */}
      {/* <div className='product-option-radio-content'> */}
      <label htmlFor={`${radioGroup.id}-${i2}`}>{item}</label>
      {/* </div> */}
      <input
        type='radio'
        id={`${radioGroup.id}-${i2}`}
        name={radioGroup.id}
        value={item}
        checked={item === selectedOptions.current[itemId]}
        onChange={() => {
          handleOptionChange(itemId, item);
        }}
      />
    </li>
  );
};

export default ProductOptionRadio;
