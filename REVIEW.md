# REVIEW

<!-- Entries record decisions on assistant output: kept, changed, or rejected.
Each entry links to an existing commit and file lines, states what decided it,
why, and gives the sentence sent when changed or rejected.
-->
### 1. Visible pressed state for the Save button
- **Where:** commit 1a31580, `src/index.css` line 6
- **Decision:** changed
- **What decided it:** Done means row 14 — after saving Cap, the Save button looked identical to an unsaved one. The saved state was only visible as `aria-pressed="true"` in DevTools.
- **Why:** A visible pressed state lets the user recognize saved products without inspecting the DOM.
- **Sentence sent:** "Add a clear visual style for aria-pressed=\"true\" so users can recognize saved products without opening DevTools. Keep the button name \"Save\", the aria-pressed attribute, keyboard access and a minimum button height of 44 px. Change only what is necessary."

### 2. Wishlist stores product names with IDs
- **Where:** commit bd8c67a, `src/WishlistContext.jsx` line 19
- **Decision:** kept
- **What decided it:** Done means row 14 — after saving Cap and Jacket and searching hood, the Saved panel still listed Cap while the product list showed only Hoodie. Checked in headless Chrome.
- **Why:** Storing the name next to the ID lets the Saved panel show a saved product even when the search hides it.

### 3. Header stays outside main
- **Where:** commit bd8c67a, `src/components/Header.jsx` line 8; `src/App.jsx` line 30
- **Decision:** kept
- **What decided it:** Check I1 (passes; it finds the header by the banner role and reads Saved: N), and Done means row 15, checked in code: one WishlistProvider, in App.jsx, around the header and `<main>`.
- **Why:** The page header is a banner landmark separate from the main content, which is what I1 expects. The `<h1>Shop</h1>` moved into this header, so the page has one `<h1>`.

### 4. Checkout state is plain React state; errors are computed on each render
- **Where:** commit c590044, `src/components/CheckoutForm.jsx` lines 16–18
- **Decision:** kept
- **What decided it:** brief-ia4 F2 and Done means row 17 (empty submit shows the messages; phone 090123456 keeps the phone message under Phone); row 20, read in `src/`: no state holds the errors or the counts
- **Why:** The errors are a function of the fields. Keeping a copy in state, synced by an effect, could show a stale message. Checks I5 and I6 pass with this version.

### 5. Field messages are plain `<p>` elements linked with aria-describedby; role="alert" rejected
- **Where:** commit c590044, `src/components/CheckoutForm.jsx` lines 69, 82, 97
- **Decision:** rejected
- **What decided it:** `brief-ia4.md` section F2 ("One message per field, after the first try... each invalid field shows its own message below it, linked to the field with aria-describedby, and has aria-invalid=\"true\"") and Done means row 17. The assistant initially generated `role="alert"` on each error message and the empty-cart message.
- **Why:** `role="alert"` was not requested anywhere in `brief-ia4.md`. In addition, `role="alert"` creates an assertive ARIA live region that screen readers announce immediately upon form submission regardless of focus, interfering with the standard form navigation where `aria-describedby` announces the error message when the user tabs into the invalid input (as tested in Done means row 18).
- **Sentence sent:** "Revert role=\"alert\" on the error messages in CheckoutForm.jsx: brief-ia4.md F2 specifies plain messages linked via aria-describedby and aria-invalid, not alert live regions."

### 6. Empty-cart message and order confirmation sit inside the form, before Place order
- **Where:** commit c590044, `src/components/CheckoutForm.jsx` lines 57, 97, 99
- **Decision:** kept
- **What decided it:** checks I5 and I7, which read the form's text; brief-ia4 F3 and F4; Done means row 16 by hand (confirmation shown, cart 0 items, address bar unchanged)
- **Why:** The brief places the checkout inside the cart and asks for these messages in the form. The confirmation is a plain `<p>`, not a status element, so the page keeps one status line.
