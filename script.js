// ===================== ПРОФИМЕР [ ФЛИППИНГ ] — script.js =====================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle) {
    navToggle.addEventListener('click', () => mainNav.classList.toggle('is-open'));
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mainNav.classList.remove('is-open')));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach(i => i.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---------- choice buttons (calculator) ---------- */
  document.querySelectorAll('[data-choice-group]').forEach(group => {
    group.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        calcData[group.dataset.choiceGroup] = btn.dataset.value;
      });
    });
  });

  /* ---------- calculator step logic ---------- */
  const calcData = {};
  const steps = Array.from(document.querySelectorAll('.calc-step'));
  const progressFill = document.getElementById('calcProgress');
  let currentStep = 1;
  const totalSteps = steps.length;

  function goToStep(n) {
    steps.forEach(s => s.classList.toggle('is-active', Number(s.dataset.step) === n));
    currentStep = n;
    if (progressFill) progressFill.style.width = Math.min(100, (n / totalSteps) * 100) + '%';
  }

  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      calcData.district = document.getElementById('calcDistrict')?.value || calcData.district;
      calcData.area = document.getElementById('calcArea')?.value || calcData.area;
      calcData.term = document.getElementById('calcTerm')?.value || calcData.term;
      if (currentStep < totalSteps) goToStep(currentStep + 1);
    });
  });
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => { if (currentStep > 1) goToStep(currentStep - 1); });
  });

  const calcSubmit = document.getElementById('calcSubmit');
  if (calcSubmit) {
    calcSubmit.addEventListener('click', () => {
      calcData.term = document.getElementById('calcTerm')?.value || calcData.term;
      goToStep(6); // "Спасибо. Данные получены." + поле телефона
    });
  }

  const calcSend = document.getElementById('calcSend');
  if (calcSend) {
    calcSend.addEventListener('click', () => {
      calcData.phone = document.getElementById('calcPhone')?.value || '';
      // Здесь в реальном проекте — отправка calcData на сервер/в CRM.
      goToStep(7);
    });
  }

  /* ---------- final CTA form ---------- */
  const finalForm = document.getElementById('finalForm');
  if (finalForm) {
    finalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Здесь в реальном проекте — отправка данных формы на сервер/в CRM.
      finalForm.classList.add('is-sent');
    });
  }

  /* ---------- file upload label text ---------- */
  const planFile = document.getElementById('planFile');
  const fileText = document.getElementById('fileText');
  if (planFile) {
    planFile.addEventListener('change', () => {
      if (planFile.files && planFile.files[0]) {
        fileText.textContent = '[ ' + planFile.files[0].name + ' ]';
      }
    });
  }

});
