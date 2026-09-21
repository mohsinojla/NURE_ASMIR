# Nure Asmir: website preview

A multi-page, mobile-first storefront preview for **Nure Asmir** (men's wear), built on the Nure Asmir design system.
Plain HTML, CSS and JavaScript. No build step, no dependencies. Fonts load from Google Fonts.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: arch hero, category tiles, new arrivals, craft, lookbook, atelier, newsletter |
| `shop.html` | Collection with category filter and sort (`?cat=shirts`, `?cat=pants`, `?cat=shalwar-kameez`, `?cat=accessories`, `?q=search`) |
| `product.html?id=...` | Product detail: gallery, colour, size, add to bag, details, related |
| `lookbook.html` | Filterable gallery with full-screen viewer (swipe or arrow keys) |
| `about.html` | Our story |
| `contact.html` | Visit / fitting form (preview only) |
| `404.html` | Not found |

Shared behaviour (header, menu, bag drawer, search, saved items, reveal motion) lives in `js/app.js`.
The catalogue lives in `js/data.js`. Edit names, prices and images there.

## Assets

- `public/assets/Shirts`, `public/assets/Banners`: your original PNGs, untouched.
- `public/assets/web`: web-optimised JPEGs, detail crops and the transparent wordmark cutouts that the site actually loads (about 3 MB in total).
- Products with `ph: true` in `js/data.js` show an on-brand "Photography to follow" placeholder. To add a photo, remove `ph` and set `images: [...]`.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. Repository **Settings > Pages > Build and deployment**: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site is served at `https://<user>.github.io/<repo>/`. All paths are relative, so it works from a sub-path.

Optional: delete `public/assets/Shirts` and `public/assets/Banners` from the repository before pushing (about 22 MB of originals). The site only uses `public/assets/web`.

## Preview locally

```bash
npx serve .
```

or open `index.html` directly in a browser.

## Notes for the client demo

- Prices, delivery terms, hours, address and contact details are **sample content**.
- Bag, saved items and forms are front-end only; "Checkout" is not connected.
- Sizes: the largest size in shirt ranges is shown as sold out to demonstrate the state.
# NURE_ASMIR
