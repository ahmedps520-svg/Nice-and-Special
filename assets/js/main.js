/* ==========================================================
   NICE & SPECIAL | جميل ومميز
   No dependencies. Arabic ships in the markup; EN is the toggle.
   ========================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var isAr = function () { return document.documentElement.getAttribute('lang') === 'ar'; };

  var AR = '٠١٢٣٤٥٦٧٨٩';
  function arNum(s) { return String(s).replace(/\d/g, function (d) { return AR[+d]; }).replace(/,/g, '٬').replace(/\./g, '٫'); }
  function num(s) { return isAr() ? arNum(s) : String(s); }

  var REVIEWS = 691;

  /* ---------- hours, in Jeddah time (0 = Sunday) ---------- */
  // as listed on Google: closed Fri, Sun and Mon; Tuesday opens late
  var SCHED = { 0: [], 1: [], 2: [[840, 1380]], 3: [[690, 1410]], 4: [[690, 1410]], 5: [], 6: [[690, 1380]] };
  var DAYS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function jeddahNow() {
    var p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Riyadh', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    return { dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday), min: (+o.hour) * 60 + (+o.minute) };
  }
  function tLabel(m) {
    m = ((m % 1440) + 1440) % 1440;
    var h = Math.floor(m / 60), mm = m % 60, h12 = h % 12 || 12, t = h12 + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '');
    return isAr() ? arNum(t) + (h < 12 ? ' ص' : ' م') : t + (h < 12 ? 'am' : 'pm');
  }
  function openState() {
    var n = jeddahNow(), i, r, today = SCHED[n.dow] || [];
    for (i = 0; i < today.length; i++) { r = today[i]; if (n.min >= r[0] && n.min < r[1]) return { open: true, closes: r[1] }; }
    for (var k = 0; k < 8; k++) {
      var d = (n.dow + k) % 7, list = SCHED[d] || [];
      for (i = 0; i < list.length; i++) if (k > 0 || list[i][0] > n.min) return { open: false, k: k, d: d, opens: list[i][0] };
    }
    return { open: false };
  }
  function paintOpen() {
    var el = $('#openNow'), s = openState(), ar = isAr(), txt;
    if (s.open) txt = ar ? 'مفتوح الحين · يقفل ' + tLabel(s.closes) : 'Open now · closes ' + tLabel(s.closes);
    else {
      var when = s.k === 0 ? (ar ? 'اليوم' : 'today') : s.k === 1 ? (ar ? 'بكرة' : 'tomorrow') : (ar ? 'يوم ' + DAYS_AR[s.d] : 'on ' + DAYS_EN[s.d]);
      txt = ar ? 'مغلق الحين · يفتح ' + when + ' ' + tLabel(s.opens) : 'Closed now · opens ' + when + ' at ' + tLabel(s.opens);
    }
    el.innerHTML = '<i></i>' + txt; el.classList.toggle('closed', !s.open);
    var dow = jeddahNow().dow;
    $$('#tbl tr').forEach(function (r) { r.classList.toggle('today', +r.getAttribute('data-d') === dow && !r.classList.contains('off')); });
  }

  /* ---------- the field: one mark per review ---------- */
  var field = $('#field'), marks = [], lit = 0, fieldN = $('#fieldN');
  (function () {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < REVIEWS; i++) { var m = document.createElement('i'); frag.appendChild(m); marks.push(m); }
    field.appendChild(frag);
  })();
  function paintField() {
    var r = field.getBoundingClientRect(), vh = window.innerHeight;
    // starts once the field is well into view and finishes as it leaves the
    // upper third, so the fill is actually watched rather than already done
    var p = Math.max(0, Math.min(1, (vh * .85 - r.top) / (r.height + vh * .5)));
    var want = Math.round(p * REVIEWS);
    if (want === lit) return;
    var a = Math.min(want, lit), b = Math.max(want, lit), on = want > lit;
    for (var i = a; i < b; i++) marks[i].classList.toggle('on', on);
    lit = want;
    fieldN.textContent = num(lit);
  }

  /* ---------- the medal's ring of text ---------- */
  // repeat the phrase until it closes the circle, whichever language is showing
  function fitRing() {
    var tp = $('#ringTxt'), circ = document.getElementById('circ'); if (!tp || !circ) return;
    var unit = tp.getAttribute(isAr() ? 'data-unit-ar' : 'data-unit-en');
    tp.textContent = unit;
    var one = tp.getComputedTextLength(), total = circ.getTotalLength();
    if (!one) return;
    tp.textContent = new Array(Math.max(1, Math.floor(total / one)) + 1).join(unit);
  }

  /* ---------- language ---------- */
  var KEY = 'ns-lang', lngTx = $('#lngTx');
  function apply(lang) {
    var d = document.documentElement;
    d.setAttribute('lang', lang); d.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    $$('[data-en]').forEach(function (el) {
      var v = el.getAttribute(lang === 'ar' ? 'data-ar' : 'data-en');
      if (v != null) el.innerHTML = v;
    });
    if (lngTx) lngTx.textContent = lang === 'ar' ? 'EN' : 'ع';
    document.title = lang === 'ar' ? 'جميل ومميز | Nice & Special — صالون حلاقة رجالي في السلامة، جدة' : 'Nice & Special | جميل ومميز — Men’s barbershop in Al Salamah, Jeddah';
    $('#medalN').textContent = num('5.0');
    fitRing();
    fieldN.textContent = num(lit);
    splitWords($('#heroH'));
    paintOpen();
  }
  $('#lngBtn').addEventListener('click', function () {
    var next = isAr() ? 'en' : 'ar'; apply(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  });

  /* Words, never characters — per-letter spans break Arabic joining. */
  function splitWords(el) {
    var txt = (el.textContent || '').trim(); if (!txt) return;
    el.textContent = '';
    txt.split(/\s+/).forEach(function (w, i) {
      var m = document.createElement('span'); m.className = 'wm';
      var x = document.createElement('i'); x.textContent = w; x.style.setProperty('--i', i);
      m.appendChild(x); el.appendChild(m); el.appendChild(document.createTextNode(' '));
    });
  }

  /* ---------- nav ---------- */
  var nav = $('#nav'), brg = $('#brg'), menu = $('#menu');
  function closeMenu() { menu.classList.remove('open'); brg.classList.remove('on'); brg.setAttribute('aria-expanded', 'false'); document.body.classList.remove('lock'); }
  brg.addEventListener('click', function () {
    nav.classList.remove('slid');
    var o = menu.classList.toggle('open');
    brg.classList.toggle('on', o); brg.setAttribute('aria-expanded', o ? 'true' : 'false');
    document.body.classList.toggle('lock', o);
  });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- scroll ---------- */
  var reveals = $$('.rv'), dock = $('#dock'), lastY = 0, ticking = false;
  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight;
    nav.classList.toggle('stuck', y > 30);
    if (!menu.classList.contains('open')) {
      if (y > 500 && y > lastY + 4) nav.classList.add('slid');
      else if (y < lastY - 4 || y < 500) nav.classList.remove('slid');
    }
    lastY = y;
    if (dock) dock.classList.toggle('on', y > vh * .6);
    paintField();
    for (var i = reveals.length - 1; i >= 0; i--) {
      if (reveals[i].getBoundingClientRect().top < vh * .9) { reveals[i].classList.add('in'); reveals.splice(i, 1); }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);

  var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'en') apply('en'); else { splitWords($('#heroH')); paintOpen(); fitRing(); }
  // webfonts change the measured width, so fit again once they land
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitRing);
  setInterval(paintOpen, 60000);
  onScroll(); setTimeout(onScroll, 250);
})();
