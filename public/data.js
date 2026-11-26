window.__BANK = {
 "nivaer": [
  {
   "namn": "Mellan två poster",
   "typ": "budget",
   "uppgifter": [
    {
     "typ": "budget",
     "inkomst": 12000,
     "fasta": [
      {
       "namn": "Hyra",
       "belopp": 6200
      },
      {
       "namn": "Mat",
       "belopp": 2400
      },
      {
       "namn": "Busskort",
       "belopp": 620
      }
     ],
     "valfria": [
      {
       "namn": "Mobil",
       "belopp": 249
      },
      {
       "namn": "Fritid",
       "belopp": 450
      },
      {
       "namn": "Kläder",
       "belopp": 2600
      }
     ],
     "saldo": 2780,
     "ratt": [
      "Mobil",
      "Fritid"
     ],
     "fraga": "Välj två poster som får plats.",
     "forklaring": "Efter hyra, mat och busskort finns 2 780 kr kvar. Mobil och fritid kostar 699 kr tillsammans och får plats. Kläderna för 2 600 kr ryms bara tillsammans med en av de andra – och då går det inte ihop."
    },
    {
     "typ": "budget",
     "inkomst": 9500,
     "fasta": [
      {
       "namn": "Hyra",
       "belopp": 4900
      },
      {
       "namn": "Mat",
       "belopp": 1800
      },
      {
       "namn": "El",
       "belopp": 480
      }
     ],
     "valfria": [
      {
       "namn": "Streaming",
       "belopp": 179
      },
      {
       "namn": "Gym",
       "belopp": 350
      },
      {
       "namn": "Present",
       "belopp": 2400
      }
     ],
     "saldo": 2320,
     "ratt": [
      "Streaming",
      "Gym"
     ],
     "fraga": "Välj två poster som får plats.",
     "forklaring": "Kvar efter de fasta utgifterna är 2 320 kr. Streaming och gym kostar 529 kr ihop. Presenten för 2 400 kr är dyrare än hela summan som är kvar."
    },
    {
     "typ": "budget",
     "inkomst": 15000,
     "fasta": [
      {
       "namn": "Hyra",
       "belopp": 7400
      },
      {
       "namn": "Mat",
       "belopp": 2600
      },
      {
       "namn": "Busskort",
       "belopp": 620
      },
      {
       "namn": "Försäkring",
       "belopp": 380
      }
     ],
     "valfria": [
      {
       "namn": "Ny cykel",
       "belopp": 3900
      },
      {
       "namn": "Bio",
       "belopp": 300
      },
      {
       "namn": "Skor",
       "belopp": 1150
      }
     ],
     "saldo": 4000,
     "ratt": [
      "Bio",
      "Skor"
     ],
     "fraga": "Välj två poster som får plats.",
     "forklaring": "Fyra fasta poster lämnar 4 000 kr. Bio och skor kostar 1 450 kr ihop och får plats. Cykeln för 3 900 kr går inte ihop med någon av de andra."
    },
    {
     "typ": "budget",
     "inkomst": 11200,
     "fasta": [
      {
       "namn": "Hyra",
       "belopp": 5600
      },
      {
       "namn": "Mat",
       "belopp": 2100
      },
      {
       "namn": "Mobil",
       "belopp": 249
      },
      {
       "namn": "Busskort",
       "belopp": 620
      }
     ],
     "valfria": [
      {
       "namn": "Träningskort",
       "belopp": 2900
      },
      {
       "namn": "Böcker",
       "belopp": 320
      },
      {
       "namn": "Lampa",
       "belopp": 780
      }
     ],
     "saldo": 2631,
     "ratt": [
      "Böcker",
      "Lampa"
     ],
     "fraga": "Välj två poster som får plats.",
     "forklaring": "Kvar är 2 631 kr. Böcker och lampa kostar 1 100 kr tillsammans. Träningskortet för 2 900 kr är dyrare än allt som är kvar."
    },
    {
     "typ": "budget",
     "inkomst": 8400,
     "fasta": [
      {
       "namn": "Hyra",
       "belopp": 3900
      },
      {
       "namn": "Mat",
       "belopp": 1700
      },
      {
       "namn": "Busskort",
       "belopp": 620
      }
     ],
     "valfria": [
      {
       "namn": "Fika",
       "belopp": 240
      },
      {
       "namn": "Hörlurar",
       "belopp": 690
      },
      {
       "namn": "Jacka",
       "belopp": 2100
      }
     ],
     "saldo": 2180,
     "ratt": [
      "Fika",
      "Hörlurar"
     ],
     "fraga": "Välj två poster som får plats.",
     "forklaring": "Kvar är 2 180 kr. Fika och hörlurar kostar 930 kr ihop. Jackan för 2 100 kr är dyrare än det som är kvar."
    }
   ],
   "intro": "Så mycket har du in. Välj två saker du har råd med."
  },
  {
   "namn": "Räntan på lånet",
   "typ": "val",
   "uppgifter": [
    {
     "typ": "val",
     "fraga": "Du lånar 8 000 kr till 15 % ränta i ett år. Vad kostar räntan?",
     "ratt": "1 200 kr",
     "fel": [
      "120 kr",
      "12 000 kr"
     ],
     "forklaring": "15 % av 8 000 kr är 0,15 × 8 000 = 1 200 kr. Räntan är priset för att låna någon annans pengar.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Du lånar 12 000 kr till 6 % ränta i ett år. Vad kostar räntan?",
     "ratt": "720 kr",
     "fel": [
      "72 kr",
      "7 200 kr"
     ],
     "forklaring": "6 % av 12 000 kr är 0,06 × 12 000 = 720 kr.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Ett snabblån på 4 500 kr kostar 20 % ränta i ett år. Vad kostar räntan?",
     "ratt": "900 kr",
     "fel": [
      "90 kr",
      "9 000 kr"
     ],
     "forklaring": "20 % av 4 500 kr är 0,20 × 4 500 = 900 kr. Snabblån har hög ränta just för att de är lätta att få.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Du lånar 25 000 kr till 4 % ränta i ett år. Vad kostar räntan?",
     "ratt": "1 000 kr",
     "fel": [
      "100 kr",
      "10 000 kr"
     ],
     "forklaring": "4 % av 25 000 kr är 0,04 × 25 000 = 1 000 kr. Låg ränta på ett stort lån kan ändå bli mycket pengar.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Du lånar 15 000 kr till 12 % ränta i ett år. Vad kostar räntan?",
     "ratt": "1 800 kr",
     "fel": [
      "180 kr",
      "18 000 kr"
     ],
     "forklaring": "12 % av 15 000 kr är 0,12 × 15 000 = 1 800 kr.",
     "enhet": null
    }
   ],
   "intro": "Räntan är priset för att låna. Räkna ut vad den kostar."
  },
  {
   "namn": "Ränta över tid",
   "typ": "val",
   "uppgifter": [
    {
     "typ": "val",
     "fraga": "Ett lån på 20 000 kr har 5 % ränta per år. Du behåller lånet i 3 år. Vad kostar räntan sammanlagt?",
     "ratt": "3 000 kr",
     "fel": [
      "1 000 kr",
      "6 000 kr"
     ],
     "forklaring": "Räntan per år är 5 % av 20 000 = 1 000 kr. Tre år ger 3 × 1 000 = 3 000 kr.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Ett lån på 10 000 kr har 4 % ränta per år i 2 år. Vad kostar räntan sammanlagt?",
     "ratt": "800 kr",
     "fel": [
      "400 kr",
      "8 000 kr"
     ],
     "forklaring": "Räntan per år är 400 kr. Två år ger 800 kr.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Tre lån på 10 000 kr: A har 4 % i 2 år, B har 3 % i 3 år, C har 6 % i 1 år. Vilket lån är billigast sammanlagt?",
     "ratt": "Lån C",
     "fel": [
      "Lån A",
      "Lån B"
     ],
     "forklaring": "A kostar 800 kr, B kostar 900 kr och C kostar 600 kr. Kort tid slår hög ränta här – men bara för att lånet är litet.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Ett lån på 30 000 kr har 6 % ränta per år i 4 år. Vad kostar räntan sammanlagt?",
     "ratt": "7 200 kr",
     "fel": [
      "1 800 kr",
      "72 000 kr"
     ],
     "forklaring": "Räntan per år är 1 800 kr. Fyra år ger 7 200 kr – nästan en fjärdedel av lånet.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Ett lån på 18 000 kr har 5 % ränta per år. Du väljer mellan att betala tillbaka på 1 år eller 3 år. Hur mycket mer ränta kostar 3 år?",
     "ratt": "1 800 kr mer",
     "fel": [
      "900 kr mer",
      "5 400 kr mer"
     ],
     "forklaring": "Räntan per år är 900 kr. Ett år ger 900 kr, tre år ger 2 700 kr. Skillnaden är 1 800 kr.",
     "enhet": null
    }
   ],
   "intro": "Lånar du längre betalar du ränta flera gånger."
  },
  {
   "namn": "Vems pengar?",
   "typ": "val",
   "uppgifter": [
    {
     "typ": "val",
     "fraga": "En familj betalar skatt varje månad. Vem får pengarna?",
     "ratt": "Kommunen och staten",
     "fel": [
      "Banken",
      "Grannarna"
     ],
     "forklaring": "Skatt går till kommunen och staten. De betalar till exempel skola, sjukvård och vägar – det är det offentligas ekonomi.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Ett företag lånar pengar i banken för att köpa en ny maskin. Vem får räntan?",
     "ratt": "Banken",
     "fel": [
      "Kommunen",
      "De anställda"
     ],
     "forklaring": "Banken lånar ut och tar ränta. Räntan är bankens inkomst och företagets kostnad.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Ett hushåll sparar 500 kr i månaden på banken. Vad gör banken med pengarna?",
     "ratt": "Lånar ut dem till andra",
     "fel": [
      "Lägger dem i ett kassaskåp",
      "Skickar dem till staten"
     ],
     "forklaring": "Banken lånar ut sparpengarna till andra hushåll och företag och tar ränta – det är så bankens ekonomi hänger ihop med din.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Kommunen bygger en ny skola. Var kommer pengarna ifrån?",
     "ratt": "Skatt från hushåll och företag",
     "fel": [
      "Ränta från banken",
      "Biljetter från eleverna"
     ],
     "forklaring": "Skola betalas med skattemedel. Hushåll och företag betalar skatt, kommunen betalar löner och byggen.",
     "enhet": null
    },
    {
     "typ": "val",
     "fraga": "Banken höjer räntan på lån. Vad betyder det för ett hushåll som redan har ett lån?",
     "ratt": "Det blir dyrare varje månad",
     "fel": [
      "Lånet försvinner",
      "Hushållet får betalt av banken"
     ],
     "forklaring": "Höjd ränta gör lånet dyrare. Samma sak gäller företag – därför påverkar räntan hela samhällsekonomin.",
     "enhet": null
    }
   ],
   "intro": "Hushåll, företag, bank och kommun – pengarna går runt."
  }
 ]
};
