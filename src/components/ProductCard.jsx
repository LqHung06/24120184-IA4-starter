import { useState } from 'react';
import { vnd } from '../format.js';
import { useWishlist } from '../WishlistContext.jsx';

export default function ProductCard({ product, onAddToCart }) {
  const [open, setOpen] = useState(false);
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(product.id);

  return (
    <li className="col-12 col-md-6 col-lg-4">
      <div className="card h-100">
        <div className="card-body">
          <h2 className="card-title h5">{product.name}</h2>
          <p className="card-text fw-semibold price">{vnd(product.price)}</p>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              Details
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onAddToCart(product)}
            >
              Add to cart
            </button>
            <button
              type="button"
              className={saved ? 'btn btn-dark' : 'btn btn-outline-dark'}
              aria-pressed={saved}
              onClick={() => toggle(product)}
            >
              Save
            </button>
          </div>
          {open && <p className="card-text text-body-secondary mt-2 mb-0">{product.description}</p>}
        </div>
      </div>
    </li>
  );
}
