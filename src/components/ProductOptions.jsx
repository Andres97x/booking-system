import ProductOptionsAdd from './ProductOptionsAdd';
import ProductOptionsRadio from './ProductOptionsRadio';
import useHandleGroupClick from '../hooks/useHandleGroupClick';
import ProductOptionsChecked from './ProductOptionsCheck';

const ProductOption = ({ selectedItem, setOrder }) => {
  const { activeGroupId, handleGroupClick } = useHandleGroupClick();

  /* TODO */
  // 1) show a badge in each group heading showing information about the max number limit for add groups (only the ones with 'multiple' property !== null) and for select groups (when necessary)
  // 2) show a badge in each group heading showing information about the group status (mandatory, done)
  // 3) check out when there is something like radio inputs logic that need to work with add ctrl btns, for example when you are buying a combo and this combo has 2 pet drinks, then a single radio input won't meet this need because I want to be able to choose two different drinks, not the same one.

  return (
    // Radios are multiple options with one only choice that are almost always mandatory.
    // Checks are multiple options with more than one choices, they are sometimes mandatory and may have a limit of choices
    // Adds are multiple or single options with more than one choices. they are usually not mandatory and have a limit of choices
    (selectedItem.radio || selectedItem.check || selectedItem.add) && (
      <div className='product-options'>
        <div className='product-options-groups'>
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
      </div>
    )
  );
};

export default ProductOption;
