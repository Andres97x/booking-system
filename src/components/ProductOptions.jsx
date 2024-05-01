import { useState } from 'react';

const ProductOptions = () => {
  const [formData, setFormData] = useState({
    preparation: '',
  });

  console.log(formData);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  return (
    <form className='product-options'>
      <br />
      <h4>Preparacion</h4>
      <input
        type='radio'
        id='raw'
        name='preparation'
        value='1/4 raw'
        checked={formData.preparation === '1/4 raw'}
        onChange={handleChange}
      />
      <label htmlFor='raw'>1/4 raw</label>
      <br />

      <input
        type='radio'
        id='medium'
        name='preparation'
        value='2/4 medium'
        checked={formData.preparation === '2/4 medium'}
        onChange={handleChange}
      />
      <label htmlFor='medium'>2/4 medium</label>
      <br />

      <input
        type='radio'
        id='cooked'
        name='preparation'
        value='3/4 cooked'
        checked={formData.preparation === '3/4 cooked'}
        onChange={handleChange}
      />
      <label htmlFor='cooked'>3/4 cooked</label>
      <br />
    </form>
  );
};

export default ProductOptions;
