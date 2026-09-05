# YIANG HEALTH V1.0 MVP

**AI-Powered China Health Journey Planning**  
*We don't diagnose. We help you navigate.*  
*我们不替你诊断，我们帮助你找到正确的方向。*

## How to run

1. Open the `health` folder in any static file server, or simply open `index.html` in a modern browser.
2. Recommended: from this directory run  
   `npx serve .`  
   or  
   `python3 -m http.server 8080`  
   then visit `http://localhost:8080`.

> Note: `fetch` for JSON data requires a local server (or some browsers allow file:// with restrictions). Use a simple static server for best results.

## File map

| File / Folder | Role |
|---|---|
| `index.html` | Home |
| `planner.html` | 4-step Journey Planner + results |
| `destinations.html` | Pilot cities list |
| `pricing.html` | Free / Premium / Premium Plus |
| `safety.html` | Safety boundaries |
| `terms.html` | Terms of use |
| `privacy.html` | Privacy notice |
| `style.css` | Design system |
| `script.js` | UI layer only |
| `modules/data.js` | Data layer (cities, services) |
| `modules/safety.js` | Safety Filter (runs before planning) |
| `modules/planner.js` | Business logic + Mock AI |
| `modules/i18n.js` | 17 languages + RTL |
| `modules/destinations.js` | Destination helpers |
| `data/cities.json` | Verified / partial destination data |
| `data/services.json` | Service categories |
| `manifest.json` + `service-worker.js` | Basic PWA shell |

## Architecture (future-ready)

```
UI Layer (HTML + script.js)
    ↓
Planner Core / Safety / i18n / Data  (modules/)
    ↓
Verified Data (JSON → future /api)
```

Same core modules are intended for reuse by future Android / iOS / WeChat Mini Program UIs.

## Current V1.0 limits

- No real AI API (Mock only)
- No real payments
- No user accounts / cloud sync
- No backend / database
- First 5 pilot cities only (structure ready for 18)
- PWA is basic (Add to Home Screen capable)
- Icons placeholders may be missing (add 192/512 PNG under `assets/` if desired)
