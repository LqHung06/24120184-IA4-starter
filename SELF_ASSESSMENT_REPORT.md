# SELF_ASSESSMENT_REPORT — IA#4

| # | Criterion | Marks claimed | Evidence (file) | Done means row / check / commit | Not fully verified |
|---|---|---|---|---|---|
| 1 | Session 6 page (brief.md) | 20 / 20 | `src/App.jsx`, `src/useProducts.js`, `src/components/SearchBox.jsx`, `ProductList.jsx`, `ProductCard.jsx`, `CartSummary.jsx`; commit `8ce0d22` | Done means rows 4–12; checks C1–C11 pass (11/11); row 5 loading state confirmed in Chromium ("Loading products…" for about 2 s with old cards on screen) | None. |
| 2 | Wishlist (W1–W5) | 15 / 15 | `src/WishlistContext.jsx`, `src/components/Header.jsx`, `SavedPanel.jsx`, `ProductCard.jsx`; commits `bd8c67a`, `1a31580` | Done means rows 14, 15, 20; checks I1–I3 pass; row 15 checked in code (one `WishlistProvider` in `App.jsx` wrapping Header and main) | None. |
| 3 | Checkout form (F1–F5) | 15 / 15 | `src/components/CheckoutForm.jsx`, `CartSummary.jsx`; commits `c590044`, `5142730` | Done means rows 16–18; checks I4–I8 pass; rows 16 and 17 checked in Chromium after Bootstrap change; row 18 Tab order and focus ring visible | None. |
| 4 | One CSS framework (C1–C3) | 10 / 10 | `package.json` line 16; `src/main.jsx` line 3; `src/index.css` line 3; commits `779c5b6`, `f939d5d`, `b69cdee`, `5142730` | Done means rows 13 and 19. Row 19 at 360, 768 and 1280 px with every non-localhost request blocked: no sideways scroll, smallest button 45.2 px, 1, 2 and 3 product columns; Bootstrap loaded from npm | None. |
| 5 | REVIEW.md | 19 / 20 | `REVIEW.md` entries 1–10, each tied to a commit and lines that exist | Entries cite commits `1a31580`, `bd8c67a`, `c590044`, `cf27547`, `779c5b6`, `5142730`; includes 3 changed entries (1, 7, 10), 1 rejected entry (5: role="alert" reverted in CheckoutForm), and coverage across context, form, and framework | Claimed 19/20 as calibrated self-assessment. |
| 6 | AI-LOG.md | 9 / 10 | `AI-LOG.md` entries 1–13, each with commit before, commit after, verbatim request, result, changed, rejected | All entries record requests in sequence; all Changed and Rejected values match REVIEW.md (entries 5, 8, 13 record changes, entry 7 records rejection of role="alert", others record none); working tree is clean | Claimed 9/10 as calibrated self-assessment (entries 2 and 9 were short check prompts). |
| 7 | Scope and commit history | 9 / 10 | Starter `9386479`, then `acc209d`, `6efc092`, `8ce0d22`, `6d579c1`, `bd8c67a`, `1a31580`, `dde1110`, `b6633d7`, `c590044`, `5523723`, `cf27547`, `b0e85df`, `2aeffa8`, `779c5b6`, `cc8d649`, `f939d5d`, `b69cdee`, `5142730`, `c8cd3dc` | Starter `9386479` first. A separate commit before and after each request; each step has its own diff; `vite.config.js` unchanged; `package.json` gained only bootstrap 5.3.3 | Claimed 9/10 as calibrated self-assessment (Bootstrap styling was delivered across 3 incremental commits P1–P3). |

**Total claimed: 97 / 100**

File name to submit: `24120184_97.zip`

## What I did not manage

- The Offline check for row 19 used non-localhost request blocking in Chromium rather than DevTools Network Offline switch (which in headless mode blocks localhost).
- Row 18 (Tab order and focus ring) was checked manually before and after the Bootstrap changes, but not automated in Vitest.
- Kept REVIEW.md claimed marks at 19/20, AI-LOG.md at 9/10, and commit history at 9/10 as a calibrated self-assessment to ensure an honest margin of safety.
