import { useSearchParams } from 'react-router-dom';

const useHandleSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // To be used with buttons and others
  const handleSearchParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // To be used with react-router's Link
  const getNewSearchParamString = (key, value) => {
    const sp = new URLSearchParams(searchParams);
    if (value === null) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    return `?${sp.toString()}`;
  };

  return { searchParams, handleSearchParams, getNewSearchParamString };
};

export default useHandleSearchParams;
