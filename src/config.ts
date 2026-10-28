// Everything campaign-specific lives here so next month's ad is a content edit.
export const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

export const campaign = {
  month: 'November',
  brand: 'Stable Plus Healthcare',
  logo: 'assets/branding/logo-4x.png',
  logoAspect: 319 / 219,
  openingLine: "Every day, we're here for you.",
  handoverLine: 'Care you can count on.',
  greeting: ['HAPPY', 'NOVEMBER!'],
  message: 'May this month bring you good health, happiness and peace of mind.',
  tagline: 'Your Health. Our Priority.',
  visit: {
    label: 'VISIT US',
    lines: [
      ['Madina Ritz Hotel', '(Star Oil Filling Station)'],
      ['Madina – Main Station', '(Near Old Melcom)'],
    ],
  },
  call: {label: 'CALL US', lines: ['059 599 1981 / 059 306 7798']},
  handle: '@stableplushealthcare',
};
export type Campaign = typeof campaign;

// Timeline (seconds → frames). Scenes overlap by XFADE for dissolves.
export const XFADE = s(0.4);
export const scenes = {
  s1: {from: 0, dur: s(4.2), src: 'assets/videos/01-reaching.mp4', trim: 0, rate: 1},
  s2: {from: s(3.8), dur: s(4.0), src: 'assets/videos/02-handover-retrieving.mp4', trim: 0, rate: 0.55},
  s3: {from: s(7.4), dur: s(5.6), src: 'assets/videos/03-smiling.mp4', trim: s(1.0), rate: 0.85},
  end: {from: s(7.4) + 152, dur: s(7.6)},
};
export const END_PHASE_B = s(3.6); // local frame inside the end card where Phase B starts
export const TOTAL_FRAMES = scenes.end.from + scenes.end.dur;
