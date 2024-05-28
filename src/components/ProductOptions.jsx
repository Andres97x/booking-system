import ProductOptionsAdd from './ProductOptionsAdd';
import ProductOptionsRadio from './ProductOptionsRadio';
import useHandleGroupClick from '../hooks/useHandleGroupClick';
import ProductOptionsChecked from './ProductOptionsCheck';

const ProductOption = ({ selectedItem, setOrder }) => {
  const { activeGroupId, handleGroupClick } = useHandleGroupClick();

  /* TODO */
  // 2) check out when there is something like radio inputs logic that need to work with add ctrl btns, for example when you are buying a combo and this combo has 2 pet drinks, then a single radio input won't meet this need because I want to be able to choose two different drinks, not the same one.
  // 3) show a badge in each group heading showing information about the max number limit for add groups (only the ones with 'multiple' property !== null) and for select groups (when necessary)
  // 4) show a badge in each group heading showing information about the group status (mandatory, done)

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
