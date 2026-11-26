/* verify.cjs — oberoende kontroll av Hushållskassan.
   Läser public/data.js och räknar om varje uppgift utan att använda generate.py.
   Kör: node verify.cjs */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const PUB = path.join(__dirname, 'public');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(PUB, 'data.js'), 'utf8'), ctx);
const BANK = ctx.window.__BANK;

let fel = 0;
const kolla = (ok, text) => { if (!ok) { fel++; console.log('FEL', text); } };

const kr = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' kr';

/* Handskriven facit: rätt svar per nivå, fristående från data.js. */
const FACIT = {
  2: ['1 200 kr', '720 kr', '900 kr', '1 000 kr', '1 800 kr'],
  3: ['3 000 kr', '800 kr', 'Lån C', '7 200 kr', '1 800 kr mer'],
  4: ['Kommunen och staten', 'Banken', 'Lånar ut dem till andra',
      'Skatt från hushåll och företag', 'Det blir dyrare varje månad'],
};
const FACIT_BUDGET = [
  ['Mobil', 'Fritid'],
  ['Streaming', 'Gym'],
  ['Bio', 'Skor'],
  ['Böcker', 'Lampa'],
  ['Fika', 'Hörlurar'],
];

let antal = 0;
BANK.nivaer.forEach((nv, ni) => {
  kolla(nv.uppgifter.length === 5, `nivå ${ni + 1} har ${nv.uppgifter.length} uppgifter`);
  nv.uppgifter.forEach((u, ui) => {
    antal++;
    if (u.typ === 'budget') {
      const fasta = u.fasta.reduce((s, r) => s + r.belopp, 0);
      const saldo = u.inkomst - fasta;
      kolla(saldo === u.saldo, `nivå ${ni + 1} uppg ${ui + 1}: saldo ${u.saldo} ≠ ${saldo}`);
      kolla(saldo > 0, `nivå ${ni + 1} uppg ${ui + 1}: inget kvar`);
      const v = u.valfria;
      kolla(v.length === 3, `nivå ${ni + 1} uppg ${ui + 1}: ${v.length} valfria`);
      const par = [];
      for (let a = 0; a < v.length; a++)
        for (let b = a + 1; b < v.length; b++)
          if (v[a].belopp + v[b].belopp <= saldo) par.push([v[a].namn, v[b].namn]);
      kolla(par.length === 1, `nivå ${ni + 1} uppg ${ui + 1}: ${par.length} par ryms`);
      if (par.length === 1) {
        kolla(par[0].sort().join('|') === u.ratt.slice().sort().join('|'),
          `nivå ${ni + 1} uppg ${ui + 1}: ratt ${u.ratt} ≠ ${par[0]}`);
      }
      if (ni === 0) {
        kolla(u.ratt.slice().sort().join('|') === FACIT_BUDGET[ui].slice().sort().join('|'),
          `nivå 1 uppg ${ui + 1}: facit ${FACIT_BUDGET[ui]} ≠ ${u.ratt}`);
      }
      kolla(typeof u.forklaring === 'string' && u.forklaring.length > 40,
        `nivå ${ni + 1} uppg ${ui + 1}: förklaring saknas`);
    } else {
      const alt = [u.ratt].concat(u.fel);
      kolla(new Set(alt).size === 3, `nivå ${ni + 1} uppg ${ui + 1}: dubbletter bland svar`);
      kolla(u.fel.length === 2, `nivå ${ni + 1} uppg ${ui + 1}: ${u.fel.length} felkort`);
      kolla(u.ratt === FACIT[ni + 1][ui],
        `nivå ${ni + 1} uppg ${ui + 1}: rätt ${u.ratt} ≠ facit ${FACIT[ni + 1][ui]}`);
      kolla(u.frago || u.fraga, `nivå ${ni + 1} uppg ${ui + 1}: fråga saknas`);
      kolla(typeof u.forklaring === 'string' && u.forklaring.length > 30,
        `nivå ${ni + 1} uppg ${ui + 1}: förklaring saknas`);
    }
  });
});

/* Ränteuppgifterna räknas om från texten: belopp × ränta (× år). */
function ranta(belopp, procent, ar) {
  return Math.round(belopp * procent / 100 * ar);
}
const RAKNING = [
  [2, ranta(8000, 15, 1), '1 200 kr'],
  [2, ranta(12000, 6, 1), '720 kr'],
  [2, ranta(4500, 20, 1), '900 kr'],
  [2, ranta(25000, 4, 1), '1 000 kr'],
  [2, ranta(15000, 12, 1), '1 800 kr'],
  [3, ranta(20000, 5, 3), '3 000 kr'],
  [3, ranta(10000, 4, 2), '800 kr'],
  [3, ranta(30000, 6, 4), '7 200 kr'],
  [3, ranta(18000, 5, 3) - ranta(18000, 5, 1), '1 800 kr mer'],
];
RAKNING.forEach(([nv, tal, text]) => {
  kolla(kr(tal) === text.replace(/ kr mer$/, ' kr'), `räkning nivå ${nv}: ${kr(tal)} ≠ ${text}`);
});
/* Lånjämförelsen i nivå 3: A 800, B 900, C 600 → C billigast. */
const A = ranta(10000, 4, 2), B = ranta(10000, 3, 3), C = 600;
kolla(A === 800 && B === 900 && C < A && C < B, 'lånjämförelsen stämmer inte');

/* Rösttäckning: varje mening appen säger ska finnas som mp3-text. */
const lines = path.join(PUB, 'ljud', 'lines.js');
if (fs.existsSync(lines)) {
  const lctx = { window: {} };
  vm.createContext(lctx);
  vm.runInContext(fs.readFileSync(lines, 'utf8'), lctx);
  const ROST = lctx.window.__ROST || {};
  const sagt = ['Rätt!', 'Nästan. Prova igen.', 'För litet kvar i kassan. Prova igen.',
    'Inte riktigt. Prova ett annat kort.', 'Nivå klar!', 'Alla nivåer klara!'];
  BANK.nivaer.forEach((nv, i) => {
    sagt.push(nv.intro, 'Nivå ' + (i + 1) + '. ' + nv.namn + '. ' + nv.intro);
    nv.uppgifter.forEach((u) => { sagt.push(u.fraga); sagt.push(u.forklaring); });
  });
  const saknas = sagt.filter((t) => !ROST[t]);
  kolla(saknas.length === 0, `röster saknas (${saknas.length}): ${saknas.slice(0, 3).join(' | ')}`);
  console.log('röster i lines.js:', Object.keys(ROST).length, 'saknas:', saknas.length);
} else {
  console.log('varning: ljud/lines.js finns inte än (kör mp3.py)');
}

console.log('uppgifter kontrollerade:', antal, 'fel:', fel);
process.exit(fel ? 1 : 0);