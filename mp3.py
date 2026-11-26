#!/usr/bin/env python3
"""mp3.py — färdiga röstfiler för Procentkassan.

Läser stemmer.json (skriven av generate.py) så att varje mening appen säger
får en egen fil. Kör: python3 mp3.py
"""
import hashlib
import json
import os
import subprocess
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.join(HERE, "public")
LJUD = os.path.join(PUB, "ljud")
os.makedirs(LJUD, exist_ok=True)

VOICE = "sv-SE-SofieNeural"
RATE = "-4%"


def synth(text):
    fid = hashlib.sha1((VOICE + "|" + text).encode("utf-8")).hexdigest()[:10]
    path = os.path.join(LJUD, fid + ".mp3")
    if os.path.exists(path) and os.path.getsize(path) > 400:
        return fid
    for _ in range(4):
        p = subprocess.run(
            ["edge-tts", "--text", text, "--voice", VOICE, "--rate", RATE, "--write-media", path],
            capture_output=True, text=True, timeout=90)
        if p.returncode == 0 and os.path.exists(path) and os.path.getsize(path) > 400:
            return fid
    if os.path.exists(path):
        os.remove(path)
    return None


def main():
    lista = json.load(open(os.path.join(HERE, "stemmer.json"), encoding="utf-8"))
    lines, miss = {}, 0
    with ThreadPoolExecutor(max_workers=8) as pool:
        for i, (text, fid) in enumerate(zip(lista, pool.map(synth, lista)), 1):
            if not fid:
                miss += 1
                print("MISS", text[:70])
                continue
            lines[text] = fid
            print(f"{i}/{len(lista)}", flush=True)
    with open(os.path.join(LJUD, "lines.js"), "w", encoding="utf-8") as f:
        f.write("window.__ROST = " + json.dumps(lines, ensure_ascii=False, indent=1) + ";\n")
    src = os.path.join(HERE, "..", "tools", "rosten.js")
    open(os.path.join(LJUD, "rosten.js"), "w", encoding="utf-8").write(
        open(src, encoding="utf-8").read())
    print(f"lines: {len(lines)}  miss: {miss}")


if __name__ == "__main__":
    main()
