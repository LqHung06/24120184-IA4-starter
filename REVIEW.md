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
