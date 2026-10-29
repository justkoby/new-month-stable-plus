import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Campaign} from '../config';
import {theme} from '../styles/theme';
import {easeOut, prog} from './motion';

const Block: React.FC<{start: number; label: string; color: string; icon?: React.ReactNode; children: React.ReactNode}> = ({start, label, color, icon, children}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, start, 26, easeOut);
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * 28}px)`, display: 'flex', gap: 28, alignItems: 'stretch'}}>
      <div style={{width: 6, borderRadius: 3, background: color, transform: `scaleY(${p})`, transformOrigin: 'top'}} />
      <div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, fontFamily: theme.body, fontWeight: 800, fontSize: 30, letterSpacing: '0.18em', color}}>
          {icon}
          {label}
        </div>
        <div style={{marginTop: 14}}>{children}</div>
      </div>
    </div>
  );
};

const svg = {width: 44, height: 44, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'} as const;
const PhoneIcon: React.FC = () => (
  <svg {...svg}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
/** Chat bubble with handset — WhatsApp-style contact glyph. */
const WhatsAppIcon: React.FC = () => (
  <svg {...svg}>
    <path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.4L3 21z" />
    <path transform="translate(6.4 6.4) scale(0.47)" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const main: React.CSSProperties = {fontFamily: theme.body, fontWeight: 800, fontSize: 42, lineHeight: 1.25, color: theme.ink};
const sub: React.CSSProperties = {fontFamily: theme.body, fontWeight: 500, fontSize: 31, lineHeight: 1.3, color: '#4A6578'};

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
      <div style={{display: 'flex', gap: 56}}>
        <Block start={start + 24} label={data.call.label} color={theme.blue} icon={<PhoneIcon />}>
          <div style={main}>{data.call.number}</div>
        </Block>
        <Block start={start + 40} label={data.whatsapp.label} color={theme.greenDeep} icon={<WhatsAppIcon />}>
          <div style={main}>{data.whatsapp.number}</div>
        </Block>
      </div>
      <div style={{opacity: hp, transform: `translateY(${(1 - hp) * 20}px)`, fontFamily: theme.body, fontWeight: 700, fontSize: 38, color: theme.blueDeep, paddingLeft: 34}}>
        {data.handle}
      </div>
    </div>
  );
};
