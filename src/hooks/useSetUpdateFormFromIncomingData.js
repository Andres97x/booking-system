import { useEffect } from 'react';

const useSetUpdateFormFromIncomingData = (
  selected,
  exceptionsArr,
  setFormData
) => {
  useEffect(() => {
    if (!selected) return;

    const incomingData = Object.fromEntries(
      Object.entries(selected)
        .filter(([key]) => !exceptionsArr.includes(key))
        .map(([key, value]) => [key, value || ''])
    );

    setFormData(prev => ({
      ...prev,
      ...incomingData,
    }));
  }, [selected]);
};

export default useSetUpdateFormFromIncomingData;
