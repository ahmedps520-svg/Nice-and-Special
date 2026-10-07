# Nice & Special — صالون Nice & Special جميل ومميز للحلاقة الرجالية

Spec build: a website made for a real Jeddah business that has no site of its own, on Mamar's initiative. **Not commissioned.** Built to show the owner, not published as theirs.

**Live:** https://ahmedps520-svg.github.io/Nice-and-Special/

| | |
|---|---|
| Business | Men's barbershop |
| District | السلامة، جدة |
| Google | 5.0★ · 691 reviews (checked 7 Oct 2026) |
| Phone | 056 074 7844 |
| Web presence before this | none (the Instagram link on the listing in August is gone) |
| Hours | Wed–Thu 11:30am–11:30pm · Sat 11:30am–11pm · Tue 2–11pm · closed Fri, Sun, Mon |
| Maps | https://www.google.com/maps/place/?q=place_id:ChIJRWYxJQDbwxURsNFBuo6yDMI |

## The idea

691 marks, one per Google review, that fill brass as you scroll — and a medal reading 5.0. No review is quoted: every 5-star review in the sample thanks a barber by name.

**Palette:** Bottle green, cream, brass · **Type:** Markazi Text · DM Serif Display

## Where the content came from

Everything on the page comes from the business's own Google Maps listing — the owner's description, the hours, the listed attributes, and the reviews. Nothing is invented: no prices, no staff names, no history, no claims they haven't made.

**Reviews:** None quoted — all name staff. The score carries the page instead. Reviews are 5-star only, verbatim, and never ones that praise an individual employee — staff move on.

**Note:** Phone changed since the August list (was 056 667 9558). The listing asks people to call before coming; the site leads with that.

## Before it goes live for them

- **Photos.** The page is deliberately image-free — no stock, and no AI pictures pretending to be their shop. Five real photos from the owner and it's done.
- **Owner check.** Confirm hours, services and the WhatsApp number.
- **Remove** `<meta name="robots" content="noindex, nofollow">` once they adopt it. Until then it stays, so this page never competes with their own listing in search.

## Tech

Plain HTML, CSS and JavaScript — no framework, no build step. Arabic is the default and ships in the markup; English is a toggle remembered in `localStorage`. Opening hours and "open now" are computed in Jeddah time (UTC+3), wherever the visitor is.

---
Developed by [Mamar](https://mamar.site)
