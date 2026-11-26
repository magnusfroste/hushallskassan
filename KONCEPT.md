# Hushållskassan

**Mål (en sak):** eleven ska förstå hur en månadskassa hänger ihop och vad ett lån kostar –
hushållets, bankens, företagets och kommunens ekonomi i samma lilla spel.

**Målgrupp:** samhällskunskap åk 7–9 (13–15 år).

**Kärnmekanik (touch först):**
- Nivå 1 *Mellan två poster*: inkomst och fasta utgifter står i en kassabok, tre valfria poster
  ligger som kort. Eleven trycker på två kort; exakt ett par ryms. Fel par kostar ingen stjärna.
- Nivå 2 *Räntan på lånet*: ett lån, en räntesats, tre svarskort.
- Nivå 3 *Ränta över tid*: ränta över flera år och jämförelse av tre lån.
- Nivå 4 *Vems pengar?*: skatt, lån, sparande och räntehöjning – vem får pengarna och vad händer.

**5-minuterssession:** fyra nivåer × fem uppgifter, cirka 20 uppgifter. Ingen klocka, inga liv.

**Belöning barnet kan berätta om:** "Jag fick 2 780 kr att räcka till mobil och fritid, och jag
räknade ut att snabblånet kostade 900 kr i ränta."

**Vad barnet lär:** budget som summa av inkomst minus utgifter, ränta = belopp × räntesats × tid,
och att hushåll, företag, bank och kommun är samma pengar som går runt.

**Lgr22:** SH.7-9.2.1 – ”Hur hushållens, företagens, bankernas och det offentligas ekonomi hänger
samman. Orsaker till förändringar i samhällsekonomin och vilka effekter de kan få.”

**Varför iPad:** allt ryms på en skärm utan scroll, korten är 190 px höga på iPad och 88 px på
telefon (≥ 44 px-kravet med god marginal), ingen text att läsa i HUD:en, allt som sägs står också
skrivet.

## Testplan (mätbara krav)

1. `node verify.cjs`: 20 uppgifter, exakt ett par ryms i varje budget, rätt svar mot handskriven
   facit, räkning omräknad från texten, alla 100 röstfraser finns som mp3.
2. `scrollHeight - innerHeight == 0` och `scrollWidth - innerWidth == 0` i 1024×768, 768×1024,
   390×844, 1440×900 efter att startskärmen stängts.
3. Hela rundan (20 uppgifter, fyra nivåer) spelas med riktiga klick/touch; stjärnor och
   nivåövergångar kontrolleras.
4. Felvägen: fel par → "Det blir 3 050 kr och du har bara 2 780 kr kvar", ingen stjärna; två fel
   → rätt kort pulserar.
5. mp3: `performance.getEntriesByType('resource')` filtrerad på `\.mp3` ska ge ≥ 3 anrop under en
   uppgift (bevis på att rösten spelas från fil, inte bara att filen svarar 200).

## Utfall av testningen

- `verify.cjs`: 20 uppgifter, 0 fel, 100/100 röster.
- Layout: 0 px scroll i alla fyra storlekar; inget kort klipper sin text.
- Hela rundan: nivå 1–4, 20/20 uppgifter rätt, 5 stjärnor per nivå, "Alla nivåer klara!".
  På driftsatt URL spelades nivå 1 med `Input.dispatchTouchEvent` (touchStart/touchEnd), 1 stjärna,
  4 mp3-uppspelningar.
- Felvägen prövad: dyraste kortet + ett till gav felmeddelande med uträkning, 0 stjärnor.

## Avvikelser (ärligt)

- `delegate_task` fanns inte i den här körningen, så den externa go/no-go-granskningen gjordes
  inte; konceptet validerades i stället mot kunskapskravet (SH.7-9.2.1) och mot att kemi/matte
  redan är tätast i katalogen medan Samhälle × 7–9 bara har två appar.
- Stjärnor räknas per nivå (max 5) och totalt 20 på hela rundan; inget sparas mellan besök.