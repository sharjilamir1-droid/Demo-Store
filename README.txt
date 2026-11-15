# DemoStore Pakistan (4-page practice website)

Files:
- `index.html` - home and product listing
- `product.html` - product details page (URL example: product.html?id=DS001)
- `cart.html` - cart with quantity and remove controls
- `checkout.html` - demo checkout and simulated order confirmation
- `styles.css` - shared styling
- `app.js` - products, cart storage and ecommerce dataLayer events

## Existing tracking
GTM container `GTM-N9R473S3` is included in all four HTML pages.
The app pushes GA4-style ecommerce events to `dataLayer`:
`view_item_list`, `view_item`, `add_to_cart`, `view_cart`, `begin_checkout`, `purchase`.

## Upload
Upload all six files to the root of the existing GitHub repository, replacing the old `index.html`.
Cloudflare should redeploy from the repository. Keep all six files together.

## Important
This is a front-end learning demo. Checkout does not process payments or create real orders.
Use fake test details only. Do not collect real customer information.
