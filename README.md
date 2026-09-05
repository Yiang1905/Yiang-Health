# Yiang Health V1.3

**China TCM · Wellness · Culture for global visitors**

Warm planning site for the **18 pilot regions** under China’s TCM service consumption & service-trade program.

## Money flow (your goal)

1. Visitor browses 18 pilot cities (preview free)
2. Pays **$9.90** or **$29** via Stripe Payment Link (or scan QR you upload)
3. You send them an **access code** (or automate later)
4. Code unlocks full guides on their device: hospitals (public orientation), climate, food, hotels, transport, attractions, distance estimate

**Configure:** `modules/config.js` → `paymentUrl` + optional `assets/qr/*.png` + `accessCodes`

Never put bank passwords or Stripe secret keys in the repo.

## 18 pilot regions (official list)

Beijing, Tianjin, Hulunbuir, Yanbian, Heihe, Shanghai, Nantong, Zhejiang, Shandong, Guangdong, Guangxi, Hainan, Chongqing, Chengdu, Kunming, Shaanxi, Gansu, Urumqi

Provincial pilots are oriented via primary cities (e.g. Hangzhou for Zhejiang).

## Critical honesty

- Hospital lists = **DEMO / public orientation**, not partnerships or referrals  
- Not medical advice, diagnosis, or treatment  
- You are a **light planning intermediary**

## Run / deploy

Static → GitHub Pages. After edit config, commit & push.

Demo unlock codes (change after go-live): see `accessCodes` in config.
