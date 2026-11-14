import { useWishlist } from '../WishlistContext.jsx';

export default function Header() {
  const { saved } = useWishlist();

  return (
    <header>
      <h1>Shop</h1>
      <p>Saved: {saved.length}</p>
    </header>
  );
}
