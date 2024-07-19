import { useState } from 'react';

const useDashboardCategoryUpload = type => {
  const [imageUpload, setImageUpload] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    ...(type === 'update' && { order: '' }),
  });

  const onChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.split(' ').join('').length > 120) return;

    setCategoryForm(prev => ({ ...prev, [name]: value }));
  };

  const clearInputValues = () => {
    setCategoryForm({
      name: '',
      description: '',
      ...(type === 'update' && { order: 0 }),
    });

    setImageUpload(null);
  };

  return {
    categoryForm,
    onChangeHandler,
    imageUpload,
    setImageUpload,
    clearInputValues,
  };
};

export default useDashboardCategoryUpload;
