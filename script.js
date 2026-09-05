/**
 * YIANG HEALTH V1.1 - Main UI Script
 * UI Layer only. Business logic lives in modules/.
 */

(function () {
  'use strict';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function initHeader() {
    const toggle = $('.nav-toggle');
    const nav = $('.nav-links');
    if (toggle && nav) {
      toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }

    const sel = $('#lang-select');
    if (sel) {
      const langs = [
        { code: 'en', label: 'English' },
        { code: 'zh-CN', label: '简体中文' },
        { code: 'zh-TW', label: '繁體中文' },
        { code: 'ja', label: '日本語' },
        { code: 'ko', label: '한국어' },
        { code: 'es', label: 'Español' },
        { code: 'fr', label: 'Français' },
        { code: 'de', label: 'Deutsch' },
        { code: 'it', label: 'Italiano' },
        { code: 'pt', label: 'Português' },
        { code: 'ru', label: 'Русский' },
        { code: 'ar', label: 'العربية' },
        { code: 'hi', label: 'हिन्दी' },
        { code: 'id', label: 'Bahasa Indonesia' },
        { code: 'vi', label: 'Tiếng Việt' },
        { code: 'th', label: 'ไทย' },
        { code: 'tr', label: 'Türkçe' }
      ];
      sel.innerHTML = langs.map(l =>
        `<option value="${l.code}">${l.label}</option>`
      ).join('');
      sel.value = I18n.getCurrentLang();
      sel.addEventListener('change', () => I18n.setLanguage(sel.value));
    }

    const path = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  // ---------- Wellness Planner (V1.1) ----------
  function initPlanner() {
    const formWrap = $('#planner-form-wrap');
    if (!formWrap) return;

    let step = 1;
    const totalSteps = 4;
    const state = {
      goal: '',
      ageRange: '',
      location: '',
      activityLevel: '',
      sleepPattern: '',
      dietPreference: '',
      dailyTime: '',
      lifestyle: '',
      notes: ''
    };

    const steps = $$('.planner-step');
    const dots = $$('.step-dot');

    function showStep(n) {
      step = n;
      steps.forEach((s, i) => {
        s.classList.toggle('hidden', i + 1 !== n);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i + 1 === n);
        d.classList.toggle('done', i + 1 < n);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderGoals() {
      const grid = $('#goal-grid');
      if (!grid || !window.WellnessCore) return;
      const goals = WellnessCore.getGoals();
      grid.innerHTML = goals.map(g => `
        <label class="goal-option">
          <input type="radio" name="wellness-goal" value="${g.id}" ${state.goal === g.id ? 'checked' : ''}>
          <span class="goal-card">
            <span class="goal-icon" aria-hidden="true">${g.icon}</span>
            <span class="goal-title">${I18n.t(g.titleKey)}</span>
            <span class="goal-desc">${I18n.t(g.descKey)}</span>
          </span>
        </label>
      `).join('');
    }

    renderGoals();
    window.addEventListener('yiang:langchange', () => {
      renderGoals();
      I18n.applyTranslations();
    });

    formWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;

      if (action === 'next') {
        if (!validateStep(step)) return;
        collectStep(step);
        if (step < totalSteps) showStep(step + 1);
      } else if (action === 'back') {
        if (step > 1) showStep(step - 1);
      } else if (action === 'generate') {
        if (!validateStep(step)) return;
        collectStep(step);
        runWellnessPlanner();
      }
    });

    const restartBtn = $('#btn-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (window.WellnessCore) WellnessCore.clearPlan();
        location.reload();
      });
    }

    function validateStep(s) {
      if (s === 1) {
        const g = document.querySelector('input[name="wellness-goal"]:checked');
        if (!g) {
          alert(I18n.t('select_placeholder') + ' — Goal');
          return false;
        }
      }
      if (s === 2) {
        const age = $('#input-age')?.value;
        if (!age) {
          alert(I18n.t('select_placeholder') + ' — Age');
          return false;
        }
      }
      if (s === 3) {
        const time = $('#input-time')?.value;
        if (!time) {
          alert(I18n.t('select_placeholder') + ' — Time');
          return false;
        }
      }
      return true;
    }

    function collectStep(s) {
      if (s === 1) {
        const g = document.querySelector('input[name="wellness-goal"]:checked');
        state.goal = g ? g.value : '';
      }
      if (s === 2) {
        state.ageRange = $('#input-age')?.value || '';
        state.location = $('#input-location')?.value?.trim() || '';
        state.activityLevel = $('#input-activity')?.value || '';
      }
      if (s === 3) {
        state.sleepPattern = $('#input-sleep')?.value || '';
        state.dietPreference = $('#input-diet')?.value || '';
        state.dailyTime = $('#input-time')?.value || '30';
      }
      if (s === 4) {
        state.lifestyle = $('#input-lifestyle')?.value || '';
        state.notes = $('#input-notes')?.value?.trim() || '';
      }
    }

    async function runWellnessPlanner() {
      // Safety filter on free text
      if (state.notes && window.SafetyLayer) {
        const safety = SafetyLayer.safetyFilter(state.notes);
        if (safety && safety.block) {
          $('#planner-form-wrap').classList.add('hidden');
          $('#emergency-block').classList.remove('hidden');
          return;
        }
      }

      $('#planner-form-wrap').classList.add('hidden');
      $('#steps-indicator')?.classList.add('hidden');
      const loading = $('#planner-loading');
      if (loading) loading.classList.remove('hidden');

      try {
        // Small delay for UX
        await new Promise(r => setTimeout(r, 600));

        const plan = WellnessCore.generatePlan(state);
        if (loading) loading.classList.add('hidden');
        renderPlanResult(plan);
      } catch (err) {
        console.error(err);
        if (loading) loading.classList.add('hidden');
        alert('Something went wrong. Please try again.');
        $('#planner-form-wrap').classList.remove('hidden');
      }
    }

    function renderPlanResult(plan) {
      const results = $('#planner-results');
      if (!results) return;
      results.classList.remove('hidden');

      $('#result-plan-id').textContent = plan.planId || '—';

      const goal = WellnessCore.getGoalById(plan.goal);
      const badge = $('#result-goal-badge');
      if (badge && goal) {
        badge.innerHTML = `<span class="goal-icon">${goal.icon}</span> <strong>${I18n.t(goal.titleKey)}</strong>`;
      }

      const list = $('#result-actions');
      if (list) {
        list.innerHTML = (plan.dailyActions || []).map(a => `
          <div class="action-item" data-id="${a.id}">
            <div class="action-main">
              <div class="action-title">${I18n.t(a.titleKey)}</div>
              <div class="action-rec">${I18n.t(a.recKey)}</div>
              <div class="action-meta">
                <span class="action-cat">${a.category}</span>
                <span class="action-dur">${a.duration}</span>
              </div>
            </div>
            <div class="action-status">${I18n.t('plan_pending')}</div>
          </div>
        `).join('');
      }

      I18n.applyTranslations();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ---------- Dashboard ----------
  function initDashboard() {
    const content = $('#dash-content');
    const empty = $('#dash-empty');
    if (!content && !empty) return;
    if (!window.WellnessCore) return;

    const plan = WellnessCore.getPlan();
    if (!plan || !plan.dailyActions || plan.dailyActions.length === 0) {
      if (empty) empty.classList.remove('hidden');
      if (content) content.classList.add('hidden');
      return;
    }

    if (empty) empty.classList.add('hidden');
    if (content) content.classList.remove('hidden');

    $('#dash-plan-id').textContent = plan.planId || '—';

    function refreshStats() {
      const stats = WellnessCore.getCompletionStats();
      $('#dash-percent').textContent = stats.percent + '%';
      $('#dash-completed').textContent = stats.completed;
      $('#dash-total').textContent = stats.total;
    }

    function renderActions() {
      const list = $('#dash-actions');
      if (!list) return;
      const current = WellnessCore.getPlan();
      list.innerHTML = (current.dailyActions || []).map(a => `
        <div class="action-item ${a.completed ? 'is-done' : ''}" data-id="${a.id}">
          <label class="action-check">
            <input type="checkbox" ${a.completed ? 'checked' : ''} data-task-id="${a.id}" aria-label="${I18n.t(a.titleKey)}">
            <span class="checkmark"></span>
          </label>
          <div class="action-main">
            <div class="action-title">${I18n.t(a.titleKey)}</div>
            <div class="action-rec">${I18n.t(a.recKey)}</div>
            <div class="action-meta">
              <span class="action-cat">${a.category}</span>
              <span class="action-dur">${a.duration}</span>
            </div>
          </div>
        </div>
      `).join('');

      list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
          WellnessCore.toggleTask(cb.dataset.taskId, cb.checked);
          const item = cb.closest('.action-item');
          if (item) item.classList.toggle('is-done', cb.checked);
          refreshStats();
          renderWeekly();
        });
      });
    }

    function renderWeekly() {
      const wrap = $('#dash-weekly');
      if (!wrap) return;
      const days = WellnessCore.getWeeklyStats();
      const max = Math.max(1, ...days.map(d => d.count));
      wrap.innerHTML = days.map(d => {
        const h = Math.round((d.count / max) * 100);
        const label = d.date.slice(5);
        return `<div class="week-bar"><div class="bar" style="height:${h}%"></div><span>${label}</span></div>`;
      }).join('');
    }

    refreshStats();
    renderActions();
    renderWeekly();

    window.addEventListener('yiang:langchange', () => {
      renderActions();
      I18n.applyTranslations();
    });
  }

  // ---------- Destinations page (18 pilots) ----------
  function initDestinations() {
    const grid = $('#destinations-grid');
    if (!grid) return;

    async function loadPilots() {
      try {
        const r = await fetch('data/pilots.json');
        return await r.json();
      } catch (e) {
        console.warn(e);
        return null;
      }
    }

    function locName(obj, l) {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      return obj[l] || obj.en || obj['zh-CN'] || '';
    }

    async function load() {
      const data = await loadPilots();
      if (!data || !data.pilots) {
        grid.innerHTML = '<p>Could not load pilot data.</p>';
        return;
      }
      function render() {
        const l = I18n.getCurrentLang();
        const unlocked = window.AccessControl && AccessControl.hasAccess('essentials');
        grid.innerHTML = data.pilots.map(c => {
          const name = locName(c.name, l);
          const region = locName(c.region, l);
          const climate = locName(c.climate, l);
          const lock = unlocked ? '' : '<div class="city-status">Preview · Unlock for full guide</div>';
          return `
            <a class="city-card city-card-link" href="city.html?id=${c.id}">
              <h3>${name}</h3>
              <div class="region">${region}</div>
              <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px">${(climate || '').slice(0, 100)}…</p>
              ${lock}
            </a>`;
        }).join('');
      }
      render();
      window.addEventListener('yiang:langchange', render);
    }
    load();

    const btnHome = $('#btn-save-home');
    if (btnHome) {
      btnHome.addEventListener('click', async () => {
        const q = ($('#home-city') || {}).value || '';
        if (!q.trim()) return alert('Enter a city name');
        try {
          const url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(q.trim());
          const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
          const j = await r.json();
          if (!j || !j[0]) return alert('Location not found');
          localStorage.setItem('yiang_home_coords', JSON.stringify({
            lat: parseFloat(j[0].lat),
            lon: parseFloat(j[0].lon),
            label: q.trim()
          }));
          alert('Saved. Open a city page to see approximate distance.');
        } catch (e) {
          alert('Could not resolve location (network). You can still browse cities.');
        }
      });
    }
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    if (window.I18n) I18n.init();
    initHeader();
    initPlanner();
    initDashboard();
    initDestinations();
  });
})();
