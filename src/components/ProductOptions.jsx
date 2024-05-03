import ProductAddItem from './ProductAddItem';

const ProductOptions = ({ selectedItem }) => {
  return (
    <div className='product-options'>
      {selectedItem.add && <ProductAddItem selectedItem={selectedItem} />}
    </div>
  );
};

export default ProductOptions;
