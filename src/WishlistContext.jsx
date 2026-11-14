import { createContext, useContext, useMemo, useState } from 'react';

const WishlistContext = createContext(null);

// One provider for the whole page (see App.jsx). Holds the saved products
// in the order they were saved. The count is computed by the readers, never stored.
export function WishlistProvider({ children }) {
  const [saved, setSaved] = useState([]); // [{ id, name }]

  const value = useMemo(() => {
    function isSaved(id) {
      return saved.some((p) => p.id === id);
    }

    function toggle(product) {
      setSaved((current) =>
        current.some((p) => p.id === product.id)
          ? current.filter((p) => p.id !== product.id)
          : [...current, { id: product.id, name: product.name }],
      );
    }

    return { saved, isSaved, toggle };
  }, [saved]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// Components read the wishlist through this hook, not through props.
export function useWishlist() {
  const value = useContext(WishlistContext);
  if (value === null) throw new Error('useWishlist must be used inside WishlistProvider');
  return value;
}
