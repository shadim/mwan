'use client';

import { useI18n } from '@/lib/i18n-context';
import styles from './ui.module.css';

// 8-point star SVG
export function Star({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  const cx=50,cy=50,rO=42,rI=17,pts:string[]=[];
  for(let i=0;i<16;i++){const r=i%2===0?rO:rI;const a=(Math.PI/8)*i-Math.PI/2;
    pts.push(`${(cx+r*Math.cos(a)).toFixed(1)} ${(cy+r*Math.sin(a)).toFixed(1)}`);}
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{flexShrink:0}}>
      <path d={'M'+pts.join(' L')+' Z'} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="4" strokeLinejoin="round"/>
    </svg>
  );
}

// Bilingual text
export function T({ ar, en }: { ar: string; en: string }) {
  const { t } = useI18n();
  return <>{t(ar, en)}</>;
}

// Eyebrow label
export function Eyebrow({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div className={styles.eyebrow} style={color ? { color } : undefined}>
      <span className={styles.eyebrowLine} />
      {children}
    </div>
  );
}

// Card
export function Card({ children, className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.card} ${className || ''}`} style={style} {...props}>{children}</div>;
}

// Chip
export function Chip({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'accent' | 'warm' | 'success' | 'danger' }) {
  return <span className={`${styles.chip} ${styles[`chip_${tone}`]}`}>{children}</span>;
}

// Button
export function Btn({ children, variant = 'primary', size = 'md', ...props }:
  { variant?: 'primary' | 'ghost' | 'warm' | 'danger'; size?: 'sm' | 'md' | 'lg' } & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button className={`${styles.btn} ${styles[`btn_${variant}`]} ${styles[`btn_${size}`]}`} {...props}>
      {children}
    </button>
  );
}

// Stat tile
export function Stat({ label, value, delta, positive }: {
  label: string; value: string; delta?: string; positive?: boolean;
}) {
  return (
    <div className={styles.stat}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statRow}>
        <span className={styles.statValue}>{value}</span>
        {delta && <span className={positive ? styles.statDeltaUp : styles.statDeltaFlat}>{positive ? '↑' : ''} {delta}</span>}
      </div>
    </div>
  );
}
