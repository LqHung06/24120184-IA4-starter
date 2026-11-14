import { useEffect, useState } from 'react';

// Loads the products for `query` from GET /api/products.
// Each search gets its own AbortController: when the query changes (or the
// component unmounts, or StrictMode runs the effect twice), the previous
// request is aborted, so an answer for an old text is dropped, not shown.
export function useProducts(query) {
  const [products, setProducts] = useState([]);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [attempt, setAttempt] = useState(0); // bumped by Retry

  useEffect(() => {
    const controller = new AbortController();
    setPhase('loading'); // products stay on screen while this runs

    // Wait 300 ms after the last change before asking the API; a search that is
    // typed over within that time never reaches the network.
    const timer = setTimeout(() => {
      const params = new URLSearchParams({ q: query });
      fetch(`/api/products?${params}`, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((list) => {
          if (controller.signal.aborted) return;
          setProducts(list);
          setPhase('ready');
        })
        .catch(() => {
          if (controller.signal.aborted) return; // dropped answer, not a failure
          setProducts([]);
          setPhase('error');
        });
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, attempt]);

  return {
    products,
    phase,
    retry: () => setAttempt((n) => n + 1),
  };
}
