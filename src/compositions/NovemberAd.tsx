import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {EndCard} from '../components/EndCard';
import {easeInOut, prog} from '../components/motion';
import {RevealText} from '../components/RevealText';
import {VideoScene} from '../components/VideoScene';
import {Campaign, scenes, XFADE} from '../config';
import {safe, theme} from '../styles/theme';

const Caption: React.FC<{text: string; start: number; end: number}> = ({text, start, end}) => (
  <AbsoluteFill>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 760, background: 'linear-gradient(180deg, rgba(0,60,100,0) 0%, rgba(0,60,100,0.62) 100%)'}} />
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', paddingLeft: safe.left, paddingBottom: safe.bottom}}>
    <div style={{fontFamily: theme.display, fontStyle: 'italic', fontWeight: 600, fontSize: 62, color: theme.white, textShadow: '0 2px 18px rgba(0,40,70,0.55)'}}>
      <RevealText text={text} start={start} stagger={4} by="word" exitAt={end} style={{justifyContent: 'flex-start'}} />
    </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

/** Soft white panel rising from the bottom (face stays clear), carrying the greeting. */
const WelcomeReveal: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const rise = prog(frame, 66, 44, easeInOut);
  const full = prog(frame, 132, 20, easeInOut);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: `${rise * 44 + full * 56}%`, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 22%)'}} />
      <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', paddingLeft: safe.left, paddingBottom: safe.bottom + 20}}>
        <div style={{fontFamily: theme.display, fontWeight: 800, fontSize: 94, whiteSpace: 'nowrap', color: theme.blue, letterSpacing: '-0.01em', opacity: 1 - full}}>
          <RevealText text={text} start={84} stagger={3} style={{justifyContent: 'flex-start', flexWrap: 'nowrap'}} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const NovemberAd: React.FC<{campaign: Campaign}> = ({campaign}) => {
  const frame = useCurrentFrame();
  const white = interpolate(frame, [0, 24], [1, 0], {extrapolateRight: 'clamp'});
  const {s1, s2, s3, end} = scenes;
  return (
    <AbsoluteFill style={{background: '#fff'}}>
      <Sequence from={s1.from} durationInFrames={s1.dur}>
        <VideoScene src={s1.src} trim={s1.trim} rate={s1.rate} fadeOut>
          <Caption text={campaign.openingLine} start={30} end={s1.dur - 30} />
        </VideoScene>
      </Sequence>
      <Sequence from={s2.from} durationInFrames={s2.dur}>
        <VideoScene src={s2.src} trim={s2.trim} rate={s2.rate} fadeIn fadeOut>
          <Caption text={campaign.handoverLine} start={34} end={s2.dur - 28} />
        </VideoScene>
      </Sequence>
      <Sequence from={s3.from} durationInFrames={s3.dur}>
        <VideoScene src={s3.src} trim={s3.trim} rate={s3.rate} fadeIn zoom={0.04}>
          <WelcomeReveal text={`HAPPY NOVEMBER`.replace('NOVEMBER', campaign.month.toUpperCase())} />
        </VideoScene>
      </Sequence>
      <Sequence from={end.from} durationInFrames={end.dur}>
        <EndCard data={campaign} />
      </Sequence>
      <AbsoluteFill style={{background: '#fff', opacity: white, pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
