import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Campaign, END_PHASE_B} from '../config';
import {safe, theme} from '../styles/theme';
import {ContactInfo} from './ContactInfo';
import {Logo} from './Logo';
import {easeInOut, easeOut, prog} from './motion';
import {RevealText} from './RevealText';

const Line: React.FC<{color: string; start: number; width: number; top?: number; left?: number; right?: number}> = ({color, start, width, ...pos}) => {
  const p = prog(useCurrentFrame(), start, 40, easeInOut);
  return <div style={{position: 'absolute', height: 6, width: width * p, background: color, borderRadius: 3, ...pos}} />;
};

export const EndCard: React.FC<{data: Campaign}> = ({data}) => {
  const frame = useCurrentFrame();
  const aOut = prog(frame, END_PHASE_B - 16, 14);
  const bf = frame - END_PHASE_B;
  const msgP = prog(frame, 46, 28, easeOut);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${theme.white} 0%, ${theme.paper} 100%)`}}>
      {/* soft corner shape */}
      <div style={{position: 'absolute', right: -260, top: -260, width: 640, height: 640, borderRadius: '50%', background: theme.blue, opacity: 0.06 * prog(frame, 0, 40)}} />

      {/* Phase A — greeting */}
      <AbsoluteFill style={{opacity: 1 - aOut, paddingLeft: safe.left, paddingRight: safe.right, justifyContent: 'center'}}>
        <Line color={theme.green} start={6} width={160} top={540} left={safe.left} />
        <div style={{fontFamily: theme.display, fontWeight: 800, color: theme.blue, lineHeight: 0.92, fontSize: 190, letterSpacing: '-0.03em', marginTop: -60}}>
          <RevealText text={data.greeting[0]} start={8} stagger={3} style={{justifyContent: 'flex-start'}} />
          <RevealText text={data.greeting[1]} start={20} stagger={3} style={{justifyContent: 'flex-start', flexWrap: 'nowrap', color: theme.blueDeep, fontSize: 106}} />
        </div>
        <div style={{marginTop: 54, opacity: msgP, transform: `translateY(${(1 - msgP) * 24}px)`, fontFamily: theme.display, fontStyle: 'italic', fontWeight: 600, fontSize: 42, lineHeight: 1.4, color: theme.ink, maxWidth: 800}}>
          {data.message}
        </div>
        <Line color={theme.blue} start={60} width={420} top={1330} left={safe.left} />
      </AbsoluteFill>

      {/* Phase B — brand + contact */}
      {bf > -2 && (
        <AbsoluteFill style={{paddingLeft: safe.left, paddingRight: safe.right, paddingTop: safe.top + 30, alignItems: 'flex-start'}}>
          <Logo width={500} start={END_PHASE_B - 6} />
          <div style={{marginTop: 38, fontFamily: theme.display, fontStyle: 'italic', fontWeight: 600, fontSize: 50, color: theme.ink, opacity: prog(frame, END_PHASE_B + 22, 24), transform: `translateY(${(1 - prog(frame, END_PHASE_B + 22, 24)) * 20}px)`}}>
            {data.tagline}
          </div>
          <div style={{position: 'relative', height: 6, width: '100%', margin: '52px 0 64px'}}>
            <Line color={theme.green} start={END_PHASE_B + 30} width={340} top={0} left={0} />
          </div>
          <ContactInfo data={data} start={END_PHASE_B + 40} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
