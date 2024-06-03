import mockupImg from '../assets/mockup.jpg';

const ProductOptionRadio = ({
  id,
  items,
  extraItems,
  handleOptionChange,
  radioGroup,
  selectedOptions,
}) => {
  const item =
    items.find(item => item.id === id) ||
    extraItems.find(item => item.id === id);

  // combinedId needs to be the same for every option in a radio group, this makes sure only one value can be selected per group on the selectedOptions object.
  const combinedId = radioGroup.id;

  return (
    <li>
      <div className='product-option-type product-option-radio'>
        <img src={mockupImg} alt='mockup image' />
        <div className='product-option-content'>
          <label htmlFor={`${radioGroup.id}-${id}`}>{item.nombre}</label>
        </div>
        <input
          type='radio'
          id={`${radioGroup.id}-${id}`}
          name={radioGroup.id}
          value={item}
          checked={item.id === selectedOptions.current[combinedId]?.id}
          onChange={() => {
            handleOptionChange(combinedId, item);
          }}
        />
      </div>
    </li>
  );
};

export default ProductOptionRadio;
