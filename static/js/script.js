/**
 * Connectify — Glassmorphism UI  |  script.js
 * Handles: 3D bubble scene · tab switching · form interactions
 *          password strength · eye-toggle · validation · toast
 */

/* ════════════════════════════════════════
   1. BUBBLE SCENE
   ════════════════════════════════════════ */
(function initBubbles() {
  const scene = document.getElementById('bubbleScene');
  const W = window.innerWidth, H = window.innerHeight;

  // Config — vary size, speed, drift, opacity for 3D depth illusion
  const BUBBLE_CONFIGS = [
    // [minPx, maxPx, count, minDur, maxDur, minDelay, maxDelay, driftRange]
    [40, 80, 7, 22, 38, 0, 18, 60],
    [90, 150, 5, 18, 30, 0, 14, 100],
    [180, 280, 4, 14, 24, 0, 10, 140],
  ];

  BUBBLE_CONFIGS.forEach(([minS, maxS, count, minD, maxD, , maxDelay, drift]) => {
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'bubble';

      const size = rand(minS, maxS);
      const dur = rand(minD, maxD);
      const delay = -rand(0, maxDelay);          // negative = already mid-way
      const driftX = (Math.random() > 0.5 ? 1 : -1) * rand(0, drift);
      const scaleEnd = rand(0.88, 1.08);
      const startXvw = rand(0, 100);

      const colorDur = rand(8, 20);
      const colorDel = -rand(0, 20);

      b.style.cssText = `
        width:${size}px; height:${size}px;
        left:${startXvw}vw; bottom:${-size}px;
        animation-duration: ${dur}s, ${colorDur}s;
        animation-delay: ${delay}s, ${colorDel}s;
        --drift:${driftX}px;
        --scale-end:${scaleEnd};
      `;

      scene.appendChild(b);
    }
  });

  /* Parallax shift on mouse move */
  document.addEventListener('mousemove', e => {
    const cx = e.clientX / W - 0.5;
    const cy = e.clientY / H - 0.5;
    scene.style.transform = `translate(${cx * 14}px, ${cy * 8}px)`;
  });

  function rand(a, b) { return Math.random() * (b - a) + a; }
  function mapRange(v, a, b, c, d) { return c + (v - a) / (b - a) * (d - c); }
})();


/* ════════════════════════════════════════
   2. TAB SWITCHING
   ════════════════════════════════════════ */
(function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  const indicator = document.querySelector('.tab-indicator');

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      // Update tabs
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Slide indicator
      indicator.classList.toggle('right', idx === 1);

      // Swap panels
      panels.forEach(p => p.classList.remove('active'));
      const target = document.getElementById(`panel-${tab.dataset.target}`);
      target.classList.add('active');
    });
  });
})();


/* ════════════════════════════════════════
   3. EYE TOGGLE (show/hide password)
   ════════════════════════════════════════ */
document.querySelectorAll('.eye-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const inp = document.getElementById(btn.dataset.target);
    const open = btn.querySelector('.eye-open');
    const closed = btn.querySelector('.eye-closed');
    const isHidden = inp.type === 'password';

    inp.type = isHidden ? 'text' : 'password';
    open.classList.toggle('hidden', isHidden);
    closed.classList.toggle('hidden', !isHidden);
  });
});


/* ════════════════════════════════════════
   4. PASSWORD STRENGTH METER
   ════════════════════════════════════════ */
(function initStrength() {
  const input = document.getElementById('signup-password');
  const segs = document.querySelectorAll('.strength-seg');
  const label = document.getElementById('strength-label');
  if (!input) return;

  const LEVELS = [
    { text: '', cls: '' },
    { text: 'Weak', cls: 'weak' },
    { text: 'Fair', cls: 'fair' },
    { text: 'Good', cls: 'good' },
    { text: 'Strong 💪', cls: 'strong' },
  ];

  input.addEventListener('input', () => {
    const v = input.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
    if (/\d/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;

    segs.forEach((seg, i) => {
      seg.classList.remove('weak', 'fair', 'good', 'strong');
      if (i < score && v.length > 0) seg.classList.add(LEVELS[score].cls);
    });

    label.textContent = v.length ? LEVELS[score].text : '';
    label.style.color = score >= 3 ? '#4ade80' : score === 2 ? '#facc15' : score === 1 ? '#fb923c' : '#f87171';
  });
})();


/* ════════════════════════════════════════
   5. CONFIRM PASSWORD MATCH
   ════════════════════════════════════════ */
(function initConfirm() {
  const pass = document.getElementById('signup-password');
  const confirm = document.getElementById('signup-confirm');
  const hint = document.getElementById('match-hint');
  const shell = document.getElementById('confirm-shell');
  if (!confirm) return;

  function check() {
    if (!confirm.value) { hint.textContent = ''; hint.className = 'match-hint'; shell.classList.remove('error', 'success'); return; }
    const ok = pass.value === confirm.value;
    hint.textContent = ok ? '✓ Passwords match' : '✗ Passwords do not match';
    hint.className = `match-hint ${ok ? 'ok' : 'bad'}`;
    shell.classList.toggle('error', !ok);
    shell.classList.toggle('success', ok);
  }
  confirm.addEventListener('input', check);
  pass.addEventListener('input', () => { if (confirm.value) check(); });
})();


/* ════════════════════════════════════════
   6. INLINE EMAIL DOMAIN VALIDATION
   ════════════════════════════════════════ */
['login-email', 'signup-email'].forEach(id => {
  const inp = document.getElementById(id);
  const shell = inp?.closest('.input-shell');
  if (!inp || !shell) return;

  inp.addEventListener('blur', () => {
    const v = inp.value.trim();
    if (!v) { shell.classList.remove('error', 'success'); return; }
    // Username must be letters, numbers, dots, underscores — no @ needed
    const ok = /^[a-zA-Z0-9._]+$/.test(v);
    shell.classList.toggle('error', !ok);
    shell.classList.toggle('success', ok);
  });
  inp.addEventListener('focus', () => shell.classList.remove('error', 'success'));
});


/* ════════════════════════════════════════
   7. TOAST NOTIFICATION
   ════════════════════════════════════════ */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}


/* ════════════════════════════════════════
   8. FORM SUBMISSION (demo logic)
   ════════════════════════════════════════ */
document.getElementById('login-btn')?.addEventListener('click', () => {
  const emailVal = document.getElementById('login-email').value.trim();
  const passVal = document.getElementById('login-password').value;

  if (!emailVal) { showToast('⚠️  Please enter your username.'); return; }
  if (!passVal) { showToast('⚠️  Please enter your password.'); return; }

  // Simulate loading state
  const btn = document.getElementById('login-btn');
  const txt = btn.querySelector('.btn-text');
  txt.textContent = 'Signing in…';
  btn.disabled = true;

  setTimeout(() => {
    txt.textContent = 'Sign In';
    btn.disabled = false;
    showToast(`✅  Welcome back, ${emailVal}@silicon.ac.in!`, 4000);
  }, 1600);
});

document.getElementById('signup-btn')?.addEventListener('click', () => {
  const fname = document.getElementById('signup-fname').value.trim();
  const lname = document.getElementById('signup-lname').value.trim();
  const emailV = document.getElementById('signup-email').value.trim();
  const passV = document.getElementById('signup-password').value;
  const confV = document.getElementById('signup-confirm').value;

  if (!fname) { showToast('⚠️  First name is required.'); return; }
  if (!emailV) { showToast('⚠️  Please enter your username.'); return; }
  if (passV.length < 8) { showToast('⚠️  Password must be at least 8 characters.'); return; }
  if (passV !== confV) { showToast('⚠️  Passwords do not match.'); return; }

  const btn = document.getElementById('signup-btn');
  const txt = btn.querySelector('.btn-text');
  txt.textContent = 'Creating account…';
  btn.disabled = true;

  setTimeout(() => {
    txt.textContent = 'Create Account';
    btn.disabled = false;
    showToast(`🎉  Account created! Welcome, ${fname}!`, 4000);
  }, 1800);
});


/* ════════════════════════════════════════
   9. FORGOT PASSWORD (demo)
   ════════════════════════════════════════ */
document.querySelector('.forgot-link')?.addEventListener('click', () => {
  const emailV = document.getElementById('login-email').value.trim();
  if (!emailV) { showToast('Enter your username first.'); return; }
  showToast(`📧  Reset link sent to ${emailV}@silicon.ac.in`, 4000);
});


/* ════════════════════════════════════════
   10. CARD TILT ON MOUSE MOVE (REMOVED)
   ════════════════════════════════════════ */
// Tilt interaction disabled per user request