# Yiang Health

Yiang Health is a China-focused information and light journey-planning site covering wellness, local culture, food, nature and practical travel information. It is not a medical provider and does not diagnose, treat or guarantee health outcomes.

## Current public site

- GitHub Pages: https://yiang1905.github.io/Yiang-Health/
- Main site: https://yiang1905.github.io/Yiang/
- Main pages: home, Jincheng, Linfen, destinations, planner, pricing, safety, privacy and terms.

## Current payment configuration (verified in repository on 2026-11-07)

- Stripe: disabled; no active Payment Links are configured.
- PayPal: disabled; no payment URLs are configured.
- WeChat Pay / Alipay: QR image files are present and configured for display. The owner must independently scan each code and confirm the receiving account, amount and payment status before advertising the method as ready for customers.
- QR payments require manual receipt review. An access code must only be issued after the funds are confirmed in the receiving account.
- success.html is an informational page only. Opening it does not confirm that a payment was made.
- The current access-code check is client-side JavaScript and stores unlock state in the visitor's browser. It is not secure server-side payment verification and must not be described as a secure paywall or automated purchase flow.
- Do not add bank passwords, payment secrets, private credentials or personal email addresses to public client-side files.

## Current displayed prices

The public configuration currently lists:
- Essentials: US$14.90 / RMB 99
- Full Journey Pack: US$24.90 / RMB 168

These are displayed prices only. Do not imply that automatic checkout is operational until a payment route has been configured and tested end-to-end.

## Content and safety rules

- Hospital and provider information is public orientation only; it does not imply partnership, referral, endorsement or appointment access.
- The service is information organization and light journey planning only, not medical advice, diagnosis, treatment or emergency support.
- Do not publish unsupported efficacy claims, fabricated statistics, fake partnerships or unverified opening hours.
- Use location-verified images for named attractions. Mark illustrative images clearly.
- Keep private drafts, backups, credentials and internal project documents out of the public repository.

## Publishing checklist

1. Back up the files being changed.
2. Check git status and stage only intended website files.
3. Run JavaScript syntax checks and local link / asset checks.
4. Confirm the payment and contact wording matches the actual configuration.
5. Bump the service-worker cache name when changing cached HTML, CSS or JavaScript.
6. Review the staged diff; never stage unrelated files or backups.
7. After pushing, verify the live pages and the exact changed assets with cache-busting URLs.

## Important implementation limitation

This is a static GitHub Pages site. Any access code included in modules/config.js is public to anyone who downloads the JavaScript. For genuine paid-content protection, use a server-side validation mechanism before treating access as paid or secure. Until then, sell manually delivered planning work rather than claiming that static browser-side unlocking protects paid content.
