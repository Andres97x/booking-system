const ProductOptions = () => {
  return (
    <form className='product-options'>
      <br />
      <h4>Preparacion</h4>
      <input type='radio' id='raw' name='preparation' />
      <label htmlFor='raw'>1/4 raw</label>
      <br />

      <input type='radio' id='medium' name='preparation' />
      <label htmlFor='medium'>2/4 medium</label>
      <br />

      <input type='radio' id='cooked' name='preparation' />
      <label htmlFor='cooked'>3/4 cooked</label>
      <br />
    </form>
  );
};

export default ProductOptions;
