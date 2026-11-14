import { useWishlist } from '../WishlistContext.jsx';

export default function SavedPanel() {
  const { saved } = useWishlist();

  return (
    <section aria-label="Saved" className="saved">
      {saved.length === 0 ? (
        <p>Nothing saved yet.</p>
      ) : (
        <ul>
          {saved.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
