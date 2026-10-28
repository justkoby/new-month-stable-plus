import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {campaign} from '../config';
import {easeOut, prog} from './motion';

/** Logo reveal: a left-to-right mask wipe with a gentle settle. Aspect ratio is always preserved. */
export const Logo: React.FC<{width: number; start?: number}> = ({width, start = 0}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, start, 34, easeOut);
  const height = width / campaign.logoAspect;
  return (
    <div style={{width, height, clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`, transform: `scale(${0.96 + 0.04 * p})`, opacity: Math.min(1, p * 3)}}>
      <Img src={staticFile(campaign.logo)} style={{width, height, display: 'block'}} />
    </div>
  );
};
