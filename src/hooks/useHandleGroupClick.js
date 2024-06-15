import { useState } from 'react';

const useHandleGroupClick = () => {
  const [activeGroupId, setActiveGroupId] = useState(null);

  const handleGroupClick = id => {
    if (activeGroupId === null) {
      setActiveGroupId(id);
    } else if (activeGroupId && activeGroupId === id) {
      setActiveGroupId(null);
    } else {
      setActiveGroupId(null);
      setActiveGroupId(id);
    }
  };

  return {
    activeGroupId,
    handleGroupClick,
  };
};

export default useHandleGroupClick;
