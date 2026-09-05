/**
 * YIANG HEALTH - Data Layer
 * Loads and provides access to verified destination and service data.
 * Future: replace with API calls to /api/cities, /api/services
 */

const DataLayer = (function () {
  let citiesCache = null;
  let servicesCache = null;

  async function loadJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to load ${path}`);
      return await res.json();
    } catch (e) {
      console.warn('[DataLayer] Load error:', e.message);
      return null;
    }
  }

  async function getCities() {
    if (citiesCache) return citiesCache;
    citiesCache = await loadJSON('data/cities.json');
    return citiesCache;
  }

  async function getServices() {
    if (servicesCache) return servicesCache;
    servicesCache = await loadJSON('data/services.json');
    return servicesCache;
  }

  function getCityById(id, citiesData) {
    if (!citiesData || !citiesData.cities) return null;
    return citiesData.cities.find(c => c.id === id) || null;
  }

  function getCitiesByTags(tags, citiesData) {
    if (!citiesData || !citiesData.cities) return [];
    if (!tags || tags.length === 0) return citiesData.cities;
    return citiesData.cities.filter(city =>
      tags.some(tag => city.tags && city.tags.includes(tag))
    );
  }

  /**
   * Future API placeholders
   * When backend is ready, replace mock implementations.
   */
  const FutureAPI = {
    // GET /api/cities
    async fetchCities() {
      return getCities();
    },
    // GET /api/services
    async fetchServices() {
      return getServices();
    },
    // GET /api/destinations/:id
    async fetchDestination(id) {
      const data = await getCities();
      return getCityById(id, data);
    }
  };

  return {
    getCities,
    getServices,
    getCityById,
    getCitiesByTags,
    FutureAPI
  };
})();

// Export for module systems / future bundlers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataLayer;
}
window.DataLayer = DataLayer;
