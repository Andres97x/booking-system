import { useState } from 'react';

const useDashboardMenuForm = (type, action) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ...(type === 'category' && action === 'update' && { order: '' }),
    ...(type === 'item' && { price: '', subCategory: '' }),
  });

  const onChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (type === 'category' && value.split(' ').join('').length > 120) return;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearInputValues = () => {
    setFormData({
      name: '',
      description: '',
      ...(type === 'category' && action === 'update' && { order: 0 }),
      ...(type === 'item' && { price: '', subCategory: '' }),
    });

    setImageUpload(null);
  };

  return {
    formData,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  };
};

export default useDashboardMenuForm;
