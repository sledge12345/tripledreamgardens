# TD Gardens Resort Karatina — website

A 5-page static site for TD Gardens Resort, a garden restaurant and bar off the Nairobi–Nyeri highway in Karatina, Nyeri County, Kenya. Plain HTML/CSS/JS, no build step, no framework — open the files directly or drop the folder on any static host.

## What's in here

```
td-gardens/
├── index.html            Home
├── about.html             About — the gardens, kitchen, bar
├── menu.html              Full food & drinks menu (renders from menu-data.js)
├── gardens.html           Gardens & Events — groups, birthdays, send-offs
├── contact.html           Directions, map, and the table/event enquiry form
├── assets/
│   ├── css/style.css      All styling — one file, tokens at the top
│   └── js/
│       ├── menu-data.js   ALL menu items & prices — edit this, not the HTML
│       └── main.js        Nav, scroll reveal, form logic, and menu rendering
└── README.md              This file
```

## Editing the menu — the one file that matters most

Every dish, drink, and price on the site comes from **`assets/js/menu-data.js`**. `menu.html` itself has no menu content in it at all — it just asks that file for the data and renders it. That means:

- **To change a price** — find the item in `menu-data.js` and edit the number after `price:`.
- **To add a dish or drink** — copy an existing line inside the right group's `items: [ ... ]` list and edit it.
- **To add a whole new category** — copy an existing group block (the bit starting `{ group: "...", items: [...] }`) and add it to either `MENU_DATA.food` or `MENU_DATA.drinks`.
- **To rename a section** — change the `group:` text; it updates everywhere automatically, including the green header bar on the menu page.

No HTML editing, no hunting through multiple pages — the whole food and drinks menu lives in one readable file.

## Preview it right now

Open `index.html` in a browser — no server required. All links are relative, so the whole folder also works dropped straight onto Netlify, Vercel, GitHub Pages, or standard web hosting.

## Making the forms receive real enquiries by email

This is a static site, so it needs one of two free services to turn form submissions into email. Both are already wired into `assets/js/main.js`.

### Option A — Netlify Forms (easiest)
1. Deploy this folder to [Netlify](https://netlify.com) (drag-and-drop, or connect a Git repo).
2. Done — the form already has `data-netlify="true"` and a hidden `form-name` field.
3. Turn on **Site settings → Forms → Notifications → Email notification** to get each enquiry emailed to you. Free tier: 100 submissions/month.

### Option B — Formspree (works on any host)
1. Create a free form at [formspree.io](https://formspree.io) and copy your endpoint (`https://formspree.io/f/xxxxabcd`).
2. In `assets/js/main.js`, find:
   ```js
   var USE_FORMSPREE = false;
   var FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";
   ```
3. Set `USE_FORMSPREE = true;` and paste in your real endpoint. Free tier: 50 submissions/month.

## Turning on "Pay Online" (Contact page) — currently PAUSED, not on the live site

This was built and tested, but pulled off the live Contact page for now at your request. Nothing was thrown away — the section markup is preserved as an HTML comment in `contact.html` right where it used to sit, and the JS in `assets/js/main.js` is intact but inert (it guards on an element that no longer exists on the page, so it does nothing and causes no errors).

**To bring it back**, just ask — restoring it is quick since none of the actual work needs to be redone. Once restored, here's what activates it for real:

The Contact page has a "Send a payment" box where a customer types in any amount and pays by card or M-Pesa. It uses [IntaSend](https://intasend.com), a Kenyan payment processor — no backend server needed, it's a hosted secure checkout that pops up over the page.

**It won't take real payments until you do this:**
1. Create an account at [intasend.com](https://intasend.com) and complete their business verification (KYC) — this needs real business details and only you can do it.
2. In your IntaSend dashboard, go to **Settings → API Keys** and copy your **publishable key** (not the secret one — the publishable key is safe to put in public site code, the secret one never should be).
3. In `assets/js/main.js`, find:
   ```js
   var PAY_PUBLIC_KEY = "REPLACE-WITH-YOUR-PUBLISHABLE-KEY";
   var PAY_LIVE = false;
   ```
4. Paste your key in place of `REPLACE-WITH-YOUR-PUBLISHABLE-KEY`.
5. Leave `PAY_LIVE = false` and send yourself a small test payment first (IntaSend's sandbox mode doesn't move real money). Only change it to `true` once that test has gone through and you've confirmed the money actually lands in your IntaSend account.

Until step 3–4 are done, the button shows a friendly message telling the customer to call or WhatsApp instead — it won't silently fail.

## Before you launch — a few real things to check

- **`robots.txt` and `sitemap.xml`** are new — both currently say `REPLACE-WITH-YOUR-DOMAIN`. Once you know the final URL (a Netlify subdomain, or a custom domain if you buy one), swap that placeholder for the real domain in both files — it's a plain find-and-replace.
- **The map pin** on the Contact page now points at the former Riverbank Campus coordinates (the landmark you gave me) rather than a generic town-center pin — much closer, but worth a final check once you're on-site (see the note under "Real details already in the site" below).
- **The 1kg Pork photo's portion size was a visual guess**, not confirmed — there's a `NOTE:` comment right next to it in `menu-data.js` flagging this specifically.
- **Contact form**: it's wired to Netlify Forms by default, which works automatically the moment this is deployed on Netlify — no setup needed. If you ever move off Netlify, see the Formspree instructions below.
- **Pay Online is paused** (see below) — nothing to do here unless you want it switched back on.

## Real details already in the site

- **Phone / WhatsApp**: 0705 126 101 — in the footer of every page, and as a click-to-call plus a WhatsApp link on the Contact page.
- **Email**: tdgardensresort22@gmail.com — on the Contact page. Also worth setting as the notification address once you pick Netlify Forms or Formspree (see below).
- **Facebook**: linked from the footer and Contact page as https://www.facebook.com/tripledream.gardens/

If any of these change, they're easy to find — search the project for the phone number or email and every instance will turn up together.

## Customizing further

- **Colors, type, spacing** — all in `:root` at the top of `assets/css/style.css`.
- **Copy** — every page is plain, editable text in its HTML file.
- **Map pin** — updated to the coordinates for the former Riverbank Campus on Kiarithaini Road (the landmark you gave me), which should now be right next to TD Gardens rather than a generic town-center pin. Worth a final check once you're on-site: open Google Maps on your phone, drop a pin at the actual entrance, and if it differs from what's embedded, send me the coordinates and I'll swap the `marker=` value in `contact.html`'s map iframe.
- **Photos** — real photos are in for: the property (hero shot, building + grounds, picnic lawn, topiary path, paved walkway, a formal event setup), the bar shelf, the soft drinks, and five menu dishes (Kienyeji Full, Tilapia/Greens, Beef/Chapati, 1kg Pork, the Soda listing), plus a general sharing-platter photo on the Menu page gallery. Four more "signature dish" cards on the Menu page (Kuku Bahati Full, T.D Chicken Special, 1kg Beef, Grilled Chicken, Matoke Special) still show a styled placeholder frame while we wait on real shots — see the `PHOTOS FOR SIGNATURE DISHES` note near the top of `menu-data.js` for how to drop a real photo into any of those once you have one.
- **Double-check this one:** the 1kg Pork photo's portion size was a visual guess, not confirmed — there's a `NOTE:` comment right next to it in `menu-data.js`. If the real 1/2kg portion looks the same as what's pictured, move the photo down to that item instead.
- **A previously-uploaded version of this site had two stock/AI photos on Grilled Chicken and 1kg Beef** (one carried a visible "Low Carb Africa" watermark). Those never came from me and aren't in this version — if that version is what's currently live on Netlify, swap it for this one.
- **Feedback** — the Contact page has a "Tell us how it went" section linking to your Jotform, plus the QR code you provided. It's also linked from every page's footer.
