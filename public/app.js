/* Hushållskassan — budget, ränta och samhällsekonomi, samhällskunskap åk 7–9.
   Två mekaniker: välj två poster som får plats (nivå 1), tryck på rätt svar (nivå 2–4).
   Ingen tid, inga liv; fel svar kostar ingen stjärna och ger en förklaring. */
(function () {
  'use strict';
  var S = {
    ljud: true, niva: 1, index: 0, stjarnor: 0, val: [], forsok: 0,
    klar: false, vantar: false, hint: false, tok: 0, totalt: 0
  };
  window.__hk = S;

  var $ = function (s) { return document.querySelector(s); };
  var BANK = window.__BANK;
  var el = {
    start: $('#startskarm'), spel: $('#spel'), fraga: $('#fraga'),
    kassabok: $('#kassabok'), inkomstTal: $('#inkomstTal'), fastaRader: $('#fastaRader'),
    saldoRad: $('#saldoRad'), saldoEtikett: $('#saldoEtikett'), saldoTal: $('#saldoTal'),
    fragText: $('#fragText'), kort: $('#kort'), aterkoppling: $('#aterkoppling'),
    visning: $('#visning'), nivaText: $('#nivaText'), stjarnText: $('#stjarnText'),
    prickar: $('#prickar'), klart: $('#klart'), klartTitel: $('#klartTitel'),
    klartText: $('#klartText'), klartStjarnor: $('#klartStjarnor'),
    klartKnapp: $('#klartKnapp'), klartIgen: $('#klartIgen'), ljud: $('#ljud'),
    framsteg: $('#framsteg'), kotten: $('#kotten'), play: $('#play')
  };
  var reducerad = false;
  try { reducerad = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---------- ljud ---------- */
  var ljudCtx = null;
  function blipp(freq, slag, tid, volym) {
    if (!S.ljud) return;
    try {
      if (!ljudCtx) ljudCtx = new (window.AudioContext || window.webkitAudioContext)();
      var o = ljudCtx.createOscillator(), g = ljudCtx.createGain();
      o.type = slag || 'triangle'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, ljudCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(volym || 0.13, ljudCtx.currentTime + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, ljudCtx.currentTime + (tid || 0.2));
      o.connect(g); g.connect(ljudCtx.destination);
      o.start(); o.stop(ljudCtx.currentTime + (tid || 0.2) + 0.03);
    } catch (e) {}
  }
  function tala(text) {
    if (!S.ljud || !text) return;
    try { if (typeof window.__rost === 'function' && window.__rost(text)) return; } catch (e) {}
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'sv-SE'; u.rate = 0.98; u.pitch = 1.03;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }
  window.addEventListener('pointerdown', function enGang() {
    try { if (ljudCtx && ljudCtx.state === 'suspended') ljudCtx.resume(); } catch (e) {}
    window.removeEventListener('pointerdown', enGang);
  });
  function event(namn, varde) {
    try { if (window.skolappar && window.skolappar.event) window.skolappar.event(namn, varde); } catch (e) {}
  }

  /* ---------- Kotten ---------- */
  function kottenSvg(slag) {
    var kunskap = {
      glad: { ov: 0, mun: 'le' }, funderar: { ov: 1, mun: 'krok' },
      firar: { ov: -1, mun: 'gap' }, nyfiken: { ov: -1, mun: 'o' },
      imponerad: { ov: 0, mun: 'le' }
    };
    var t = kunskap[slag] || kunskap.glad;
    var spridd = t.ov === 1 ? 4 : 0, mun = t.mun;
    return '' +
      '<ellipse cx="60" cy="86" rx="38" ry="42" fill="#8C5A34"/>' +
      '<path d="M26 96 q34 -14 68 0" stroke="#6E4225" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M30 78 q30 -13 60 0" stroke="#6E4225" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M36 62 q24 -11 48 0" stroke="#6E4225" stroke-width="7" fill="none" stroke-linecap="round"/>' +
      '<path d="M44 122 q16 -7 32 0" stroke="#6E4225" stroke-width="6" fill="none" stroke-linecap="round"/>' +
      (slag === 'imponerad' ? '<path d="M60 34 l6 12 13 2 -9 9 2 13 -12 -6 -12 6 2 -13 -9 -9 13 -2z" fill="#E9B23C"/>' : '') +
      '<circle cx="46" cy="66" r="13" fill="#FFFDF7" stroke="#3A2718" stroke-width="3"/>' +
      '<circle cx="76" cy="66" r="13" fill="#FFFDF7" stroke="#3A2718" stroke-width="3"/>' +
      '<circle cx="' + (46 + (slag === 'nyfiken' ? 4 : 0)) + '" cy="' + (66 + (t.ov === 1 ? 3 : 0)) + '" r="6" fill="#222"/>' +
      '<circle cx="' + (76 + (slag === 'nyfiken' ? 4 : 0)) + '" cy="' + (66 + (t.ov === 1 ? 3 : 0)) + '" r="6" fill="#222"/>' +
      '<path d="M33 ' + (52 - spridd) + ' q13 -7 25 ' + (t.ov > 0 ? 5 : (t.ov < 0 ? -4 : 0)) + '" stroke="#3A2718" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M89 ' + (52 - spridd) + ' q-13 -7 -25 ' + (t.ov > 0 ? 5 : (t.ov < 0 ? -4 : 0)) + '" stroke="#3A2718" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      (mun === 'le' ? '<path d="M46 86 q14 14 28 0" stroke="#3A2718" stroke-width="4.5" fill="none" stroke-linecap="round"/>' : '') +
      (mun === 'o' ? '<ellipse cx="60" cy="88" rx="7" ry="9" fill="#3A2718"/>' : '') +
      (mun === 'krok' ? '<path d="M47 90 q8 -7 16 1 q5 5 11 -2" stroke="#3A2718" stroke-width="4.5" fill="none" stroke-linecap="round"/>' : '') +
      (mun === 'gap' ? '<path d="M44 82 q16 24 32 0 z" fill="#3A2718"/>' : '');
  }
  function sattKotten(slag) { el.kotten.innerHTML = kottenSvg(slag); }

  function pengar(n) { return Number(n).toLocaleString('sv-SE') + ' kr'; }

  /* stabil omkastning per uppgift – samma ordning varje gång, men inte alltid rätt par först */
  function blanda(arr, seed) {
    var b = arr.slice(), x = seed * 7919 + 104729;
    for (var i = b.length - 1; i > 0; i--) {
      x = (x * 1103515245 + 12345) & 0x7fffffff;
      var j = x % (i + 1), t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }

  function aktuell() {
    var nv = BANK.nivaer[S.niva - 1];
    return nv.uppgifter[S.index];
  }

  function visaHud() {
    var nv = BANK.nivaer[S.niva - 1];
    el.nivaText.textContent = 'Nivå ' + S.niva + ' · ' + nv.namn;
    el.stjarnText.textContent = S.stjarnor;
    el.prickar.innerHTML = '';
    for (var i = 0; i < nv.uppgifter.length; i++) {
      var d = document.createElement('i');
      d.className = i < S.index ? 'gjord' : (i === S.index ? 'nu' : '');
      el.prickar.appendChild(d);
    }
    var f = el.framsteg.firstElementChild;
    if (!f) { f = document.createElement('i'); el.framsteg.appendChild(f); }
    f.style.width = Math.round((S.index / nv.uppgifter.length) * 100) + '%';
  }

  function rensaKort() { el.kort.innerHTML = ''; }

  function visaUppgift() {
    var u = aktuell();
    S.val = []; S.forsok = 0; S.klar = false; S.vantar = false; S.hint = false; S.tok++;
    el.aterkoppling.textContent = ''; el.aterkoppling.className = '';
    el.visning.textContent = ''; el.visning.className = '';
    document.body.classList.remove('skaka');
    sattKotten('funderar');
    visaHud();
    rensaKort();

    if (u.typ === 'budget') {
      el.kassabok.hidden = false;
      el.inkomstTal.textContent = pengar(u.inkomst);
      el.fastaRader.innerHTML = '';
      u.fasta.forEach(function (r) {
        var d = document.createElement('div');
        d.className = 'bokrad';
        d.innerHTML = '<span></span><b></b>';
        d.firstChild.textContent = r.namn;
        d.lastChild.textContent = '−' + pengar(r.belopp);
        el.fastaRader.appendChild(d);
      });
      el.saldoRad.hidden = false;
      el.saldoEtikett.textContent = 'Kvar i kassan';
      el.saldoTal.textContent = pengar(u.saldo);
      el.saldoRad.classList.remove('slut');
      el.fragText.textContent = u.fraga;
      el.fragText.hidden = false;
      blanda(u.valfria, S.niva * 13 + S.index).forEach(function (r) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'kort';
        b.setAttribute('aria-pressed', 'false');
        b.innerHTML = '<span></span><span class="belopp"></span>';
        b.firstChild.textContent = r.namn;
        b.lastChild.textContent = pengar(r.belopp);
        b.addEventListener('click', function () { valjPost(r); });
        el.kort.appendChild(b);
      });
    } else {
      el.kassabok.hidden = true;
      el.saldoRad.hidden = true;
      el.fragText.textContent = u.fraga;
      el.fragText.hidden = false;
      var alt = [];
      alt.push({ text: u.ratt, ratt: true });
      u.fel.forEach(function (t) { alt.push({ text: t, ratt: false }); });
      // stabil ordning per uppgift, inte per omgång
      var seed = (S.niva * 7 + S.index * 3) % 3;
      var ord = [alt[seed % 3], alt[(seed + 1) % 3], alt[(seed + 2) % 3]];
      ord.forEach(function (a) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'kort';
        b.innerHTML = '<span class="svar"></span>';
        b.firstChild.textContent = a.text;
        b.addEventListener('click', function () { valjSvar(b, a); });
        el.kort.appendChild(b);
      });
    }
    tala(u.fraga);
  }

  function valjPost(r) {
    if (S.klar || S.vantar) return;
    var u = aktuell();
    var knappar = Array.prototype.slice.call(el.kort.children);
    var knapp = knappar.filter(function (b) { return b.firstChild.textContent === r.namn; })[0];
    if (!knapp || knapp.disabled) return;
    if (S.val.indexOf(r.namn) !== -1) {
      S.val = S.val.filter(function (n) { return n !== r.namn; });
      knapp.classList.remove('vald'); knapp.setAttribute('aria-pressed', 'false');
      blipp(330, 'sine', 0.08);
      return;
    }
    if (S.val.length >= 2) return;
    S.val.push(r.namn);
    knapp.classList.add('vald'); knapp.setAttribute('aria-pressed', 'true');
    blipp(520, 'sine', 0.1);
    if (S.val.length === 2) kollaBudget(u);
  }

  function summa(namn, u) {
    return u.valfria.filter(function (r) { return namn.indexOf(r.namn) !== -1; })
      .reduce(function (s, r) { return s + r.belopp; }, 0);
  }

  function kollaBudget(u) {
    var tot = summa(S.val, u);
    var ok = tot <= u.saldo;
    var ratt = S.val.slice().sort().join('|') === u.ratt.slice().sort().join('|');
    if (ok && ratt) { rättSvar(u); return; }
    S.forsok++;
    S.vantar = true;
    document.body.classList.add('skaka');
    setTimeout(function () { document.body.classList.remove('skaka'); }, 400);
    var text = ok
      ? 'Det får plats – men det finns ett par som kassan hellre vill ha. Prova igen.'
      : 'Det blir ' + pengar(tot) + ' och du har bara ' + pengar(u.saldo) + ' kvar. Prova igen.';
    el.aterkoppling.textContent = text;
    el.aterkoppling.className = 'fel';
    tala('För litet kvar i kassan. Prova igen.');
    blipp(210, 'sawtooth', 0.22, 0.1);
    if (S.forsok >= 2) geHint();
    setTimeout(function () {
      S.val = [];
      S.vantar = false;
      Array.prototype.forEach.call(el.kort.children, function (b) {
        b.classList.remove('vald'); b.setAttribute('aria-pressed', 'false');
      });
      el.aterkoppling.textContent = '';
      el.aterkoppling.className = '';
    }, 1500);
  }

  function valjSvar(knapp, alt) {
    if (S.klar || S.vantar || knapp.disabled) return;
    var u = aktuell();
    if (alt.ratt) { knapp.classList.add('ratt'); rättSvar(u); return; }
    S.forsok++;
    knapp.classList.add('fel'); knapp.disabled = true;
    document.body.classList.add('skaka');
    setTimeout(function () { document.body.classList.remove('skaka'); }, 400);
    el.aterkoppling.textContent = 'Inte riktigt. Prova ett annat kort.';
    el.aterkoppling.className = 'fel';
    tala('Nästan. Prova igen.');
    blipp(210, 'sawtooth', 0.22, 0.1);
    if (S.forsok >= 2) geHint();
  }

  function geHint() {
    if (S.hint) return;
    S.hint = true;
    event('hint');
    var u = aktuell();
    if (u.typ === 'budget') {
      Array.prototype.forEach.call(el.kort.children, function (b) {
        if (u.ratt.indexOf(b.firstChild.textContent) !== -1) b.classList.add('puls');
      });
    } else if (el.kort.children.length) {
      // rätt kort är det enda som inte är felmarkerat
      Array.prototype.forEach.call(el.kort.children, function (b) {
        if (!b.classList.contains('fel')) b.classList.add('puls');
      });
    }
  }

  function rättSvar(u) {
    S.klar = true; S.vantar = true;
    if (S.forsok === 0) { S.stjarnor += 1; S.totalt += 1; }
    el.stjarnText.textContent = S.stjarnor;
    sattKotten('firar');
    el.aterkoppling.textContent = 'Rätt!';
    el.aterkoppling.className = 'ratt';
    el.visning.textContent = u.forklaring || '';
    blipp(660, 'triangle', 0.14); setTimeout(function () { blipp(880, 'triangle', 0.18); }, 120);
    tala(u.forklaring || 'Rätt!');
    var tok = S.tok;
    setTimeout(function () { if (S.klar && tok === S.tok) nasta(); }, 3600);
  }

  function nasta() {
    if (!S.klar) return;
    S.klar = false;
    var nv = BANK.nivaer[S.niva - 1];
    S.index++;
    if (S.index >= nv.uppgifter.length) { klartNiva(); return; }
    visaUppgift();
  }

  function klartNiva() {
    var nv = BANK.nivaer[S.niva - 1];
    el.klart.hidden = false;
    el.klartStjarnor.textContent = '⭐ ' + S.stjarnor + ' av ' + nv.uppgifter.length;
    if (S.niva < BANK.nivaer.length) {
      el.klartTitel.textContent = 'Nivå ' + S.niva + ' klar!';
      el.klartText.textContent = nv.namn + ' – ' + S.stjarnor + ' stjärnor. ' +
        'Nästa nivå: ' + BANK.nivaer[S.niva].namn + '.';
      el.klartKnapp.textContent = 'Nästa nivå';
    } else {
      el.klartTitel.textContent = 'Alla nivåer klara!';
      el.klartText.textContent = 'Du har gått igenom budget, ränta och hela kedjan från hushåll ' +
        'till bank och kommun. ' + S.totalt + ' av ' + 4 * nv.uppgifter.length +
        ' stjärnor på hela rundan.';
      el.klartKnapp.textContent = 'Spela igen från nivå 1';
    }
    sattKotten('firar');
    event('round_done', 100);
    event('level', S.niva);
    blipp(660, 'triangle', 0.16); setTimeout(function () { blipp(880, 'triangle', 0.16); }, 150);
    setTimeout(function () { blipp(990, 'triangle', 0.22); }, 320);
    tala(S.niva < BANK.nivaer.length ? 'Nivå klar!' : 'Alla nivåer klara!');
  }

  function startNiva(n) {
    S.niva = n; S.index = 0; S.stjarnor = 0; S.klar = false;
    if (n === 1) S.totalt = 0;
    el.klart.hidden = true;
    el.spel.hidden = false;
    el.start.hidden = true;
    event('level', n);
    event('round_start');
    sattKotten('glad');
    visaUppgift();
    tala('Nivå ' + n + '. ' + BANK.nivaer[n - 1].namn + '. ' + BANK.nivaer[n - 1].intro);
  }
  window.__hk.startNiva = startNiva;
  window.__hk.visaUppgift = visaUppgift;
  window.__hk.nasta = nasta;
  window.__hk.geHint = geHint;

  el.play.addEventListener('click', function () { startNiva(1); });
  el.klartKnapp.addEventListener('click', function () {
    if (S.niva < BANK.nivaer.length) startNiva(S.niva + 1);
    else startNiva(1);
  });
  el.klartIgen.addEventListener('click', function () { startNiva(S.niva); });
  el.ljud.addEventListener('click', function () {
    S.ljud = !S.ljud;
    el.ljud.textContent = S.ljud ? '🔊' : '🔇';
    el.ljud.setAttribute('aria-pressed', S.ljud ? 'true' : 'false');
    el.ljud.setAttribute('aria-label', S.ljud ? 'Stäng av ljudet' : 'Sätt på ljudet');
    try { if (!S.ljud) window.__rostStop && window.__rostStop(); } catch (e) {}
    try { if (!S.ljud) window.speechSynthesis.cancel(); } catch (e) {}
    if (!S.ljud) event('sound_off');
  });
  el.kort.addEventListener('click', function (e) {
    if (S.klar && e.target.closest && !e.target.closest('.kort')) nasta();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { if (S.klar) { e.preventDefault(); nasta(); } }
  });

  el.kotten.innerHTML = kottenSvg('glad');
  document.getElementById('kottenStart').innerHTML = kottenSvg('glad');
})();