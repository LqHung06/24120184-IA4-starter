import { useWishlist } from '../WishlistContext.jsx';

export default function Header() {
  const { saved } = useWishlist();

  return (
    <header className="container pt-3">
      <h1 className="display-6 mb-1">Shop</h1>
      <p className="text-body-secondary">Saved: {saved.length}</p>
    </header>
  );
}
