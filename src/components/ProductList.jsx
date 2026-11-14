import ProductCard from './ProductCard.jsx';

export default function ProductList({ products, onAddToCart }) {
  return (
    <ul aria-label="Products" className="row g-3 list-unstyled p-0 mb-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </ul>
  );
}
