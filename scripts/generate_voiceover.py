#!/usr/bin/env python3
"""
Génération de la voix off via Edge TTS (Microsoft Neural).
Voice : fr-FR-DeniseNeural — ton neutre et institutionnel.

Les textes sont lus depuis src/voiceover.ts (source unique).
Pour modifier la voix off, éditez src/voiceover.ts sur GitHub
puis relancez le workflow Actions.

Usage : python3 scripts/generate_voiceover.py
"""
import asyncio
import os
import re
import pathlib
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "fr-FR-DeniseNeural"

# ── Lecture des textes depuis src/voiceover.ts ──────────────────────────────
_ts_path = pathlib.Path(__file__).parent.parent / "src" / "voiceover.ts"
_ts      = _ts_path.read_text(encoding="utf-8")

SCRIPTS: dict[str, str] = {}
for m in re.finditer(r'(vo_\w+):\s*\n?((?:\s*"[^"]*"\s*\+?\s*\n?)+)', _ts):
    key  = m.group(1)
    text = " ".join(re.findall(r'"([^"]*)"', m.group(2)))
    # normalise les espaces multiples
    SCRIPTS[key] = re.sub(r"  +", " ", text).strip()

if not SCRIPTS:
    raise RuntimeError("Aucun texte trouvé dans src/voiceover.ts — vérifiez la syntaxe.")

print(f"Scènes trouvées : {list(SCRIPTS.keys())}")
# ────────────────────────────────────────────────────────────────────────────


async def generate(name: str, text: str) -> None:
    out = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE, rate="-5%", volume="+0%")
    await communicate.save(out)
    print(f"  ✓ {name}.mp3")


async def main() -> None:
    print(f"Génération de la voix off ({VOICE})…")
    await asyncio.gather(*[generate(n, t) for n, t in SCRIPTS.items()])
    print("Terminé.")


if __name__ == "__main__":
    asyncio.run(main())
