import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { TitleScene }      from './scenes/TitleScene';
import { FarmCountScene }  from './scenes/FarmCountScene';
import { LandScene }       from './scenes/LandScene';
import { LivestockScene }  from './scenes/LivestockScene';
import { MicroFarmsScene } from './scenes/MicroFarmsScene';
import { ConclusionScene } from './scenes/ConclusionScene';
import { OutroScene }      from './scenes/OutroScene';
import { theme }           from './theme';
import { SCENE_DURATIONS, OUTRO_DUR } from './generatedTimings';

const FPS = theme.fps;
const s   = (sec: number) => Math.round(sec * FPS);

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&family=DM+Sans:wght@400;500;700;800&display=swap');
`;

// ── Définition des scènes (ordre + association audio) ────────────────────────
// La durée de chaque scène est lue depuis generatedTimings.ts,
// qui est (ré)écrit par le script TTS avant chaque rendu CI.
const SCENE_DEFS = [
  { key: 'title',      dur: SCENE_DURATIONS.title,      Scene: TitleScene,      audio: 'audio/vo_title.mp3'      },
  { key: 'farmCount',  dur: SCENE_DURATIONS.farmCount,  Scene: FarmCountScene,  audio: 'audio/vo_farmcount.mp3'  },
  { key: 'land',       dur: SCENE_DURATIONS.land,       Scene: LandScene,       audio: 'audio/vo_land.mp3'       },
  { key: 'livestock',  dur: SCENE_DURATIONS.livestock,  Scene: LivestockScene,  audio: 'audio/vo_livestock.mp3'  },
  { key: 'micro',      dur: SCENE_DURATIONS.micro,      Scene: MicroFarmsScene, audio: 'audio/vo_micro.mp3'      },
  { key: 'conclusion', dur: SCENE_DURATIONS.conclusion, Scene: ConclusionScene, audio: 'audio/vo_conclusion.mp3' },
];

// Calcul des starts en cascade depuis les durées réelles
let cursor = 0;
const SCENES = SCENE_DEFS.map((def) => {
  const start = cursor;
  cursor += def.dur;
  return { ...def, start };
});
const OUTRO_START = cursor;

// ────────────────────────────────────────────────────────────────────────────

export const VideoESEA: React.FC = () => (
  <AbsoluteFill style={{ background: theme.colors.white }}>
    <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />

    {/* Scènes visuelles */}
    {SCENES.map(({ key, start, dur, Scene }) => (
      <Sequence key={key} from={s(start)} durationInFrames={s(dur)}>
        <Scene />
      </Sequence>
    ))}

    {/* Voix off — chaque piste calée exactement sur sa scène */}
    {SCENES.map(({ key, start, dur, audio }) => (
      <Sequence key={`audio-${key}`} from={s(start)} durationInFrames={s(dur)}>
        <Audio src={staticFile(audio)} volume={1} />
      </Sequence>
    ))}

    {/* Outro Ministère */}
    <Sequence from={s(OUTRO_START)} durationInFrames={s(OUTRO_DUR)}>
      <OutroScene />
    </Sequence>
  </AbsoluteFill>
);
