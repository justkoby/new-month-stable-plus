import React from 'react';
import {AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {XFADE} from '../config';

type Props = {
  src: string;
  trim?: number;
  rate?: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  zoom?: number; // total subtle push-in over the scene, e.g. 0.03
  volume?: number;
  children?: React.ReactNode;
};

export const VideoScene: React.FC<Props> = ({src, trim = 0, rate = 1, fadeIn, fadeOut, zoom = 0.025, volume = 0.5, children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const inD = fadeIn ? XFADE : 0;
  const outD = fadeOut ? XFADE : 0;
  const fade = (frame: number, lo: number, hi: number) => interpolate(frame, [lo, hi], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const gIn = inD ? fade(frame, 0, inD) : 1;
  const gOut = outD ? 1 - fade(frame, durationInFrames - outD, durationInFrames) : 1;
  const opacity = gIn * gOut;
  const scale = 1 + zoom * (frame / durationInFrames);
  // audio always eases in/out so cuts between ambience beds are never abrupt
  const audio = volume * fade(frame, 0, XFADE) * (1 - fade(frame, durationInFrames - XFADE, durationInFrames));
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <OffthreadVideo
          src={staticFile(src)}
          trimBefore={trim}
          playbackRate={rate}
          volume={audio}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </AbsoluteFill>
      {children}
    </AbsoluteFill>
  );
};
