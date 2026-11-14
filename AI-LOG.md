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

## 3. Session 6 page
- **Commit before:** 6efc092
- **Commit after:** 8ce0d22
- **Request:** "Implement brief.md according to the approved plan. Do not do the IA#4 part yet."
- **Result:** Created src/App.jsx, src/useProducts.js, src/format.js, src/components/SearchBox.jsx, ProductList.jsx, ProductCard.jsx, CartSummary.jsx; src/index.css styled list, cards and cart. Checks: 11 of 11 session 6 pass (C1–C11), lint silent. By hand, rows 4–10 and 12 pass; row 11 checked in code.
- **Changed:** none
- **Rejected:** none

## 4. Wishlist (W1–W5)
- **Commit before:** 6d579c1
- **Commit after:** bd8c67a
- **Request:** "Implement part W of brief-ia4.md according to the approved plan (WishlistContext with one provider, ProductCard reads through useWishlist, the Saved count computed). Do not do parts F and C yet."
- **Result:** Created src/WishlistContext.jsx (one provider, useWishlist hook, memoized context value), src/components/Header.jsx (header with h1 Shop and "Saved: N"), src/components/SavedPanel.jsx; changed src/App.jsx (one WishlistProvider around Header and main; h1 moved into Header) and src/components/ProductCard.jsx (Save button with aria-pressed, reads the hook). Checks: I1–I3 pass; 11 session 6 checks pass; I4–I8 fail as expected (form not built); lint silent.
- **Changed:** none
- **Rejected:** none

## 5. Visible pressed style for the Save button
- **Commit before:** bd8c67a
- **Commit after:** 1a31580
- **Request:** "Add a clear visual style for aria-pressed=\"true\" so users can recognize saved products without opening DevTools. Keep the button name \"Save\", the aria-pressed attribute, keyboard access and a minimum button height of 44 px. Change only what is necessary."
- **Result:** Exactly line 6 added to src/index.css: button[aria-pressed="true"] with dark background, white bold text. Cap's pressed Save measured at 44 px high; an unpressed Save stays transparent/light. Checks I1–I3 pass; lint silent.
- **Changed:** the pressed Save button now has a visible dark style. Reason: in row 14 the pressed Save looked identical to an unpressed one.
- **Rejected:** none

## 6. Checkout form (F1–F5)
- **Commit before:** dde1110
- **Commit after:** b6633d7
- **Request:** "Implement part F of brief-ia4.md according to the approved plan: CheckoutForm inside CartSummary, with Name, Phone, and Note fields; preventDefault on submit; errors computed from fields during render; English messages as specified in F2–F4."
- **Result:** Created src/components/CheckoutForm.jsx, changed CartSummary.jsx and App.jsx. Handled confirmation clearing on field edits and note counter linked via aria-describedby. The assistant added role="alert" to the three error paragraphs in lines 69, 82, and 97.
- **Changed:** none
- **Rejected:** none

## 7. Revert role="alert" from checkout messages
- **Commit before:** b6633d7
- **Commit after:** c590044
- **Request:** "Revert role=\"alert\" on the error messages in CheckoutForm.jsx: brief-ia4.md F2 specifies plain messages linked via aria-describedby and aria-invalid, not alert live regions."
- **Result:** Changed src/components/CheckoutForm.jsx lines 69, 82 and 97 to remove role="alert". Checks: 19 of 19 pass; lint silent. By hand: row 16 passes (order placed, cart 0 items, URL unchanged); row 17 passes (empty submit shows messages, Phone 090123456 updates phone message); row 18 passes (tab order and focus outline visible).
- **Changed:** none
- **Rejected:** Rejected the assistant's addition of role="alert" on field error messages and empty-cart message in src/components/CheckoutForm.jsx lines 69, 82 and 97. Reason: brief-ia4.md F2 specifies plain messages linked via aria-describedby and aria-invalid="true"; role="alert" was not requested and turns each message into an assertive live region that interrupts screen reader users prematurely.

## 8. Debounce 300 ms for search
- **Commit before:** 5523723
- **Commit after:** cf27547
- **Request:** "Add a 300 ms debounce to useProducts: wait 300 ms after the last keystroke before sending the fetch request, cancelling any pending timer in the effect cleanup."
- **Result:** Changed src/useProducts.js: the request is sent 300 ms after the last change to the search text (setTimeout inside the effect, cleared in its cleanup). The loading status still shows at once, and the old cards stay on screen. Measured in headless Chromium: typing "cap" slowly sent 3 requests (c, ca, cap) before the change and 1 request (cap) after it; the Cap card appeared about 300 ms later. Tests: 19 of 19 pass; lint silent. The first page load is also 300 ms slower.
- **Changed:** the search waits 300 ms after the last keystroke before calling the API
- **Rejected:** none
