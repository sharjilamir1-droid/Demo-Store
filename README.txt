# DemoStore Pakistan

A small static demo ecommerce storefront for practicing Google Tag Manager (GTM), Google Analytics 4 (GA4), and Meta Pixel.

## What's included
- `index.html`: responsive fictional store with six sample products
- Add to Cart buttons update the cart counter
- Add to Cart pushes a GA4-recommended `add_to_cart` event into `dataLayer`
- Page load pushes `demo_store_loaded`
- Product grid pushes `view_item_list`
- No checkout, payment collection, customer accounts, or backend

## Publish it free (Cloudflare Pages)
1. Extract this ZIP.
2. Create a free GitHub account at https://github.com/ if you do not already have one.
3. Create a new public or private repository, e.g. `demostore-pakistan`.
4. Upload `index.html` to the repository's root.
5. Sign in at https://dash.cloudflare.com/ and open **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
6. Select your repository. Use the default settings for a plain static HTML site. Set the build command to blank and the output directory to `/` (or the repository root, depending on the screen).
7. Deploy. Cloudflare will give you a `*.pages.dev` address. The site stays available until you delete the project or change its hosting/account status. Free-plan terms can change.

## Add Google Tag Manager
1. Create a GTM account/container at https://tagmanager.google.com/ and choose **Web**.
2. GTM gives you two code snippets. Add the first snippet as high as possible inside `<head>` in `index.html`; add the second snippet immediately after the opening `<body>` tag.
3. Replace the placeholder container ID in both snippets with your own `GTM-XXXXXXX` ID.
4. Commit/publish the updated file to GitHub. Cloudflare Pages redeploys it.
5. In GTM, create a **GA4 Google tag** using your GA4 Measurement ID (`G-XXXXXXXXXX`) and trigger it on All Pages.
6. Create a **Custom Event** trigger named `add_to_cart` (event name exactly `add_to_cart`) and attach a GA4 Event tag with event name `add_to_cart`. Map ecommerce data as appropriate; in GA4, enable ecommerce reporting and verify events in DebugView/Realtime.
7. Use GTM Preview to connect to your deployed `pages.dev` URL and test. Submit/publish the GTM container when ready.

## Add Meta Pixel through GTM
1. In Meta Events Manager, create a Pixel/dataset and copy its Pixel ID.
2. In GTM, create a Meta Pixel base tag using Meta's official base-code instructions or a trusted template, and fire it on All Pages.
3. Add a Custom Event trigger for `add_to_cart`, then configure the Meta `AddToCart` event tag to fire on that trigger.
4. Use Meta Events Manager → Test Events to verify. Do not install the same Pixel both directly in the page and through GTM, or you may double-count events.

## Important notes
- The site is a front-end practice demo. It does not create real orders or process payments.
- `dataLayer` events are available for GTM. A pushed event does not automatically appear in GA4 or Meta until you configure the corresponding tags/triggers.
- Do not paste your IDs into public screenshots or share account access. Keep your GTM, GA4 and Meta accounts under your own login.
- If you prefer direct GA4/Meta code instead of GTM, use one installation method per platform and avoid duplicate tags.
