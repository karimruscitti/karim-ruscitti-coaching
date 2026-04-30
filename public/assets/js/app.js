// ===== SCROLL REVEAL =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ===== MOBILE STICKY CTA =====
  const mobileCta = document.getElementById('mobileCta');
  const heroSection = document.querySelector('.hero');
  const applySection = document.getElementById('apply');
  
  if (mobileCta) {
    const ctaObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        // Check if we're past the hero
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const applyTop = applySection.getBoundingClientRect().top;
        if (heroBottom < 0 && applyTop > window.innerHeight) {
          mobileCta.classList.add('visible');
        } else {
          mobileCta.classList.remove('visible');
        }
      } else {
        mobileCta.classList.remove('visible');
      }
    }, { threshold: 0 });

    // Use scroll event for more precise control
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const heroBottom = heroSection.getBoundingClientRect().bottom;
          const applyTop = applySection.getBoundingClientRect().top;
          if (heroBottom < -100 && applyTop > window.innerHeight * 0.5) {
            mobileCta.classList.add('visible');
          } else {
            mobileCta.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ===== FORM LOGIC =====
  let currentStep = 1;
  const totalSteps = 4;

  function goStep(step) {
    // Validate current step
    if (step > currentStep) {
      if (currentStep === 1) {
        const name = document.getElementById('f-name').value.trim();
        const email = document.getElementById('f-email').value.trim();
        if (!name || !email) {
          shakeBtn(currentStep);
          highlightEmpty(currentStep);
          return;
        }
      }
      if (currentStep === 2) {
        const s = document.getElementById('f-squat').value;
        const b = document.getElementById('f-bench').value;
        const d = document.getElementById('f-dead').value;
        if (!s || !b || !d) {
          shakeBtn(currentStep);
          highlightEmpty(currentStep);
          return;
        }
      }
      if (currentStep === 3) {
        const required = getRequiredDayCount();
        const selected = getSelectedPrefDayCount();
        if (required === 0 || selected !== required) {
          const helper = document.getElementById('pref-days-helper');
          if (helper) {
            helper.classList.add('error');
            if (required === 0) {
              helper.textContent = 'Please choose how many days per week you can train, then select your preferred days.';
            } else {
              helper.textContent = `Please select exactly ${required} day${required === 1 ? '' : 's'}.`;
            }
          }
          shakeBtn(currentStep);
          return;
        }
      }
    }

    // Switch steps
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');

    // Update progress dots
    document.querySelectorAll('.form-prog-dot').forEach(dot => {
      const dotStep = parseInt(dot.dataset.step);
      dot.classList.remove('active', 'done');
      if (dotStep < step) dot.classList.add('done');
      if (dotStep === step) dot.classList.add('active');
    });

    currentStep = step;
    
    // Scroll form into view on mobile
    if (window.innerWidth < 768) {
      document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ===== FORMSPREE SUBMIT =====
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myklrjav';

  async function submitApp(event) {
    if (event && event.preventDefault) event.preventDefault();

    const form = document.getElementById('apply-form');
    const submitBtn = document.getElementById('btn-submit-app');
    const errorBox = document.getElementById('form-error');
    if (!form || !submitBtn) return;

    // Mirror reply-to from the email input so Karim's Gmail can hit Reply directly
    const emailInput = document.getElementById('f-email');
    const replyTo = document.getElementById('h-replyto');
    if (emailInput && replyTo) replyTo.value = emailInput.value.trim();

    // Final lightweight validation: name + email present and email syntactically valid
    const nameVal = (document.getElementById('f-name') || {}).value || '';
    const emailVal = (document.getElementById('f-email') || {}).value || '';
    if (!nameVal.trim() || !emailVal.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())) {
      // Bounce the user back to step 1 to fix it
      goStep(1);
      highlightEmpty(1);
      return;
    }

    // Hide any previous error, set loading state
    if (errorBox) errorBox.classList.remove('active');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');
    submitBtn.textContent = 'Sending\u2026';

    try {
      const formData = new FormData(form);

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Hide form steps & progress, show success
        document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
        const prog = document.querySelector('.form-progress');
        if (prog) prog.style.display = 'none';
        document.getElementById('form-success').classList.add('active');
        document.querySelectorAll('.form-prog-dot').forEach(dot => dot.classList.add('done'));
        if (typeof mobileCta !== 'undefined' && mobileCta) mobileCta.classList.remove('visible');
      } else {
        // Try to parse Formspree's structured error
        let msg = 'Your application could not be sent. Please try again, or message me on Instagram if the problem continues.';
        try {
          const data = await response.json();
          if (data && Array.isArray(data.errors) && data.errors.length) {
            msg = data.errors.map(e => e.message).filter(Boolean).join(' ') || msg;
          }
        } catch (_) { /* ignore parse error, use default msg */ }
        showFormError(msg);
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
        submitBtn.textContent = originalLabel;
      }
    } catch (err) {
      showFormError('Could not reach the server. Check your connection and try again, or message me on Instagram.');
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
      submitBtn.textContent = originalLabel;
    }
  }

  function showFormError(msg) {
    const box = document.getElementById('form-error');
    const text = document.getElementById('form-error-text');
    if (text && msg) text.textContent = msg;
    if (box) {
      box.classList.add('active');
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function dismissFormError() {
    const box = document.getElementById('form-error');
    if (box) box.classList.remove('active');
  }

  function shakeBtn(step) {
    const btn = document.querySelector(`.form-step[data-step="${step}"] .btn-form-next`);
    btn.style.animation = 'none';
    btn.offsetHeight; // Trigger reflow
    btn.style.animation = 'shake 0.45s ease';
  }

  function highlightEmpty(step) {
    const stepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    stepEl.querySelectorAll('.field-input[required]').forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--accent)';
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
      }
    });
  }

  // ===== FORM INTERACTIONS =====
  function selectOption(el, group) {
    el.closest('.select-grid').querySelectorAll('.select-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    if (group === 'exp') {
      const titleEl = el.querySelector('.select-option-title');
      const hidden = document.getElementById('h-experience');
      if (titleEl && hidden) hidden.value = titleEl.textContent.trim();
    }
  }

  function selectDay(el) {
    document.querySelectorAll('.day-opt').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
    const hidden = document.getElementById('h-days');
    if (hidden) hidden.value = el.textContent.trim();
    // If the user reduces the count below their currently selected preferred days, prune extras
    const required = getRequiredDayCount();
    const selectedDays = document.querySelectorAll('.pref-day.selected');
    if (selectedDays.length > required) {
      Array.from(selectedDays).slice(required).forEach(d => d.classList.remove('selected'));
    }
    syncPrefDaysHidden();
    updatePrefDaysHelper();
  }

  function getRequiredDayCount() {
    const sel = document.querySelector('.day-opt.selected');
    return sel ? parseInt(sel.textContent, 10) : 0;
  }

  function getSelectedPrefDayCount() {
    return document.querySelectorAll('.pref-day.selected').length;
  }

  function togglePrefDay(el) {
    const required = getRequiredDayCount();
    const isSelected = el.classList.contains('selected');
    // If at the cap and trying to add a new one, block it but flash the helper
    if (!isSelected && required > 0 && getSelectedPrefDayCount() >= required) {
      const helper = document.getElementById('pref-days-helper');
      helper.classList.add('error');
      helper.textContent = `You can only select ${required} day${required === 1 ? '' : 's'}. Deselect one first.`;
      return;
    }
    el.classList.toggle('selected');
    syncPrefDaysHidden();
    updatePrefDaysHelper();
  }

  function syncPrefDaysHidden() {
    const hidden = document.getElementById('h-pref-days');
    if (!hidden) return;
    const days = Array.from(document.querySelectorAll('.pref-day.selected'))
      .map(d => d.dataset.day);
    hidden.value = days.join(', ');
  }

  function updatePrefDaysHelper() {
    const helper = document.getElementById('pref-days-helper');
    if (!helper) return;
    const required = getRequiredDayCount();
    const selected = getSelectedPrefDayCount();
    helper.classList.remove('error');
    if (required === 0) {
      helper.textContent = 'First, choose how many days per week you can train above.';
      return;
    }
    if (selected === required) {
      helper.textContent = `Great, ${required} day${required === 1 ? '' : 's'} selected.`;
    } else {
      helper.textContent = `Please select exactly ${required} day${required === 1 ? '' : 's'}. (${selected}/${required} selected)`;
    }
  }

  function toggleChip(el) {
    el.classList.toggle('selected');
    const hidden = document.getElementById('h-goals');
    if (!hidden) return;
    const goals = Array.from(document.querySelectorAll('.goal-chip.selected'))
      .map(c => c.textContent.trim());
    hidden.value = goals.join(', ');
  }

  function setUnit(el, unit) {
    document.querySelectorAll('.unit-toggle-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.unit-label').forEach(l => l.textContent = unit.toUpperCase());
    const hidden = document.getElementById('h-unit');
    if (hidden) hidden.value = unit;
  }

  // ===== FAQ ACCORDION =====
  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    
    // Toggle current
    if (!wasOpen) item.classList.add('open');
  }

  // ===== SMOOTH SCROLL FUNCTION =====
  function goTo(id) {
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }

  // ===== SHAKE ANIMATION =====
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      15% { transform: translateX(-8px); }
      30% { transform: translateX(8px); }
      45% { transform: translateX(-6px); }
      60% { transform: translateX(6px); }
      75% { transform: translateX(-3px); }
      90% { transform: translateX(3px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  // ===== ATTACH FORM SUBMIT (replaces fragile inline onsubmit) =====
  (function attachFormHandlers() {
    const form = document.getElementById('apply-form');
    const submitBtn = document.getElementById('btn-submit-app');
    if (!form) return;

    // Primary: form submit event. Catches Enter-key submissions and submit-button clicks.
    form.addEventListener('submit', function(ev) {
      ev.preventDefault();
      submitApp(ev);
    });

    // Defensive backup: direct click on the submit button.
    // If anything ever blocks the form submit event (extensions, edge cases),
    // this guarantees the handler still runs.
    if (submitBtn) {
      submitBtn.addEventListener('click', function(ev) {
        // Only fire if the form's submit event didn't already handle it.
        // requestSubmit() fires submit event cleanly across browsers.
        if (typeof form.requestSubmit === 'function') {
          // Let the native submit flow happen; the addEventListener above will catch it.
          return;
        }
        // Older browsers without requestSubmit: call submitApp directly.
        ev.preventDefault();
        submitApp(ev);
      });
    }
  })();
