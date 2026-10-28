import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Campaign} from '../config';
import {theme} from '../styles/theme';
import {easeOut, prog} from './motion';

const Block: React.FC<{start: number; label: string; color: string; children: React.ReactNode}> = ({start, label, color, children}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, start, 26, easeOut);
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * 28}px)`, display: 'flex', gap: 28, alignItems: 'stretch'}}>
      <div style={{width: 6, borderRadius: 3, background: color, transform: `scaleY(${p})`, transformOrigin: 'top'}} />
      <div>
        <div style={{fontFamily: theme.body, fontWeight: 800, fontSize: 32, letterSpacing: '0.22em', color}}>{label}</div>
        <div style={{marginTop: 14}}>{children}</div>
      </div>
    </div>
  );
};

const main: React.CSSProperties = {fontFamily: theme.body, fontWeight: 800, fontSize: 50, lineHeight: 1.2, color: theme.ink};
const sub: React.CSSProperties = {fontFamily: theme.body, fontWeight: 500, fontSize: 36, lineHeight: 1.25, color: '#4A6578'};

export const ContactInfo: React.FC<{data: Campaign; start?: number}> = ({data, start = 0}) => {
  const frame = useCurrentFrame();
  const hp = prog(frame, start + 60, 24, easeOut);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 58, width: '100%'}}>
      <Block start={start} label={data.visit.label} color={theme.blue}>
        {data.visit.lines.map(([a, b], i) => (
          <div key={i} style={{marginBottom: i === 0 ? 20 : 0}}>
            <div style={main}>{a}</div>
            <div style={sub}>{b}</div>
          </div>
        ))}
      </Block>
      <Block start={start + 24} label={data.call.label} color={theme.greenDeep}>
        {data.call.lines.map((l, i) => (
          <div key={i} style={main}>{l}</div>
        ))}
      </Block>
      <div style={{opacity: hp, transform: `translateY(${(1 - hp) * 20}px)`, fontFamily: theme.body, fontWeight: 700, fontSize: 42, color: theme.blueDeep, paddingLeft: 34}}>
        {data.handle}
      </div>
    </div>
  );
};
