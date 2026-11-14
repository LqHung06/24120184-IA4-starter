import { vnd } from '../format.js';
import CheckoutForm from './CheckoutForm.jsx';

export default function CartSummary({ lines, onOrderPlaced }) {
  const items = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);

  return (
    <aside aria-label="Cart" className="card mb-4">
      <div className="card-body">
        <h2 className="card-title h5">Cart</h2>
        <p className="card-text">{items === 1 ? '1 item' : `${items} items`}</p>
        <p className="card-text">Total: {vnd(total)}</p>
        <CheckoutForm itemCount={items} total={total} onOrderPlaced={onOrderPlaced} />
      </div>
    </aside>
  );
}
