#!/usr/bin/env python3
"""
Génération de la voix off via Edge TTS (Microsoft Neural).
Voice : fr-FR-DeniseNeural — ton neutre et institutionnel.
Usage : python3 scripts/generate_voiceover.py
"""
import asyncio
import os
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "fr-FR-DeniseNeural"

SCRIPTS = {
    "vo_title": (
        "En 2023, la Nouvelle-Aquitaine compte 56 552 exploitations agricoles. "
        "L'enquête sur la structure des exploitations, publiée par Agreste, confirme "
        "la poursuite des tendances observées depuis 2010."
    ),
    "vo_farmcount": (
        "Le nombre de fermes recule de 12 % en trois ans, à un rythme similaire au niveau national. "
        "Ce recul affecte avant tout les micro-exploitations, dont le nombre baisse de près de 11 % par an "
        "entre 2020 et 2023. Cette accélération est liée aux nouvelles conditions d'attribution des aides "
        "de la politique agricole commune. "
        "Les grandes exploitations, quant à elles, maintiennent leurs effectifs."
    ),
    "vo_land": (
        "Malgré la baisse du nombre de fermes, la surface agricole utile régionale se maintient "
        "à 3,9 millions d'hectares. "
        "La surface moyenne par exploitation progresse de 60 à 68 hectares, "
        "confirmant le mouvement d'agrandissement. "
        "Les exploitations s'appuient de plus en plus sur des travailleurs extérieurs "
        "et sur des prestataires de services."
    ),
    "vo_livestock": (
        "L'élevage connaît un recul marqué. "
        "Mesuré en unités de gros bétail, le cheptel régional diminue de 4,2 % entre 2020 et 2023. "
        "La part des exploitations spécialisées en élevage passe de 38 à 34,9 %. "
        "Les élevages bovins mixtes enregistrent la baisse la plus forte, "
        "tandis que les grandes cultures reculent de 8 % depuis 2020."
    ),
    "vo_micro": (
        "En 2023, les micro-exploitations représentent 23 % des exploitations régionales, "
        "contre 29 % en 2020. "
        "Avec une superficie moyenne de 14 hectares, elles couvrent 5 % de la surface agricole. "
        "Leurs dirigeants sont en moyenne âgés de 57 ans et souvent pluriactifs. "
        "42 % de ces exploitations sont dirigées par des femmes, "
        "soit une proportion nettement supérieure à la moyenne régionale."
    ),
    "vo_conclusion": (
        "La Nouvelle-Aquitaine agricole se restructure : moins de fermes, mais plus grandes, "
        "avec un recul persistant de l'élevage et une transformation profonde des micro-exploitations. "
        "Source : Agreste, enquête sur la structure des exploitations agricoles 2023."
    ),
}


async def generate(name: str, text: str) -> None:
    out = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE, rate="-5%", volume="+0%")
    await communicate.save(out)
    print(f"  ✓ {name}.mp3")


async def main() -> None:
    print(f"Génération de la voix off ({VOICE})…")
    tasks = [generate(name, text) for name, text in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("Terminé.")


if __name__ == "__main__":
    asyncio.run(main())
