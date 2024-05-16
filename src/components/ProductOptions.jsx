import ProductOptionsAdd from './ProductOptionsAdd';
import ProductOptionsRadio from './ProductOptionsRadio';
import useHandleGroupClick from '../hooks/useHandleGroupClick';
import ProductOptionsChecked from './ProductOptionsCheck';

const ProductOption = ({ selectedItem, setOrder }) => {
  const { activeGroupId, handleGroupClick } = useHandleGroupClick();

  return (
    <div className='product-options'>
      {selectedItem.radio && (
        <ProductOptionsRadio
          selectedItem={selectedItem}
          setOrder={setOrder}
          activeGroupId={activeGroupId}
          handleGroupClick={handleGroupClick}
        />
      )}
      {selectedItem.check && (
        <ProductOptionsChecked
          selectedItem={selectedItem}
          setOrder={setOrder}
          activeGroupId={activeGroupId}
          handleGroupClick={handleGroupClick}
        />
      )}
      {selectedItem.add && (
        <ProductOptionsAdd
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
