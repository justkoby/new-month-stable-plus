import React from 'react';
import {Composition} from 'remotion';
import {NovemberAd} from './compositions/NovemberAd';
import {campaign, FPS, TOTAL_FRAMES} from './config';
import './styles/fonts.css';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="NovemberAd"
    component={NovemberAd}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1080}
    height={1920}
    defaultProps={{campaign}}
  />
);
