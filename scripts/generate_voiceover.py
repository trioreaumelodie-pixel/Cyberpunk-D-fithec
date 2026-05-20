#!/usr/bin/env python3
"""
Génération de la voix off + calcul automatique des timings.

1. Génère les MP3 via Edge TTS (fr-FR-DeniseNeural)
2. Mesure la durée exacte de chaque fichier
3. Ajoute un silence de queue (TAIL_PAD secondes)
4. Écrit src/generatedTimings.ts — lu par Remotion au rendu

Les textes sont dans src/voiceover.ts (source unique).
"""
import asyncio
import json
import os
import re
import pathlib
import subprocess
import edge_tts

ROOT       = pathlib.Path(__file__).parent.parent
OUTPUT_DIR = ROOT / "public" / "audio"
TIMINGS_TS = ROOT / "src" / "generatedTimings.ts"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

VOICE    = "fr-FR-DeniseNeural"
TAIL_PAD = 0.8   # secondes de silence après la fin de la voix
OUTRO    = 5.0   # durée fixe de l'outro (secondes)

# ── Lecture des textes depuis src/voiceover.ts ──────────────────────────────
_ts = (ROOT / "src" / "voiceover.ts").read_text(encoding="utf-8")
SCRIPTS: dict[str, str] = {}
for m in re.finditer(r'(vo_\w+):\s*\n?((?:\s*"[^"]*"\s*\+?\s*\n?)+)', _ts):
    key  = m.group(1)
    text = " ".join(re.findall(r'"([^"]*)"', m.group(2)))
    SCRIPTS[key] = re.sub(r"  +", " ", text).strip()

if not SCRIPTS:
    raise RuntimeError("Aucun texte trouvé dans src/voiceover.ts")

print(f"Scènes : {list(SCRIPTS.keys())}")

# ── Génération TTS ───────────────────────────────────────────────────────────
async def generate(name: str, text: str) -> None:
    out = OUTPUT_DIR / f"{name}.mp3"
    comm = edge_tts.Communicate(text, VOICE, rate="-5%")
    await comm.save(str(out))
    print(f"  ✓ {name}.mp3")

async def generate_all() -> None:
    print(f"\nGénération audio ({VOICE})…")
    await asyncio.gather(*[generate(n, t) for n, t in SCRIPTS.items()])

asyncio.run(generate_all())

# ── Mesure des durées via ffprobe ────────────────────────────────────────────
def get_duration(path: pathlib.Path) -> float:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "json", str(path)],
        capture_output=True, text=True, check=True
    )
    return float(json.loads(result.stdout)["format"]["duration"])

print("\nMesure des durées…")
durations: dict[str, float] = {}
for name in SCRIPTS:
    raw = get_duration(OUTPUT_DIR / f"{name}.mp3")
    padded = round(raw + TAIL_PAD, 3)
    durations[name] = padded
    print(f"  {name}: {raw:.2f}s + {TAIL_PAD}s pad = {padded:.2f}s")

# ── Écriture de src/generatedTimings.ts ─────────────────────────────────────
# Les clés TS correspondent aux clés Python vo_title → title, etc.
def ts_key(k: str) -> str:
    # vo_farm_count → farmCount
    parts = k[3:].split("_")   # strip "vo_"
    return parts[0] + "".join(p.capitalize() for p in parts[1:])

total = sum(durations.values()) + OUTRO

lines = [
    "// AUTO-GÉNÉRÉ par scripts/generate_voiceover.py — ne pas éditer",
    "// Durées en secondes = durée audio réelle + marge de queue",
    "",
    "export const SCENE_DURATIONS: Record<string, number> = {",
]
for k, v in durations.items():
    lines.append(f"  {ts_key(k):12s}: {v},")
lines += [
    "};",
    "",
    f"export const OUTRO_DUR = {OUTRO};",
    f"export const TOTAL_S   = {round(total, 3)};",
    "",
]
TIMINGS_TS.write_text("\n".join(lines), encoding="utf-8")
print(f"\n✓ {TIMINGS_TS.relative_to(ROOT)} écrit  (total : {round(total, 1)}s)")
