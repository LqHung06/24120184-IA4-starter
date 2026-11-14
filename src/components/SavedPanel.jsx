import { useWishlist } from '../WishlistContext.jsx';

export default function SavedPanel() {
  const { saved } = useWishlist();

  return (
    <section aria-label="Saved" className="mb-4">
      {saved.length === 0 ? (
        <p className="text-body-secondary mb-0">Nothing saved yet.</p>
      ) : (
        <ul className="list-group">
          {saved.map((item) => (
            <li key={item.id} className="list-group-item">{item.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
