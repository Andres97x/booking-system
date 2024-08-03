import { useState } from 'react';

const useDashboardMenuForm = (type, action) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ...(type === 'category' && action === 'update' && { order: '' }),
    ...(type === 'item' && { price: '', subCategory: '' }),
  });
  const [filteredOptions, setFilteredOptions] = useState([]);

  const onChangeHandler = e => {
    const { name, value } = e.target;
    if (type === 'category' && value.split(' ').join('').length > 120) return;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onChangeSubCategoryHandler = (e, optionsArr) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, subCategory: value }));

    const filtered = optionsArr.filter(
      option => option.toLowerCase().includes(value.toLowerCase()) && value
    );

    setFilteredOptions(filtered);
  };

  const onOptionClick = option => {
    setFormData(prev => ({ ...prev, subCategory: option }));
    setFilteredOptions([]);
  };

  const clearInputValues = () => {
    setFormData({
      name: '',
      description: '',
      ...(type === 'category' && action === 'update' && { order: 0 }),
      ...(type === 'item' && { price: '', subCategory: '' }),
    });

    setImageUpload(null);

    if (type === 'item') {
      setFilteredOptions([]);
    }
  };

  return {
    formData,
    onChangeHandler,
    onChangeSubCategoryHandler,
    onOptionClick,
    imageUpload,
    setImageUpload,
    clearInputValues,
    filteredOptions,
    setFormData,
  };
};

export default useDashboardMenuForm;
