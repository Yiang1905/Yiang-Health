/**
 * YIANG HEALTH - Main UI Script
 * UI Layer only. Business logic lives in modules/.
 */

(function () {
  'use strict';

  // ---------- Shared UI helpers ----------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function initHeader() {
    const toggle = $('.nav-toggle');
    const nav = $('.nav-links');
    if (toggle && nav) {
      toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }

    // Language selector
    const sel = $('#lang-select');
    if (sel) {
      // Populate options
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

    // Active nav
    const path = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  // ---------- Planner page logic (UI only) ----------
  function initPlanner() {
    const formWrap = $('#planner-form-wrap');
    if (!formWrap) return;

    let step = 1;
    const totalSteps = 4;
    const state = {
      country: '',
      age: '',
      language: I18n.getCurrentLang(),
      purpose: '',
      duration: '',
      budget: '',
      preferredDestinations: [],
      concernText: ''
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

    // Populate destination chips
    async function loadDestChips() {
      const container = $('#dest-chips');
      if (!container) return;
      const cities = await DestinationsModule.listPilotCities();
      const lang = I18n.getCurrentLang();
      container.innerHTML = cities.map(c => {
        const name = c.name[lang] || c.name.en || c.id;
        return `
          <div class="dest-chip">
            <input type="checkbox" id="dest-${c.id}" value="${c.id}">
            <label for="dest-${c.id}">${name}</label>
          </div>`;
      }).join('');
    }

    loadDestChips();
    window.addEventListener('yiang:langchange', loadDestChips);

    // Navigation buttons
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
        runPlanner();
      } else if (action === 'restart') {
        location.reload();
      }
    });

    function validateStep(s) {
      if (s === 1) {
        const country = $('#input-country')?.value?.trim();
        const age = $('#input-age')?.value;
        if (!country || !age) {
          alert(I18n.t('select_placeholder') + ' (Country / Age)');
          return false;
        }
      }
      if (s === 2) {
        const purpose = document.querySelector('input[name="purpose"]:checked');
        if (!purpose) {
          alert(I18n.t('select_placeholder') + ' (Purpose)');
          return false;
        }
      }
      if (s === 3) {
        const duration = $('#input-duration')?.value;
        const budget = $('#input-budget')?.value;
        if (!duration || !budget) {
          alert(I18n.t('select_placeholder'));
          return false;
        }
      }
      return true;
    }

    function collectStep(s) {
      if (s === 1) {
        state.country = $('#input-country').value.trim();
        state.age = $('#input-age').value;
        state.language = $('#input-lang')?.value || I18n.getCurrentLang();
      }
      if (s === 2) {
        const p = document.querySelector('input[name="purpose"]:checked');
        state.purpose = p ? p.value : '';
      }
      if (s === 3) {
        state.duration = $('#input-duration').value;
        state.budget = $('#input-budget').value;
        state.preferredDestinations = $$('#dest-chips input:checked').map(i => i.value);
      }
      if (s === 4) {
        state.concernText = $('#input-concern')?.value?.trim() || '';
      }
    }

    async function runPlanner() {
      const resultArea = $('#planner-result');
      const formArea = $('#planner-form-wrap');
      formArea.classList.add('hidden');
      resultArea.classList.remove('hidden');
      resultArea.innerHTML = `
        <div class="text-center" style="padding:48px 0">
          <div class="loading-spinner" style="margin:0 auto 16px"></div>
          <p data-i18n="loading">${I18n.t('loading')}</p>
        </div>`;

      try {
        const report = await PlannerCore.generateJourney(state);

        if (report.type === 'emergency') {
          renderEmergency(resultArea);
          return;
        }

        if (report.type === 'error') {
          resultArea.innerHTML = `<div class="emergency-box"><p>${report.message}</p>
            <button class="btn btn-primary" data-action="restart">${I18n.t('btn_restart')}</button></div>`;
          return;
        }

        renderJourneyReport(resultArea, report);
      } catch (err) {
        console.error(err);
        resultArea.innerHTML = `<div class="emergency-box"><p>Something went wrong. Please try again.</p>
          <button class="btn btn-primary" data-action="restart">${I18n.t('btn_restart')}</button></div>`;
      }
    }

    function renderEmergency(container) {
      container.innerHTML = `
        <div class="emergency-box">
          <h2 data-i18n="emergency_title">${I18n.t('emergency_title')}</h2>
          <p data-i18n="emergency_body">${I18n.t('emergency_body')}</p>
          <a href="index.html" class="btn btn-primary" data-i18n="emergency_btn">${I18n.t('emergency_btn')}</a>
        </div>`;
    }

    function renderJourneyReport(container, report) {
      const lang = I18n.getCurrentLang();

      const destHtml = (report.potentialDestinations || []).map(d => {
        const name = (d.name && (d.name[lang] || d.name.en)) || d.id;
        const highlights = (d.highlights && (d.highlights[lang] || d.highlights.en)) || [];
        return `
          <div class="dest-item">
            <strong>${name}</strong>
            <div style="font-size:0.85rem;color:var(--text-muted)">${d.region || ''}</div>
            ${highlights.length ? `<ul class="list-plain">${highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
            <div class="note">${d.note || ''}</div>
          </div>`;
      }).join('');

      const structureHtml = (report.suggestedJourneyStructure || []).map(p => `
        <div class="phase-item">
          <div class="phase-name">${p.phase}</div>
          <div style="font-size:0.9rem;color:var(--text-secondary)">${p.description}</div>
        </div>`).join('');

      const servicesHtml = (report.relevantServiceCategories || []).map(s => {
        const name = (s.name && (s.name[lang] || s.name.en)) || s.id;
        return `<li>${name}</li>`;
      }).join('');

      const considerationsHtml = (report.travelConsiderations || []).map(c => `<li>${c}</li>`).join('');
      const sourcesHtml = (report.officialInformationSources || []).map(s => `
        <div class="source-item">
          <a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>
          <div style="font-size:0.8rem;color:var(--text-muted)">${s.note || ''}</div>
        </div>`).join('');

      const nextHtml = (report.nextSteps || []).map(n => `<li>${n}</li>`).join('');
      const safetyHtml = (report.safetyNotes || []).map(n => `<li>${n}</li>`).join('');

      container.innerHTML = `
        <div class="result-meta">
          <span><strong data-i18n="result_id">${I18n.t('result_id')}</strong>: ${report.journeyId}</span>
          <span>${new Date(report.createdAt).toLocaleString()}</span>
        </div>
        <h2 class="section-title" data-i18n="result_title">${I18n.t('result_title')}</h2>

        <div class="result-card">
          <h3 data-i18n="result_destinations">${I18n.t('result_destinations')}</h3>
          ${destHtml || '<p style="color:var(--text-muted)">—</p>'}
        </div>

        <div class="result-card">
          <h3 data-i18n="result_structure">${I18n.t('result_structure')}</h3>
          ${structureHtml}
        </div>

        ${servicesHtml ? `<div class="result-card">
          <h3 data-i18n="result_services">${I18n.t('result_services')}</h3>
          <ul class="list-plain">${servicesHtml}</ul>
        </div>` : ''}

        <div class="result-card">
          <h3 data-i18n="result_considerations">${I18n.t('result_considerations')}</h3>
          <ul class="list-plain">${considerationsHtml}</ul>
        </div>

        <div class="result-card">
          <h3 data-i18n="result_sources">${I18n.t('result_sources')}</h3>
          ${sourcesHtml}
        </div>

        <div class="result-card">
          <h3 data-i18n="result_framework">${I18n.t('result_framework')}</h3>
          <p style="font-size:0.92rem;color:var(--text-secondary)">
            ${report.estimatedJourneyFramework?.suggestedLength || ''} · 
            ${(report.estimatedJourneyFramework?.primaryFocusCities || []).join(', ')}
          </p>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-top:8px">
            ${report.estimatedJourneyFramework?.flexibilityNote || ''}
          </p>
        </div>

        <div class="result-card">
          <h3 data-i18n="result_next">${I18n.t('result_next')}</h3>
          <ul class="list-plain">${nextHtml}</ul>
        </div>

        <div class="result-card">
          <h3 data-i18n="result_safety">${I18n.t('result_safety')}</h3>
          <ul class="list-plain">${safetyHtml}</ul>
        </div>

        <div class="disclaimer-box">
          <strong data-i18n="result_disclaimer">${I18n.t('result_disclaimer')}</strong><br>
          ${report.disclaimer || ''}
        </div>

        <div class="planner-actions mt-24">
          <button class="btn btn-secondary" data-action="restart" data-i18n="btn_restart">${I18n.t('btn_restart')}</button>
          <a href="pricing.html" class="btn btn-primary" data-i18n="pricing_premium_name">${I18n.t('pricing_premium_name')}</a>
        </div>
      `;

      // Re-bind restart
      container.querySelector('[data-action="restart"]')?.addEventListener('click', () => location.reload());
    }

    showStep(1);
  }

  // ---------- Destinations page ----------
  async function initDestinations() {
    const grid = $('#city-grid');
    if (!grid) return;

    const cities = await DestinationsModule.listPilotCities();
    const lang = I18n.getCurrentLang();

    function render() {
      const l = I18n.getCurrentLang();
      grid.innerHTML = cities.map(c => {
        const name = c.name[l] || c.name.en || c.id;
        const highlights = (c.highlights && (c.highlights[l] || c.highlights.en)) || [];
        return `
          <div class="city-card">
            <h3>${name}</h3>
            <div class="region">${c.region || ''}</div>
            <ul>${highlights.map(h => `<li>${h}</li>`).join('')}</ul>
            <div class="city-status">Status: ${c.status || 'verified-partial'} · Official sources available</div>
          </div>`;
      }).join('');
    }

    render();
    window.addEventListener('yiang:langchange', render);
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    I18n.init();
    initHeader();
    initPlanner();
    initDestinations();
  });
})();
