const ProductOptionRadio = ({
  radioGroup,
  i2,
  item,
  selectedOptions,
  handleOptionChange,
}) => {
  const itemId = `${radioGroup.id}-${radioGroup.title.replaceAll(' ', '-')}`;

  return (
    <li>
      <div className='product-option-type product-option-radio'>
        {/* <img src={mockupImg} alt='mockup image' /> */}
        <div className='product-option-content'>
          <label htmlFor={`${radioGroup.id}-${i2}`}>{item}</label>
        </div>
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
      </div>
    </li>
  );
};

export default ProductOptionRadio;
