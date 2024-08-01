import { useSearchParams } from 'react-router-dom';

const useHandleSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  return { searchParams, handleSearchParams };
};

export default useHandleSearchParams;
