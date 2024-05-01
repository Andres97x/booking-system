import { useSearchParams } from 'react-router-dom';

const useHandleSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = (key, value) => {
    setSearchParams(prevSP => {
      if (value === null) {
        prevSP.delete(key);
      } else {
        prevSP.set(key, value);
      }
      return prevSP;
    });
  };

  return { searchParams, handleSearchParams };
};

export default useHandleSearchParams;
