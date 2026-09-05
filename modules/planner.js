/**
 * YIANG HEALTH - Journey Planner Core (Business Logic Layer)
 * 
 * Architecture flow (MUST be preserved for future AI):
 *   User Input
 *        ↓
 *   Safety Filter          ← SafetyLayer.safetyFilter()
 *        ↓
 *   AI Planning Engine     ← currently MockAIPlanner
 *        ↓
 *   Verified Data Retrieval ← DataLayer
 *        ↓
 *   Journey Generation
 *        ↓
 *   Safety Review
 *        ↓
 *   Report
 *
 * Future App / Mini Program can call the same generateJourney()
 */

const PlannerCore = (function () {

  /**
   * Generate a unique Journey ID
   * Format: YH-YYYY-XXXXXX
   */
  function generateJourneyId() {
    const year = new Date().getFullYear();
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `YH-${year}-${rand}`;
  }

  /**
   * Mock AI Planner
   * Uses only verified data + rule-based matching.
   * Language of output is controlled by caller (i18n).
   */
  function mockAIGenerate(input, citiesData, servicesData) {
    const {
      country,
      age,
      language,
      purpose,
      duration,
      budget,
      preferredDestinations,
      concernText
    } = input;

    // Map purpose to tags
    const purposeTagMap = {
      'medical-research': ['medical-research', 'checkup'],
      'tcm': ['tcm', 'cultural'],
      'wellness': ['wellness', 'relaxation'],
      'sleep-relaxation': ['sleep-relaxation', 'wellness', 'relaxation'],
      'rehabilitation': ['rehabilitation', 'recovery', 'wellness'],
      'checkup': ['checkup', 'medical-research'],
      'cultural-wellness': ['cultural', 'tcm', 'wellness'],
      'general-health-travel': ['wellness', 'cultural', 'checkup']
    };

    const tags = purposeTagMap[purpose] || ['wellness'];
    let matchedCities = DataLayer.getCitiesByTags(tags, citiesData);

    // If user selected preferred destinations, prioritize them
    if (preferredDestinations && preferredDestinations.length > 0) {
      const preferred = matchedCities.filter(c => preferredDestinations.includes(c.id));
      const others = matchedCities.filter(c => !preferredDestinations.includes(c.id));
      matchedCities = [...preferred, ...others];
    }

    // Limit to top relevant
    matchedCities = matchedCities.slice(0, 4);

    // Build journey structure (soft language only)
    const structure = buildJourneyStructure(purpose, duration, matchedCities);
    const serviceCategories = (servicesData && servicesData.categories)
      ? servicesData.categories.filter(cat => tags.includes(cat.id) || purpose === cat.id)
      : [];

    const considerations = buildConsiderations(country, duration, budget);
    const sources = collectOfficialSources(matchedCities);
    const nextSteps = buildNextSteps();

    return {
      journeyId: generateJourneyId(),
      createdAt: new Date().toISOString(),
      inputSummary: {
        country,
        ageRange: age,
        language,
        purpose,
        duration,
        budget,
        preferredDestinations: preferredDestinations || []
      },
      potentialDestinations: matchedCities.map(c => ({
        id: c.id,
        name: c.name,
        region: c.region,
        highlights: c.highlights,
        status: c.status,
        note: 'Potential destination based on your stated preferences. Further personal research is recommended.'
      })),
      suggestedJourneyStructure: structure,
      relevantServiceCategories: serviceCategories,
      travelConsiderations: considerations,
      officialInformationSources: sources,
      estimatedJourneyFramework: buildFramework(duration, matchedCities),
      nextSteps: nextSteps,
      safetyNotes: [
        'Yiang Health does not provide medical diagnosis, treatment, or emergency services.',
        'All information is for navigation and planning purposes only.',
        'Always verify details with official sources and qualified professionals.',
        'You remain fully responsible for your own health and travel decisions.'
      ],
      disclaimer: 'This is a mock AI-generated informational plan. It is not medical advice. Yiang Health does not diagnose, treat, or recommend specific medical interventions.'
    };
  }

  function buildJourneyStructure(purpose, duration, cities) {
    const days = parseDurationToDays(duration);
    const phases = [];

    phases.push({
      phase: 'Preparation',
      description: 'Research official requirements, visas if needed, and gather public health system information relevant to your purpose.'
    });

    if (cities.length > 0) {
      phases.push({
        phase: 'Arrival & Orientation',
        description: `Consider arriving in a major hub such as ${cities[0].name?.en || cities[0].id}. Allow time for orientation and rest.`
      });
    }

    if (days >= 5) {
      phases.push({
        phase: 'Exploration of Options',
        description: 'Explore publicly available information about facilities, wellness environments, or cultural sites aligned with your stated interest. Schedule only after independent verification.'
      });
    }

    if (days >= 10) {
      phases.push({
        phase: 'Deeper Engagement',
        description: 'If appropriate, allocate additional days for quieter environments or secondary destinations that may support recovery or cultural immersion.'
      });
    }

    phases.push({
      phase: 'Departure & Follow-up',
      description: 'Plan return travel with buffer time. Keep records of any official documents or public information you collected for personal reference.'
    });

    return phases;
  }

  function parseDurationToDays(duration) {
    if (!duration) return 7;
    if (duration.includes('1-3')) return 3;
    if (duration.includes('4-7')) return 7;
    if (duration.includes('8-14')) return 12;
    if (duration.includes('15-30')) return 21;
    if (duration.includes('30+')) return 40;
    return 7;
  }

  function buildConsiderations(country, duration, budget) {
    const list = [
      'Visa and entry requirements vary by nationality. Always check the official Chinese embassy or consulate website for your country.',
      'Public transportation and major airports provide official information in multiple languages in many cities.',
      'Health and wellness facilities range widely. Prefer institutions with clear official online presence.',
      'Language support may differ by facility. Consider destinations with stronger international services if language is a concern.',
      'Season and climate can affect travel comfort. Review local weather patterns for your planned period.'
    ];
    if (budget === 'budget') {
      list.push('Budget-conscious travelers may find good public transportation and mid-range accommodation options in most pilot cities.');
    }
    if (budget === 'premium') {
      list.push('Higher budget ranges may open more internationally oriented hotels and private wellness environments.');
    }
    return list;
  }

  function collectOfficialSources(cities) {
    const sources = [];
    const seen = new Set();
    cities.forEach(c => {
      if (c.officialSources) {
        c.officialSources.forEach(s => {
          if (!seen.has(s.url)) {
            seen.add(s.url);
            sources.push({
              name: s.name,
              url: s.url,
              type: s.type,
              note: 'Official public source. Content is the responsibility of the publishing authority.'
            });
          }
        });
      }
    });
    // Always include general ones
    sources.push({
      name: 'National Immigration Administration (China)',
      url: 'https://en.nia.gov.cn/',
      type: 'government',
      note: 'Official immigration and entry information.'
    });
    return sources;
  }

  function buildFramework(duration, cities) {
    const days = parseDurationToDays(duration);
    return {
      suggestedLength: `${days} days (indicative)`,
      primaryFocusCities: cities.slice(0, 2).map(c => c.name?.en || c.id),
      flexibilityNote: 'This framework is illustrative only. Actual itineraries should be built after consulting official sources and personal circumstances.'
    };
  }

  function buildNextSteps() {
    return [
      'Review the potential destinations and cross-check with official government and tourism websites.',
      'Verify any visa, insurance, and health entry requirements applicable to your nationality.',
      'If you intend to visit specific facilities, contact them directly through official channels for the latest public information.',
      'Consider consulting your own physician or qualified advisor before making health-related travel decisions.',
      'Keep this plan as a personal reference. It is not a booking or medical referral.'
    ];
  }

  /**
   * Main entry point used by UI (and future App / Mini Program)
   * @param {Object} userInput
   * @returns {Promise<Object>} journey report or emergency response
   */
  async function generateJourney(userInput) {
    // 1. Safety Filter FIRST
    const concern = userInput.concernText || '';
    const safety = SafetyLayer.safetyFilter(concern);

    if (safety.isEmergency) {
      return {
        type: 'emergency',
        journeyId: null,
        messageKey: 'EMERGENCY_GATE',
        safety
      };
    }

    // 2. Load verified data
    const citiesData = await DataLayer.getCities();
    const servicesData = await DataLayer.getServices();

    if (!citiesData) {
      return {
        type: 'error',
        message: 'Unable to load destination data. Please try again later.'
      };
    }

    // 3. Mock AI Planning Engine
    const report = mockAIGenerate(userInput, citiesData, servicesData);

    // 4. Safety Review (post-generation soft checks)
    report.safetyReview = {
      emergencyDetected: false,
      sensitiveDataWarning: safety.hasSensitive,
      generatedAt: new Date().toISOString()
    };

    report.type = 'journey';
    return report;
  }

  /**
   * Future real AI hook
   * Replace mockAIGenerate body with:
   *   const aiResult = await callAIPlanningAPI(sanitizedInput);
   *   then merge with verified data.
   */
  async function futureAIGenerate(input) {
    // Placeholder for OpenAI / Claude / Gemini / self-hosted
    throw new Error('Real AI API not connected in V1.0');
  }

  return {
    generateJourney,
    generateJourneyId,
    mockAIGenerate,
    futureAIGenerate,
    // Explicit future interface
    generatePremiumReport: generateJourney
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlannerCore;
}
window.PlannerCore = PlannerCore;
