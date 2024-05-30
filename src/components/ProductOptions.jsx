import ProductOptionsAdd from './ProductOptionsAdd';
import ProductOptionsRadioAdd from './ProductOptionsRadioAdd';
import ProductOptionsRadio from './ProductOptionsRadio';
import ProductOptionsChecked from './ProductOptionsCheck';
import useHandleGroupClick from '../hooks/useHandleGroupClick';

const ProductOption = ({ selectedItem, setOrder }) => {
  const { activeGroupId, handleGroupClick } = useHandleGroupClick();

  /* TODO */
  // 1) check out when there is something like radio inputs logic that need to work with add ctrl btns, for example when you are buying a combo and this combo has 2 pet drinks, then a single radio input won't meet this need because I want to be able to choose two different drinks, not the same one.
  // 2) Try to make ProductOptions... and ProductOption... DRY, refactor them.

  return (
    // Radios are multiple options with one only choice that are almost always mandatory.
    // Radio-Adds are multiple options with a fixed amount of choices, they are mandatory (unlike Adds, Radio-Adds don't add up to the total price of the order, it's purpose is to complete information about the selected item, just like normal Radios )
    // Checks are multiple options with more than one choices, they are sometimes mandatory and may have a limit of choices
    // Adds are multiple or single options with more than one choices. they are usually not mandatory and have a limit of choices (they add up to the total price of the order)
    (selectedItem.radio ||
      selectedItem.check ||
      selectedItem.add ||
      selectedItem.radioAdd) && (
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
          {selectedItem.radioAdd && (
            <ProductOptionsRadioAdd
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
