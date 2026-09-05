/**
 * YIANG HEALTH - Destinations Module
 * UI-agnostic helpers for destination listing and matching.
 */

const DestinationsModule = (function () {
  async function listPilotCities() {
    const data = await DataLayer.getCities();
    if (!data || !data.cities) return [];
    return data.cities.filter(c => c.pilot);
  }

  async function getCityDisplayName(city, lang) {
    if (!city || !city.name) return city?.id || '';
    return city.name[lang] || city.name.en || city.id;
  }

  function getHighlight(city, lang) {
    if (!city || !city.highlights) return [];
    return city.highlights[lang] || city.highlights.en || [];
  }

  return {
    listPilotCities,
    getCityDisplayName,
    getHighlight
  };
})();

window.DestinationsModule = DestinationsModule;
