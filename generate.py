#!/usr/bin/env python3
"""generate.py — Hushållskassan. Bygger public/data.js och stemmer.json.

Två nivåtyper:
  budget  — inkomst och fasta utgifter givna; välj de TVÅ valfria poster som får plats.
  val     — tre svarskort, ett rätt (ränta, totalkostnad, eller vem som får pengarna).

Varje uppgift kontrolleras här (exakt en lösning) och oberoende i verify.cjs.
"""
import json, os, itertools

HERE = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.join(HERE, "public")

kr = lambda n: "{:,}".format(n).replace(",", " ") + " kr"


def budget(inkomst, fasta, valfria, forklaring):
    saldo = inkomst - sum(b for _, b in fasta)
    par = [(a, b) for a, b in itertools.combinations(valfria, 2)]
    ok = [(a, b) for a, b in par if a[1] + b[1] <= saldo]
    assert len(ok) == 1, (inkomst, fasta, valfria, saldo, ok)
    ratt = [x[0] for x in ok[0]]
    return {
        "typ": "budget",
        "inkomst": inkomst,
        "fasta": [{"namn": n, "belopp": b} for n, b in fasta],
        "valfria": [{"namn": n, "belopp": b} for n, b in valfria],
        "saldo": saldo,
        "ratt": ratt,
        "fraga": "Välj två poster som får plats.",
        "forklaring": forklaring,
    }


def val(fraga, ratt, fel, forklaring, enhet=None):
    assert len(fel) == 2 and ratt not in fel
    return {"typ": "val", "fraga": fraga, "ratt": ratt, "fel": fel,
            "forklaring": forklaring, "enhet": enhet}


N1 = [
    budget(12_000,
           [("Hyra", 6_200), ("Mat", 2_400), ("Busskort", 620)],
           [("Mobil", 249), ("Fritid", 450), ("Kläder", 2_600)],
           "Efter hyra, mat och busskort finns 2 780 kr kvar. Mobil och fritid kostar 699 kr "
           "tillsammans och får plats. Kläderna för 2 600 kr ryms bara tillsammans med en "
           "av de andra – och då går det inte ihop."),
    budget(9_500,
           [("Hyra", 4_900), ("Mat", 1_800), ("El", 480)],
           [("Streaming", 179), ("Gym", 350), ("Present", 2_400)],
           "Kvar efter de fasta utgifterna är 2 320 kr. Streaming och gym kostar 529 kr ihop. "
           "Presenten för 2 400 kr är dyrare än hela summan som är kvar."),
    budget(15_000,
           [("Hyra", 7_400), ("Mat", 2_600), ("Busskort", 620), ("Försäkring", 380)],
           [("Ny cykel", 3_900), ("Bio", 300), ("Skor", 1_150)],
           "Fyra fasta poster lämnar 4 000 kr. Bio och skor kostar 1 450 kr ihop och får plats. "
           "Cykeln för 3 900 kr går inte ihop med någon av de andra."),
    budget(11_200,
           [("Hyra", 5_600), ("Mat", 2_100), ("Mobil", 249), ("Busskort", 620)],
           [("Träningskort", 2_900), ("Böcker", 320), ("Lampa", 780)],
           "Kvar är 2 631 kr. Böcker och lampa kostar 1 100 kr tillsammans. Träningskortet för "
           "2 900 kr är dyrare än allt som är kvar."),
    budget(8_400,
           [("Hyra", 3_900), ("Mat", 1_700), ("Busskort", 620)],
           [("Fika", 240), ("Hörlurar", 690), ("Jacka", 2_100)],
           "Kvar är 2 180 kr. Fika och hörlurar kostar 930 kr ihop. Jackan för 2 100 kr är "
           "dyrare än det som är kvar."),
]

N2 = [
    val("Du lånar 8 000 kr till 15 % ränta i ett år. Vad kostar räntan?",
        "1 200 kr", ["120 kr", "12 000 kr"],
        "15 % av 8 000 kr är 0,15 × 8 000 = 1 200 kr. Räntan är priset för att låna någon annans pengar."),
    val("Du lånar 12 000 kr till 6 % ränta i ett år. Vad kostar räntan?",
        "720 kr", ["72 kr", "7 200 kr"],
        "6 % av 12 000 kr är 0,06 × 12 000 = 720 kr."),
    val("Ett snabblån på 4 500 kr kostar 20 % ränta i ett år. Vad kostar räntan?",
        "900 kr", ["90 kr", "9 000 kr"],
        "20 % av 4 500 kr är 0,20 × 4 500 = 900 kr. Snabblån har hög ränta just för att de är lätta att få."),
    val("Du lånar 25 000 kr till 4 % ränta i ett år. Vad kostar räntan?",
        "1 000 kr", ["100 kr", "10 000 kr"],
        "4 % av 25 000 kr är 0,04 × 25 000 = 1 000 kr. Låg ränta på ett stort lån kan ändå bli mycket pengar."),
    val("Du lånar 15 000 kr till 12 % ränta i ett år. Vad kostar räntan?",
        "1 800 kr", ["180 kr", "18 000 kr"],
        "12 % av 15 000 kr är 0,12 × 15 000 = 1 800 kr."),
]

N3 = [
    val("Ett lån på 20 000 kr har 5 % ränta per år. Du behåller lånet i 3 år. Vad kostar räntan sammanlagt?",
        "3 000 kr", ["1 000 kr", "6 000 kr"],
        "Räntan per år är 5 % av 20 000 = 1 000 kr. Tre år ger 3 × 1 000 = 3 000 kr."),
    val("Ett lån på 10 000 kr har 4 % ränta per år i 2 år. Vad kostar räntan sammanlagt?",
        "800 kr", ["400 kr", "8 000 kr"],
        "Räntan per år är 400 kr. Två år ger 800 kr."),
    val("Tre lån på 10 000 kr: A har 4 % i 2 år, B har 3 % i 3 år, C har 6 % i 1 år. Vilket lån är billigast sammanlagt?",
        "Lån C", ["Lån A", "Lån B"],
        "A kostar 800 kr, B kostar 900 kr och C kostar 600 kr. Kort tid slår hög ränta här – men bara för att lånet är litet."),
    val("Ett lån på 30 000 kr har 6 % ränta per år i 4 år. Vad kostar räntan sammanlagt?",
        "7 200 kr", ["1 800 kr", "72 000 kr"],
        "Räntan per år är 1 800 kr. Fyra år ger 7 200 kr – nästan en fjärdedel av lånet."),
    val("Ett lån på 18 000 kr har 5 % ränta per år. Du väljer mellan att betala tillbaka på 1 år eller 3 år. Hur mycket mer ränta kostar 3 år?",
        "1 800 kr mer", ["900 kr mer", "5 400 kr mer"],
        "Räntan per år är 900 kr. Ett år ger 900 kr, tre år ger 2 700 kr. Skillnaden är 1 800 kr."),
]

N4 = [
    val("En familj betalar skatt varje månad. Vem får pengarna?",
        "Kommunen och staten", ["Banken", "Grannarna"],
        "Skatt går till kommunen och staten. De betalar till exempel skola, sjukvård och vägar – det är det offentligas ekonomi."),
    val("Ett företag lånar pengar i banken för att köpa en ny maskin. Vem får räntan?",
        "Banken", ["Kommunen", "De anställda"],
        "Banken lånar ut och tar ränta. Räntan är bankens inkomst och företagets kostnad."),
    val("Ett hushåll sparar 500 kr i månaden på banken. Vad gör banken med pengarna?",
        "Lånar ut dem till andra", ["Lägger dem i ett kassaskåp", "Skickar dem till staten"],
        "Banken lånar ut sparpengarna till andra hushåll och företag och tar ränta – det är så bankens ekonomi hänger ihop med din."),
    val("Kommunen bygger en ny skola. Var kommer pengarna ifrån?",
        "Skatt från hushåll och företag", ["Ränta från banken", "Biljetter från eleverna"],
        "Skola betalas med skattemedel. Hushåll och företag betalar skatt, kommunen betalar löner och byggen."),
    val("Banken höjer räntan på lån. Vad betyder det för ett hushåll som redan har ett lån?",
        "Det blir dyrare varje månad", ["Lånet försvinner", "Hushållet får betalt av banken"],
        "Höjd ränta gör lånet dyrare. Samma sak gäller företag – därför påverkar räntan hela samhällsekonomin."),
]

NIVAER = [
    {"namn": "Mellan två poster", "typ": "budget", "uppgifter": N1,
     "intro": "Så mycket har du in. Välj två saker du har råd med."},
    {"namn": "Räntan på lånet", "typ": "val", "uppgifter": N2,
     "intro": "Räntan är priset för att låna. Räkna ut vad den kostar."},
    {"namn": "Ränta över tid", "typ": "val", "uppgifter": N3,
     "intro": "Lånar du längre betalar du ränta flera gånger."},
    {"namn": "Vems pengar?", "typ": "val", "uppgifter": N4,
     "intro": "Hushåll, företag, bank och kommun – pengarna går runt."},
]

# ---------- röstrader ----------
def rost():
    rader = ["Välj två poster som får plats i kassan.",
             "Rätt!", "Nästan. Prova igen.", "För litet kvar i kassan. Prova igen.",
             "Inte riktigt. Prova ett annat kort.",
             "Tryck på ett svar.", "Rätt!", "Nästan. Prova igen.",
             "Kvar i kassan: ", "För litet kvar i kassan.",
             "Nivå 1: Mellan två poster", "Nivå 2: Räntan på lånet",
             "Nivå 3: Ränta över tid", "Nivå 4: Vems pengar?",
             "Alla nivåer klara!", "Nivå klar!", "Bra jobbat!"]
    for i, n in enumerate(NIVAER, 1):
        rader.append(n["intro"])
        rader.append("Nivå %d. %s. %s" % (i, n["namn"], n["intro"]))
        for u in n["uppgifter"]:
            rader.append(u["fraga"])
            rader.append(u["forklaring"])
            if u["typ"] == "val":
                rader.append(u["ratt"])
                rader.extend(u["fel"])
    return list(dict.fromkeys(rader))


if __name__ == "__main__":
    data = {"nivaer": NIVAER}
    with open(os.path.join(PUB, "data.js"), "w", encoding="utf-8") as f:
        f.write("window.__BANK = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
    with open(os.path.join(HERE, "stemmer.json"), "w", encoding="utf-8") as f:
        json.dump(rost(), f, ensure_ascii=False, indent=1)
    print("uppgifter:", [len(n["uppgifter"]) for n in NIVAER], "röster:", len(rost()))