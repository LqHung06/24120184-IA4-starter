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
- **Result:** Exactly line 6 added to src/index.css: button[aria-pressed="true"] with dark background, white bold text. Cap's pressed Save measured at 44 px high; an unpressed Save stays transparent/light. Checks I1–I3 pass; lint silent. (Note: in step C2 / commit b69cdee, this custom CSS rule was superseded by Bootstrap's btn-dark / btn-outline-dark classes on ProductCard.jsx line 34 while preserving the visible pressed decision).
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
- **Result:** Changed src/useProducts.js: the request is sent 300 ms after the last change to the search text (setTimeout inside the effect, cleared in its cleanup). The loading status still shows at once, and the old cards stay on screen. Measured in headless Chromium: typing "cap" quickly (under 300 ms between keystrokes) sent 3 requests (c, ca, cap) before the change and only 1 request (cap) after it; typing slowly still sent 1 request for each pause longer than 300 ms. The Cap card appeared about 300 ms later. Tests: 19 of 19 pass; lint silent. The first page load is also 300 ms slower.
- **Changed:** the search waits 300 ms after the last keystroke before calling the API
- **Rejected:** none

## 9. Choice of Bootstrap usage for part C
- **Commit before:** b0e85df
- **Commit after:** b0e85df
- **Request:** "Do not edit any file yet. Question about IA#4 part C (brief-ia4.md): we need to use one CSS framework. Between (a) installing Bootstrap 5.3.3 and using plain Bootstrap CSS classes on our existing HTML elements, or (b) using react-bootstrap components, which way do you propose? Give the trade-off for this brief specifically: the rule that labels stay <label> and buttons stay <button>, the dependency constraint, and the 11 + 8 checks in checks/. End with the one option you recommend."
- **Result:** The assistant recommended (a): plain Bootstrap 5.3.3 classes without react-bootstrap, because react-bootstrap adds an extra package (violating brief-ia4 C1) and wraps inputs in component abstractions instead of native elements (violating C3). Recommendation accepted.
- **Changed:** none
- **Rejected:** none

## 10. Install Bootstrap 5.3.3 from npm
- **Commit before:** 2aeffa8
- **Commit after:** 779c5b6
- **Request:** "Install Bootstrap 5.3.3 via npm and import its stylesheet in src/main.jsx. Do not add any other dependencies or change other files."
- **Result:** package.json gained \"bootstrap\": \"5.3.3\" at line 16, package-lock.json updated, src/main.jsx line 3 imported bootstrap/dist/css/bootstrap.min.css. Tests: 19 of 19 pass, lint silent.
- **Changed:** none
- **Rejected:** none

## 11. Layout with Bootstrap classes (part C, step 1)
- **Commit before:** cc8d649
- **Commit after:** f939d5d
- **Request:** "IA#4 part C (brief-ia4.md C1-C3), step 1 of 3: layout. Bootstrap 5.3.3 is installed from npm and imported in src/main.jsx; use plain Bootstrap CSS classes only, no new package, no react-bootstrap, no Bootstrap JavaScript. Change only these files: src/App.jsx, src/components/Header.jsx, src/components/SearchBox.jsx, src/components/ProductList.jsx, src/components/ProductCard.jsx (only the <li> wrapper), src/index.css. 1. App.jsx: <main className=\"container pb-5\">. Keep the role=\"status\" paragraph as the only status element, give it className=\"text-body-secondary\". The Retry button becomes className=\"btn btn-warning mb-3\". 2. Header.jsx: <header className=\"container pt-3\">, <h1 className=\"display-6 mb-1\">Shop</h1>, <p className=\"text-body-secondary\">Saved: {saved.length}</p>. Keep the text \"Saved: N\" in a single text node sequence exactly as it is now. 3. SearchBox.jsx: wrapper className=\"mb-3 col-12 col-md-6\"; <label className=\"form-label\"> keeps htmlFor and the text \"Search products\"; the <input type=\"search\"> gets className=\"form-control\". Keep id and type. 4. ProductList.jsx: <ul aria-label=\"Products\" className=\"row g-3 list-unstyled p-0 mb-4\">. Keep key={product.id}. 5. ProductCard.jsx: the <li> gets className=\"col-12 col-md-6 col-lg-4\". Do not change anything else in this file yet. 6. src/index.css: delete every rule that these classes now replace (main, header, .products and both of its @media rules, .search label, input). Keep only what is still needed. Rules: keep every element the briefs ask for (<h1>, <label>, <button>, <ul aria-label=\"Products\">, one <li> per product). Do not edit checks/, mock/, vite.config.js, eslint.config.js, index.html, public/ or package.json. No eslint-disable. Then run npm test and npm run lint and report both results."
- **Result:** Files touched: src/App.jsx, src/components/Header.jsx, src/components/SearchBox.jsx, src/components/ProductList.jsx, src/components/ProductCard.jsx, src/index.css. npm test: 19 of 19 passed. npm run lint: exit 0, no output. Row 19 measured in headless Chromium with all external requests blocked: at 360, 768 and 1280 px there is no sideways scroll, smallest button is 44 px, and products display in 1, 2 and 3 columns. Note on scope: in src/components/ProductCard.jsx, the assistant also added an inner `<div className="card">` wrapper around the content, which exceeded the instruction to "only change the <li> wrapper, do not change anything else in this file yet". This extra wrapper was harmless and was cleanly replaced in step C2 (commit b69cdee) when the full Bootstrap card structure was implemented.
- **Changed:** none
- **Rejected:** none

## 12. Cards, buttons and the Saved panel (part C, step 2)
- **Commit before:** f939d5d
- **Commit after:** b69cdee
- **Request:** "IA#4 part C, step 2 of 3: product cards, buttons and the Saved panel. Plain Bootstrap 5.3.3 classes only, no new package. Change only src/components/ProductCard.jsx, src/components/SavedPanel.jsx and src/index.css. 1. ProductCard.jsx: inside the existing <li>, wrap the content in <div className=\"card h-100\"><div className=\"card-body\">...</div></div>. The name stays an <h2> and gets className=\"card-title h5\". The price <p> gets className=\"card-text fw-semibold\". The description <p> gets className=\"card-text text-body-secondary mt-2 mb-0\". The buttons container gets className=\"d-flex flex-wrap gap-2\". 2. Buttons, all still real <button type=\"button\"> with their current accessible names and attributes: Details: className=\"btn btn-outline-primary\", keep aria-expanded; Add to cart: className=\"btn btn-primary\"; Save: className={saved ? 'btn btn-dark' : 'btn btn-outline-dark'}, keep aria-pressed={saved} and the visible text exactly \"Save\". 3. SavedPanel.jsx: <section aria-label=\"Saved\" className=\"mb-4\">; with items, <ul className=\"list-group\"> and <li className=\"list-group-item\">; with none, <p className=\"text-body-secondary mb-0\">. Rules: keep every element the briefs ask for. Do not edit checks/, mock/, vite.config.js, eslint.config.js, index.html, public/ or package.json. Then run npm test and npm run lint and report both results."
- **Result:** Files touched: src/components/ProductCard.jsx, src/components/SavedPanel.jsx, src/index.css. npm test: 19 of 19 passed. npm run lint: exit 0, no output.
- **Changed:** none
- **Rejected:** none

## 13. Cart and checkout form with Bootstrap classes (part C, step 3)
- **Commit before:** b69cdee
- **Commit after:** 5142730
- **Request:** "IA#4 part C, step 3 of 3: cart and checkout form. Plain Bootstrap 5.3.3 classes only, no new package. Change only src/components/CartSummary.jsx and src/components/CheckoutForm.jsx. 1. CartSummary.jsx: <aside aria-label=\"Cart\" className=\"card mb-4\"><div className=\"card-body\">...</div></aside>. The title stays an <h2> and gets className=\"card-title h5\". The item count and total paragraphs get className=\"card-text\". 2. CheckoutForm.jsx: <form aria-label=\"Checkout\" onSubmit={handleSubmit}>. Order confirmation paragraph gets className=\"alert alert-success\". Input fields: <div className=\"mb-3\">; labels get className=\"form-label\"; text/tel inputs get className={show* ? 'form-control is-invalid' : 'form-control'}; textarea gets className=\"form-control\"; note counter gets className=\"form-text\"; field errors get className=\"invalid-feedback d-block\"; empty-cart message gets className=\"alert alert-warning\". The Place order button gets className=\"btn btn-success\". Rules: keep every element the briefs ask for (real <form>, <label>, <input>, <textarea>, <button type=\"submit\">). Do not edit checks/, mock/, vite.config.js, eslint.config.js, index.html, public/ or package.json. Then run npm test and npm run lint and report both results."
- **Result:** Files touched: src/components/CartSummary.jsx, src/components/CheckoutForm.jsx. npm test: 19 of 19 passed. npm run lint: exit 0, no output. Rows 16 and 17 checked in Chromium: Hoodie added, Name An, Phone 0901234567, Place order shows confirmation, cart 0 items, URL unchanged; empty submit shows error styles with is-invalid and invalid-feedback d-block. Note: these changes were staged and committed together with the 44 px button height fix in commit 5142730.
- **Changed:** none
- **Rejected:** none

## 14. Button minimum height 44 px configured via Bootstrap CSS variable
- **Commit before:** b69cdee
- **Commit after:** 5142730
- **Request:** "Done means row 19: Bootstrap buttons are only 38 px tall. In src/index.css, set --bs-btn-padding-y: 0.6rem and min-height: 44px on .btn so every button is at least 44 px tall."
- **Result:** Files touched: src/index.css only. Default Bootstrap button styles had reduced touch target heights to 38 px in DevTools; setting --bs-btn-padding-y: 0.6rem and min-height: 44px on .btn brought button heights to 45.2 px at 360, 768 and 1280 px viewports. This fix was committed together with step C3 in commit 5142730 rather than as a separate commit.
- **Changed:** in src/index.css, configured --bs-btn-padding-y: 0.6rem and min-height: 44px on .btn because default Bootstrap buttons measured only 38 px in DevTools, failing Done means row 19
- **Rejected:** none
