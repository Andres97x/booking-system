import mockupImg from '../assets/mockup.jpg';

const ProductOptionCheck = ({
  id,
  items,
  extraItems,
  handleOptionChange,
  checkGroup,
  checkedOptions,
}) => {
  const item =
    items.find(item => item.id === id) ||
    extraItems.find(item => item.id === id);

  const combinedId = `${checkGroup.id}-${id}`;

  return (
    <li>
      <div className='product-option-type product-option-check'>
        <img src={mockupImg} alt='mockup image' />
        <div className='product-option-content'>
          <label htmlFor={`${checkGroup.id}-${id}`}>{item.nombre}</label>
        </div>
        <input
          type='checkbox'
          id={`${checkGroup.id}-${id}`}
          name={checkGroup.id}
          value={item}
          checked={checkedOptions.current[combinedId] > 0}
          onChange={() => {
            handleOptionChange(combinedId, item, checkGroup);
          }}
        />
      </div>
    </li>
  );
};

export default ProductOptionCheck;
