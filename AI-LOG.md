# AI-LOG

Tool: Claude Code (Claude Haiku 5.5 - High)

<!-- One entry per request, written right after the request.

## 1. <short title>
- **Commit before:** <hash>
- **Commit after:** <hash>
- **Request:** <the sentence I sent>
- **Result:** <what came back, files touched>
- **Changed:** <what I asked to change, or none>
- **Rejected:** <what I refused, or none>
-->

## 1. Plan before any code
- **Commit before:** acc209d
- **Commit after:** acc209d
- **Request:** "Read brief.md and brief-ia4.md. Do not write code yet. Give me a plan: the components, where each piece of state lives (search, products, cart, wishlist, form fields), and what the context holds."
- **Result:** A plan only, no file changed. Component tree with one WishlistProvider around Header and main; search text and cart in App; products in a useProducts hook; Details state in ProductCard; form fields in CheckoutForm; cart total, item count, saved count and form errors computed, not stored. Three choices flagged for me: no debounce, plain React state for the form, form messages as plain <p> elements.
- **Changed:** none
- **Rejected:** none

## 2. My check of the plan against the Structure rules
- **Commit before:** acc209d
- **Commit after:** acc209d
- **Request:** "I checked the plan myself against the Structure section of brief.md and W5 of brief-ia4.md, row by row. Confirm these rows: the default export of App; one file per component in src/components/; how ProductCard gets its product and onAddToCart, and where fetch lives; the path src/WishlistContext.jsx and ProductCard using the hook, not props; errors shown only after the first Place order, and no effect keeping them in sync."
- **Result:** No file changed. The assistant answered each row. Already in the full plan: the four files in src/components/, fetch only in src/useProducts.js, src/WishlistContext.jsx with useWishlist() called by ProductCard, errors shown only when submitted is true. Confirmed: App.jsx keeps export default function App; ProductCard receives exactly product and onAddToCart as props; form errors are plain values computed during render, with no useState and no useEffect for them.
- **Changed:** none
- **Rejected:** none
