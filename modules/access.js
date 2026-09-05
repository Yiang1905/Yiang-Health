/**
 * Yiang Health V1.3 — Access / Paywall (client-side)
 * After Stripe Payment Link success, user receives an access code (you email it)
 * or paste success session unlock. Static-site friendly.
 *
 * For production: set ACCESS_CODES in config after each sale, or use Stripe
 * success_url with ?unlock=CODE that you generate.
 */
const AccessControl = (function () {
  const KEY = 'yiang_health_access_v13';

  function getState() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function setState(s) {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
      return true;
    } catch (e) {
      return false;
    }
  }

  function hasAccess(level) {
    const s = getState();
    if (level === 'essentials') return !!(s.essentials || s.full);
    if (level === 'full') return !!s.full;
    return !!(s.essentials || s.full);
  }

  function unlock(level, code) {
    const cfg = window.YiangConfig || {};
    const codes = (cfg.accessCodes || {});
    const valid =
      (level === 'essentials' && (code === codes.essentials || code === codes.full)) ||
      (level === 'full' && code === codes.full) ||
      (codes.master && code === codes.master);

    if (!valid) return { ok: false, message: 'Invalid access code' };

    const s = getState();
    if (level === 'full' || code === codes.full || code === codes.master) s.full = true;
    if (level === 'essentials' || s.full) s.essentials = true;
    s.unlockedAt = new Date().toISOString();
    setState(s);
    return { ok: true };
  }

  function lockAll() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  // Distance helper (Haversine km)
  function distanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  return { hasAccess, unlock, lockAll, getState, distanceKm };
})();

window.AccessControl = AccessControl;
