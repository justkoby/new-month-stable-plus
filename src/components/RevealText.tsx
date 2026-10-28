import React from 'react';
import {useCurrentFrame} from 'remotion';
import {easeOut, prog} from './motion';

type Props = {
  text: string;
  start?: number;
  stagger?: number;
  by?: 'char' | 'word';
  style?: React.CSSProperties;
  exitAt?: number; // frame at which the text lifts out through its mask
};

/** Masked, staggered rise: each unit slides up from behind a clipping line. */
export const RevealText: React.FC<Props> = ({text, start = 0, stagger = 2, by = 'char', style, exitAt}) => {
  const frame = useCurrentFrame();
  const units = by === 'char' ? Array.from(text) : text.split(' ');
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', ...style}} aria-label={text}>
      {units.map((u, i) => {
        const p = prog(frame, start + i * stagger, 22, easeOut);
        const out = exitAt === undefined ? 0 : prog(frame, exitAt + i * 1, 14);
        const y = (1 - p) * 110 - out * 110;
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', padding: '0.08em 0', margin: '-0.08em 0'}}>
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${y}%)`,
                opacity: Math.min(1, p * 2) * (1 - out),
                whiteSpace: 'pre',
              }}
            >
              {u === ' ' ? ' ' : u}
              {by === 'word' && i < units.length - 1 ? ' ' : ''}
            </span>
          </span>
        );
      })}
    </div>
  );
};
