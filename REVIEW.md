# REVIEW

<!-- Entries record decisions on assistant output: kept, changed, or rejected.
Each entry links to an existing commit and file lines, states what decided it,
why, and gives the sentence sent when changed or rejected.
-->
### 1. Visible pressed state for the Save button
- **Where:** commit 1a31580, `src/index.css` line 6; migrated at commit b69cdee, `src/components/ProductCard.jsx` line 34
- **Decision:** changed
- **What decided it:** Done means row 14 — after saving Cap, the Save button looked identical to an unsaved one. The saved state was only visible as `aria-pressed="true"` in DevTools.
- **Why:** A visible pressed state lets the user recognize saved products without inspecting the DOM. The design decision was maintained across changes: originally implemented as custom CSS (`button[aria-pressed="true"]`) in `src/index.css` line 6 at commit 1a31580; when Bootstrap was introduced in step C2 at commit b69cdee, the custom CSS rule was replaced by Bootstrap classes (`btn btn-dark` when saved, `btn btn-outline-dark` when not) in `src/components/ProductCard.jsx` line 34.
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

### 7. Search waits 300 ms before calling the API
- **Where:** commit cf27547, `src/useProducts.js` lines 18–35
- **Decision:** changed
- **What decided it:** Measured in headless Chromium: typing `cap` quickly (under 300 ms between keystrokes) sent 3 requests (`c`, `ca`, `cap`) without the debounce and only 1 request (`cap`) with it; typing slowly still sent 1 request for each pause longer than 300 ms. Done means row 8: one request per text typed, or fewer with a debounce.
- **Why:** Fewer requests, and fewer answers that have to be dropped. The cost is about 300 ms more before the results show, which the brief allows.
- **Sentence sent:** "Add a 300 ms debounce to useProducts: wait 300 ms after the last keystroke before sending the fetch request, cancelling any pending timer in the effect cleanup."

### 8. Plain Bootstrap classes chosen over react-bootstrap
- **Where:** commit 779c5b6, `package.json` line 16
- **Decision:** kept
- **What decided it:** brief-ia4 C1 (only the CSS framework as new dependency) and C3 (labels stay `<label>`, buttons stay `<button>`). Checks query by role and text.
- **Why:** react-bootstrap would add an extra dependency and wrap inputs in custom abstractions, whereas plain Bootstrap 5.3.3 classes style native `<label>` and `<button>` elements directly as required.

### 9. Bootstrap 5.3.3 as the one CSS framework, installed from npm
- **Where:** commit 779c5b6, `package.json` line 16; `src/main.jsx` line 3
- **Decision:** kept
- **What decided it:** Done means row 13 (`git diff 9386479 -- package.json vite.config.js` shows only the `bootstrap` line; `vite.config.js` is unchanged) and row 19 (checked in headless Chromium with the network blocked: styled, no sideways scroll at 360, 768 or 1280 px, smallest button 45.2 px, 1, 2 and 3 product columns)
- **Why:** The framework comes from npm, so the page still styles offline, as brief-ia4 C1 asks. The Bootstrap import comes before `index.css`. No HTML element was changed; labels and buttons stay as they were.

### 10. Button minimum height 44 px configured via Bootstrap CSS variable
- **Where:** commit 5142730, `src/index.css` line 3
- **Decision:** changed
- **What decided it:** Done means row 19 ("buttons at least 44 px tall"). When Bootstrap classes (.btn) were applied, DevTools Elements panel showed computed button heights of 38 px, failing the 44 px touch-target requirement.
- **Why:** Touch targets must meet the 44 px accessibility minimum required by brief-ia4.md C2. Setting `--bs-btn-padding-y: 0.6rem; min-height: 44px` on `.btn` leverages Bootstrap's button padding variable to ensure all buttons (Details, Add to cart, Save, Place order) achieve at least 44 px height while preserving framework visual hierarchy.
- **Sentence sent:** "Done means row 19: Bootstrap buttons are only 38 px tall. In src/index.css, set --bs-btn-padding-y: 0.6rem and min-height: 44px on .btn so every button is at least 44 px tall."
