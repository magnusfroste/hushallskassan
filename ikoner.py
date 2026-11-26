#!/usr/bin/env python3
"""ikoner.py — Hushållskassans ikon och manifest. Ritad i kod: en plånbok med ett mynt."""
from PIL import Image, ImageDraw
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.join(HERE, "public")
BLA = "#14535F"
PAPPER = "#FBF7EF"
GUL = "#E9B23C"


def ikon(size):
    s = size * 4
    im = Image.new("RGBA", (s, s), PAPPER)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0.14 * s, 0.26 * s, 0.86 * s, 0.76 * s], radius=0.10 * s, fill=BLA)
    d.rounded_rectangle([0.14 * s, 0.34 * s, 0.86 * s, 0.50 * s], radius=0.05 * s, fill="#1E6C7A")
    r = 0.19 * s
    cx, cy = 0.56 * s, 0.60 * s
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=GUL, outline=PAPPER, width=int(0.035 * s))
    d.ellipse([cx - 0.08 * s, cy - 0.08 * s, cx + 0.08 * s, cy + 0.08 * s], fill="#C99325")
    return im.resize((size, size), Image.LANCZOS)


for namn, storlek in [("favicon-48.png", 48), ("icon-192.png", 192),
                      ("icon-512.png", 512), ("apple-touch-icon.png", 180)]:
    ikon(storlek).save(os.path.join(PUB, namn))

for storlek in (192, 512):
    im = Image.new("RGBA", (int(storlek * 1.25), int(storlek * 1.25)), PAPPER)
    im.paste(ikon(storlek), (int(storlek * 0.125), int(storlek * 0.125)))
    im.save(os.path.join(PUB, "icon-maskable-%d.png" % storlek))

open(os.path.join(PUB, "favicon.svg"), "w", encoding="utf-8").write(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n'
    '<rect width="100" height="100" fill="%s"/>\n'
    '<rect x="14" y="26" width="72" height="50" rx="10" fill="%s"/>\n'
    '<rect x="14" y="34" width="72" height="16" rx="5" fill="#1E6C7A"/>\n'
    '<circle cx="56" cy="60" r="19" fill="%s" stroke="%s" stroke-width="4"/>\n'
    '<circle cx="56" cy="60" r="8" fill="#C99325"/>\n'
    '</svg>\n' % (PAPPER, BLA, PAPPER, GUL))

json.dump({
    "name": "Hushållskassan", "short_name": "Hushållskassan",
    "description": "Budget, ränta och samhällsekonomi – samhällskunskap åk 7–9.",
    "lang": "sv", "start_url": "./", "scope": "./", "display": "standalone",
    "orientation": "any", "background_color": PAPPER, "theme_color": PAPPER,
    "icons": [
        {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"},
        {"src": "icon-maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable"},
        {"src": "icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
    ],
}, open(os.path.join(PUB, "site.webmanifest"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ikoner klara")