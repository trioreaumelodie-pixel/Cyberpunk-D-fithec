import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { TitleScene }      from './scenes/TitleScene';
import { FarmCountScene }  from './scenes/FarmCountScene';
import { LandScene }       from './scenes/LandScene';
import { LivestockScene }  from './scenes/LivestockScene';
import { MicroFarmsScene } from './scenes/MicroFarmsScene';
import { ConclusionScene } from './scenes/ConclusionScene';
import { OutroScene }      from './scenes/OutroScene';
import { TIMINGS, theme }  from './theme';

const FPS = theme.fps;
const s = (sec: number) => Math.round(sec * FPS);

// Chargement des polices Google Fonts via CSS injecté
const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&family=DM+Sans:wght@400;500;700;800&display=swap');
`;

const scenes = [
  { key: 'title',      start: s(TIMINGS.title.start),      dur: s(TIMINGS.title.dur),      Scene: TitleScene },
  { key: 'farmCount',  start: s(TIMINGS.farmCount.start),  dur: s(TIMINGS.farmCount.dur),  Scene: FarmCountScene },
  { key: 'land',       start: s(TIMINGS.land.start),       dur: s(TIMINGS.land.dur),       Scene: LandScene },
  { key: 'livestock',  start: s(TIMINGS.livestock.start),  dur: s(TIMINGS.livestock.dur),  Scene: LivestockScene },
  { key: 'micro',      start: s(TIMINGS.micro.start),      dur: s(TIMINGS.micro.dur),      Scene: MicroFarmsScene },
  { key: 'conclusion', start: s(TIMINGS.conclusion.start), dur: s(TIMINGS.conclusion.dur), Scene: ConclusionScene },
  { key: 'outro',      start: s(TIMINGS.outro.start),      dur: s(TIMINGS.outro.dur),      Scene: OutroScene },
];

// Fichiers audio voix off générés par TTS (un par scène)
const AUDIO_FILES = [
  { key: 'title',      file: 'audio/vo_title.mp3',      start: TIMINGS.title.start },
  { key: 'farmCount',  file: 'audio/vo_farmcount.mp3',  start: TIMINGS.farmCount.start },
  { key: 'land',       file: 'audio/vo_land.mp3',       start: TIMINGS.land.start },
  { key: 'livestock',  file: 'audio/vo_livestock.mp3',  start: TIMINGS.livestock.start },
  { key: 'micro',      file: 'audio/vo_micro.mp3',      start: TIMINGS.micro.start },
  { key: 'conclusion', file: 'audio/vo_conclusion.mp3', start: TIMINGS.conclusion.start },
];

export const VideoESEA: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: theme.colors.white }}>
      {/* Injection polices Google Fonts */}
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />

      {/* Scènes visuelles */}
      {scenes.map(({ key, start, dur, Scene }) => (
        <Sequence key={key} from={start} durationInFrames={dur}>
          <Scene />
        </Sequence>
      ))}

      {/* Voix off — chaque fichier audio est placé au bon offset */}
      {AUDIO_FILES.map(({ key, file, start }) => (
        <Sequence key={`audio-${key}`} from={s(start)} durationInFrames={s(60)}>
          <Audio src={staticFile(file)} volume={1} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
