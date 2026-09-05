/**
 * YIANG HEALTH V1.1 - Wellness Core
 * Goals, Personalized Plan generation, Daily Tasks, Progress (localStorage)
 * Architecture ready for future AI backend / App / Mini Program
 *
 * Flow: Input → Analyze → Personalized Plan → Daily Action → Feedback → Adjustment
 */

const WellnessCore = (function () {
  'use strict';

  const STORAGE = {
    PROFILE: 'yiang_health_profile',
    PLAN: 'yiang_health_plan',
    PROGRESS: 'yiang_health_progress',
    PREFS: 'yiang_health_prefs'
  };

  // Unified Goal System
  const GOALS = [
    { id: 'tcm', icon: '🌿', titleKey: 'purpose_tcm', descKey: 'goal_tcm_desc', categories: ['tcm', 'wellness'] },
    { id: 'wellness', icon: '♨️', titleKey: 'purpose_wellness', descKey: 'goal_wellness_desc', categories: ['wellness', 'recovery'] },
    { id: 'sleep', icon: '🌙', titleKey: 'purpose_sleep', descKey: 'goal_sleep_desc', categories: ['sleep', 'recovery'] },
    { id: 'rehab', icon: '🛁', titleKey: 'purpose_rehab', descKey: 'goal_rehab_desc', categories: ['recovery', 'wellness'] },
    { id: 'checkup', icon: '📋', titleKey: 'purpose_checkup', descKey: 'goal_checkup_desc', categories: ['checkup'] },
    { id: 'cultural', icon: '🏯', titleKey: 'purpose_cultural', descKey: 'goal_cultural_desc', categories: ['cultural', 'tcm'] },
    { id: 'food', icon: '🍜', titleKey: 'purpose_food', descKey: 'goal_food_desc', categories: ['cultural', 'nutrition'] },
    { id: 'nature', icon: '🏔️', titleKey: 'purpose_nature', descKey: 'goal_nature_desc', categories: ['nature', 'wellness'] },
    { id: 'general', icon: '✨', titleKey: 'purpose_general', descKey: 'goal_general_desc', categories: ['wellness', 'cultural'] }
  ];

  // Demo / Rule-based action templates (AI-ready: replace with generateWellnessPlan API later)
  const ACTION_TEMPLATES = {
    sleep: [
      { id: 'sleep_schedule', titleKey: 'action_sleep_schedule', category: 'sleep', duration: '7–9 h', recKey: 'rec_sleep_schedule' },
      { id: 'sleep_winddown', titleKey: 'action_sleep_winddown', category: 'sleep', duration: '20–30 min', recKey: 'rec_sleep_winddown' },
      { id: 'sleep_screen', titleKey: 'action_sleep_screen', category: 'sleep', duration: '30–60 min', recKey: 'rec_sleep_screen' }
    ],
    stress: [
      { id: 'stress_breath', titleKey: 'action_stress_breath', category: 'mental', duration: '5–10 min', recKey: 'rec_stress_breath' },
      { id: 'stress_walk', titleKey: 'action_stress_walk', category: 'movement', duration: '15–20 min', recKey: 'rec_stress_walk' },
      { id: 'stress_journal', titleKey: 'action_stress_journal', category: 'mental', duration: '10 min', recKey: 'rec_stress_journal' }
    ],
    fitness: [
      { id: 'fit_walk', titleKey: 'action_fit_walk', category: 'movement', duration: '20–30 min', recKey: 'rec_fit_walk' },
      { id: 'fit_strength', titleKey: 'action_fit_strength', category: 'movement', duration: '15–25 min', recKey: 'rec_fit_strength' },
      { id: 'fit_stretch', titleKey: 'action_fit_stretch', category: 'recovery', duration: '10 min', recKey: 'rec_fit_stretch' }
    ],
    nutrition: [
      { id: 'nut_water', titleKey: 'action_nut_water', category: 'nutrition', duration: 'all day', recKey: 'rec_nut_water' },
      { id: 'nut_veg', titleKey: 'action_nut_veg', category: 'nutrition', duration: 'meals', recKey: 'rec_nut_veg' },
      { id: 'nut_meal', titleKey: 'action_nut_meal', category: 'nutrition', duration: '1 meal', recKey: 'rec_nut_meal' }
    ],
    weight: [
      { id: 'weight_walk', titleKey: 'action_fit_walk', category: 'movement', duration: '25–40 min', recKey: 'rec_fit_walk' },
      { id: 'weight_water', titleKey: 'action_nut_water', category: 'nutrition', duration: 'all day', recKey: 'rec_nut_water' },
      { id: 'weight_portion', titleKey: 'action_weight_portion', category: 'nutrition', duration: 'meals', recKey: 'rec_weight_portion' }
    ],
    aging: [
      { id: 'aging_move', titleKey: 'action_aging_move', category: 'movement', duration: '20–30 min', recKey: 'rec_aging_move' },
      { id: 'aging_balance', titleKey: 'action_aging_balance', category: 'movement', duration: '10 min', recKey: 'rec_aging_balance' },
      { id: 'aging_sleep', titleKey: 'action_sleep_schedule', category: 'sleep', duration: '7–8 h', recKey: 'rec_sleep_schedule' }
    ],
    energy: [
      { id: 'energy_sleep', titleKey: 'action_sleep_schedule', category: 'sleep', duration: '7–9 h', recKey: 'rec_sleep_schedule' },
      { id: 'energy_walk', titleKey: 'action_fit_walk', category: 'movement', duration: '15–25 min', recKey: 'rec_fit_walk' },
      { id: 'energy_water', titleKey: 'action_nut_water', category: 'nutrition', duration: 'all day', recKey: 'rec_nut_water' }
    ],
    recovery: [
      { id: 'rec_rest', titleKey: 'action_rec_rest', category: 'recovery', duration: '20–40 min', recKey: 'rec_rec_rest' },
      { id: 'rec_stretch', titleKey: 'action_fit_stretch', category: 'recovery', duration: '10–15 min', recKey: 'rec_fit_stretch' },
      { id: 'rec_sleep', titleKey: 'action_sleep_winddown', category: 'sleep', duration: '20–30 min', recKey: 'rec_sleep_winddown' }
    ],
    travel: [
      { id: 'travel_hydrate', titleKey: 'action_nut_water', category: 'nutrition', duration: 'all day', recKey: 'rec_nut_water' },
      { id: 'travel_move', titleKey: 'action_travel_move', category: 'movement', duration: '10–15 min', recKey: 'rec_travel_move' },
      { id: 'travel_sleep', titleKey: 'action_sleep_schedule', category: 'sleep', duration: '7–8 h', recKey: 'rec_sleep_schedule' }
    ],
    tcm: [
      { id: 'tcm_pace', titleKey: 'action_tcm_pace', category: 'tcm', duration: '1–2 days', recKey: 'rec_tcm_pace' },
      { id: 'tcm_official', titleKey: 'action_tcm_official', category: 'tcm', duration: 'prep', recKey: 'rec_tcm_official' },
      { id: 'tcm_rest', titleKey: 'action_rec_rest', category: 'recovery', duration: '20–40 min', recKey: 'rec_rec_rest' }
    ],
    cultural: [
      { id: 'cul_walk', titleKey: 'action_fit_walk', category: 'movement', duration: '30–60 min', recKey: 'rec_fit_walk' },
      { id: 'cul_food', titleKey: 'action_nut_meal', category: 'nutrition', duration: '1 meal', recKey: 'rec_nut_meal' },
      { id: 'cul_rest', titleKey: 'action_sleep_schedule', category: 'sleep', duration: '7–8 h', recKey: 'rec_sleep_schedule' }
    ],
    food: [
      { id: 'food_meal', titleKey: 'action_nut_meal', category: 'nutrition', duration: 'meals', recKey: 'rec_nut_meal' },
      { id: 'food_water', titleKey: 'action_nut_water', category: 'nutrition', duration: 'all day', recKey: 'rec_nut_water' },
      { id: 'food_walk', titleKey: 'action_fit_walk', category: 'movement', duration: '20 min', recKey: 'rec_fit_walk' }
    ],
    nature: [
      { id: 'nat_walk', titleKey: 'action_fit_walk', category: 'movement', duration: '30–60 min', recKey: 'rec_fit_walk' },
      { id: 'nat_breath', titleKey: 'action_stress_breath', category: 'mental', duration: '10 min', recKey: 'rec_stress_breath' },
      { id: 'nat_sleep', titleKey: 'action_sleep_schedule', category: 'sleep', duration: '7–8 h', recKey: 'rec_sleep_schedule' }
    ],
    checkup: [
      { id: 'chk_docs', titleKey: 'action_tcm_official', category: 'checkup', duration: 'prep', recKey: 'rec_tcm_official' },
      { id: 'chk_rest', titleKey: 'action_sleep_schedule', category: 'sleep', duration: '7–8 h', recKey: 'rec_sleep_schedule' },
      { id: 'chk_water', titleKey: 'action_nut_water', category: 'nutrition', duration: 'all day', recKey: 'rec_nut_water' }
    ],
    rehab: [
      { id: 'reh_rest', titleKey: 'action_rec_rest', category: 'recovery', duration: '30–40 min', recKey: 'rec_rec_rest' },
      { id: 'reh_stretch', titleKey: 'action_fit_stretch', category: 'recovery', duration: '15 min', recKey: 'rec_fit_stretch' },
      { id: 'reh_sleep', titleKey: 'action_sleep_winddown', category: 'sleep', duration: '20–30 min', recKey: 'rec_sleep_winddown' }
    ],
    general: [
      { id: 'gen_walk', titleKey: 'action_fit_walk', category: 'movement', duration: '20 min', recKey: 'rec_fit_walk' },
      { id: 'gen_water', titleKey: 'action_nut_water', category: 'nutrition', duration: 'all day', recKey: 'rec_nut_water' },
      { id: 'gen_breath', titleKey: 'action_stress_breath', category: 'mental', duration: '5 min', recKey: 'rec_stress_breath' },
      { id: 'gen_sleep', titleKey: 'action_sleep_schedule', category: 'sleep', duration: '7–8 h', recKey: 'rec_sleep_schedule' }
    ]
  };

  function safeGet(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn('[WellnessCore] localStorage read failed', e);
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('[WellnessCore] localStorage write failed', e);
      return false;
    }
  }

  function getGoals() {
    return GOALS.slice();
  }

  function getGoalById(id) {
    return GOALS.find(g => g.id === id) || null;
  }

  /**
   * Generate Personalized Wellness Plan (Demo Engine)
   * Future: call AI Service Interface generateWellnessPlan(profile)
   */
  function generatePlan(profile) {
    const goalId = profile.goal || 'general';
    const templates = ACTION_TEMPLATES[goalId] || ACTION_TEMPLATES.general;
    const activity = profile.activityLevel || 'moderate';
    const timeBudget = profile.dailyTime || '30';

    // Adjust action count by available time
    let count = 3;
    if (timeBudget === '15') count = 2;
    if (timeBudget === '60' || timeBudget === '90') count = 4;

    const selected = templates.slice(0, Math.min(count, templates.length));

    const dailyActions = selected.map((t, idx) => ({
      id: t.id + '_' + Date.now() + '_' + idx,
      templateId: t.id,
      titleKey: t.titleKey,
      category: t.category,
      duration: t.duration,
      recKey: t.recKey,
      completed: false,
      completedAt: null
    }));

    const plan = {
      planId: 'WP-' + new Date().getFullYear() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      goal: goalId,
      profile: {
        ageRange: profile.ageRange || '',
        activityLevel: activity,
        sleepPattern: profile.sleepPattern || '',
        dietPreference: profile.dietPreference || '',
        dailyTime: timeBudget,
        location: profile.location || '',
        lifestyle: profile.lifestyle || ''
      },
      dailyActions: dailyActions,
      modules: {
        sleep: dailyActions.filter(a => a.category === 'sleep'),
        movement: dailyActions.filter(a => a.category === 'movement' || a.category === 'fitness'),
        nutrition: dailyActions.filter(a => a.category === 'nutrition'),
        mental: dailyActions.filter(a => a.category === 'mental'),
        recovery: dailyActions.filter(a => a.category === 'recovery')
      },
      version: '1.1'
    };

    savePlan(plan);
    saveProfile(profile);
    // Reset today's progress for new plan
    const today = getTodayKey();
    const progress = safeGet(STORAGE.PROGRESS, {});
    progress[today] = { completedIds: [], date: today };
    safeSet(STORAGE.PROGRESS, progress);

    return plan;
  }

  function saveProfile(profile) {
    return safeSet(STORAGE.PROFILE, Object.assign({}, profile, { updatedAt: new Date().toISOString() }));
  }

  function getProfile() {
    return safeGet(STORAGE.PROFILE, null);
  }

  function savePlan(plan) {
    return safeSet(STORAGE.PLAN, plan);
  }

  function getPlan() {
    return safeGet(STORAGE.PLAN, null);
  }

  function clearPlan() {
    try {
      localStorage.removeItem(STORAGE.PLAN);
      localStorage.removeItem(STORAGE.PROGRESS);
      return true;
    } catch (e) {
      return false;
    }
  }

  function getTodayKey() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function getTodayProgress() {
    const progress = safeGet(STORAGE.PROGRESS, {});
    const today = getTodayKey();
    if (!progress[today]) {
      progress[today] = { completedIds: [], date: today };
      safeSet(STORAGE.PROGRESS, progress);
    }
    return progress[today];
  }

  function toggleTask(taskId, completed) {
    const plan = getPlan();
    if (!plan || !plan.dailyActions) return null;

    const task = plan.dailyActions.find(t => t.id === taskId);
    if (!task) return null;

    task.completed = !!completed;
    task.completedAt = completed ? new Date().toISOString() : null;
    plan.updatedAt = new Date().toISOString();
    savePlan(plan);

    const todayProg = getTodayProgress();
    if (completed) {
      if (!todayProg.completedIds.includes(taskId)) {
        todayProg.completedIds.push(taskId);
      }
    } else {
      todayProg.completedIds = todayProg.completedIds.filter(id => id !== taskId);
    }
    const allProgress = safeGet(STORAGE.PROGRESS, {});
    allProgress[getTodayKey()] = todayProg;
    safeSet(STORAGE.PROGRESS, allProgress);

    return plan;
  }

  function getCompletionStats() {
    const plan = getPlan();
    if (!plan || !plan.dailyActions || plan.dailyActions.length === 0) {
      return { total: 0, completed: 0, percent: 0 };
    }
    const total = plan.dailyActions.length;
    const completed = plan.dailyActions.filter(t => t.completed).length;
    return {
      total,
      completed,
      percent: Math.round((completed / total) * 100)
    };
  }

  function getWeeklyStats() {
    const progress = safeGet(STORAGE.PROGRESS, {});
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const day = progress[key];
      days.push({
        date: key,
        count: day ? (day.completedIds || []).length : 0
      });
    }
    return days;
  }

  // AI Service Interface (placeholder for future OpenAI / Gemini / Claude backend)
  const AIService = {
    async generateWellnessPlan(profile) {
      // Currently local demo engine. Replace body with secure backend call later.
      return generatePlan(profile);
    },
    async analyzeWellnessProfile(profile) {
      return {
        summary: 'Demo analysis based on stated preferences.',
        focusAreas: [profile.goal || 'general'],
        readiness: 'ready'
      };
    }
  };

  return {
    getGoals,
    getGoalById,
    generatePlan,
    saveProfile,
    getProfile,
    savePlan,
    getPlan,
    clearPlan,
    getTodayProgress,
    toggleTask,
    getCompletionStats,
    getWeeklyStats,
    AIService,
    STORAGE
  };
})();

window.WellnessCore = WellnessCore;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WellnessCore;
}
