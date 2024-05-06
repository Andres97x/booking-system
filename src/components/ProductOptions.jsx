import ProductAddItem from './ProductAddItem';
import ProductRadioOptions from './ProductRadioOptions';

const ProductOption = ({ selectedItem, setOrder }) => {
  // IMPORTANT try to refactor individual group of options inside the ProductAddItem and ProductRadioOptions component, so for every group there will be a component, and not all in the parent component, this may help to encapsulation and to handle states easier.

  // FIXME when I select one radio option group, the product add item group doesn't neceserally closes
  return (
    <div className='product-options'>
      {selectedItem.add && (
        <ProductAddItem selectedItem={selectedItem} setOrder={setOrder} />
      )}
      {selectedItem.radio && (
        <ProductRadioOptions selectedItem={selectedItem} setOrder={setOrder} />
      )}
    </div>
  );
};

export default ProductOption;
