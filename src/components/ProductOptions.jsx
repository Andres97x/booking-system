import ProductOptionsAdd from './ProductOptionsAdd';
import ProductOptionsRadio from './ProductOptionsRadio';
import useHandleGroupClick from '../hooks/useHandleGroupClick';

const ProductOption = ({ selectedItem, setOrder }) => {
  const { activeGroupId, handleGroupClick } = useHandleGroupClick();

  return (
    <div className='product-options'>
      {selectedItem.add && (
        <ProductOptionsAdd
          selectedItem={selectedItem}
          setOrder={setOrder}
          activeGroupId={activeGroupId}
          handleGroupClick={handleGroupClick}
        />
      )}
      {selectedItem.radio && (
        <ProductOptionsRadio
          selectedItem={selectedItem}
          setOrder={setOrder}
          activeGroupId={activeGroupId}
          handleGroupClick={handleGroupClick}
        />
      )}
    </div>
  );
};

export default ProductOption;
