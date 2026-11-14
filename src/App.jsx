import { useState } from 'react';
import SearchBox from './components/SearchBox.jsx';
import ProductList from './components/ProductList.jsx';
import CartSummary from './components/CartSummary.jsx';
import Header from './components/Header.jsx';
import SavedPanel from './components/SavedPanel.jsx';
import { useProducts } from './useProducts.js';
import { WishlistProvider } from './WishlistContext.jsx';

export default function App() {
  const [search, setSearch] = useState('');
  const [lines, setLines] = useState([]); // [{ id, price, qty }] — kept even when hidden by search
  const { products, phase, retry } = useProducts(search);

  function addToCart(product) {
    setLines((current) => {
      const line = current.find((l) => l.id === product.id);
      if (!line) return [...current, { id: product.id, price: product.price, qty: 1 }];
      return current.map((l) => (l.id === product.id ? { ...l, qty: l.qty + 1 } : l));
    });
  }

  let status = '';
  if (phase === 'loading') status = 'Loading products…';
  else if (phase === 'error') status = 'Could not load products.';
  else if (products.length === 0) status = 'No products match.';

  return (
    <WishlistProvider>
      <Header />
      <main className="container pb-5">
        <SearchBox value={search} onChange={setSearch} />
        <p role="status" className="text-body-secondary">{status}</p>
        {phase === 'error' && (
          <button type="button" className="btn btn-warning mb-3" onClick={retry}>Retry</button>
        )}
        <ProductList products={products} onAddToCart={addToCart} />
        <SavedPanel />
        <CartSummary lines={lines} onOrderPlaced={() => setLines([])} />
      </main>
    </WishlistProvider>
  );
}
