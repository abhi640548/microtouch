# MicroTouch

Static template for an IT solutions site with hero, services, product filters, timeline, insights, and an enquiry modal ready to wire to your APIs.

## Files
- `index.html` – semantic layout and sections (hero, SMO service plans, PPC plans, SEO plans, LinkedIn plans, Web Dev plans, GMB plans, product filters, process, insights, modal).
- `styles.css` – theme, layout, responsive rules, and motion.
- `script.js` – navigation toggle, smooth scrolling, product filtering, and enquiry modal logic.

## Run locally
Open `index.html` in your browser (double-click or `python -m http.server 8000` then visit `http://localhost:8000`).

## Hooking up APIs
- Replace the alert in `script.js` form submit with your POST request to create enquiries/purchases.
- Swap the hero status panel content with live telemetry from your endpoints.
- Product cards and filters use `data-category` attributes; extend these for dynamic renders.