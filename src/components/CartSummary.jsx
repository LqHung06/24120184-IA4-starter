import { vnd } from '../format.js';

export default function CartSummary({ lines }) {
  const items = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = lines.reduce((sum, line) => sum + line.price * line.qty, 0);

  return (
    <aside aria-label="Cart" className="cart">
      <h2>Cart</h2>
      <p>{items === 1 ? '1 item' : `${items} items`}</p>
      <p>Total: {vnd(total)}</p>
    </aside>
  );
}
