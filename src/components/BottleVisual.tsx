import type { CSSProperties } from 'react';
import type { Product } from '@/data/products';

type Props = { product: Product; number: number };

// Original Maison shapes: architectural, fluted and cut-glass silhouettes; no borrowed trademarks or signature bottle profiles.
const bodyPaths = [
  'M112 159 Q112 138 133 138 H187 Q208 138 208 159 V282 Q208 305 185 305 H135 Q112 305 112 282 Z',
  'M101 160 L126 137 H194 L219 160 V280 Q219 305 194 305 H126 Q101 305 101 280 Z',
  'M108 170 Q108 141 136 137 H184 Q212 141 212 170 V277 Q212 305 184 305 H136 Q108 305 108 277 Z',
  'M110 162 Q110 143 134 137 L145 130 H175 L186 137 Q210 143 210 162 V281 Q210 305 185 305 H135 Q110 305 110 281 Z',
  'M118 153 L136 138 H184 L202 153 V284 Q202 305 181 305 H139 Q118 305 118 284 Z',
  'M108 171 Q108 148 128 142 Q140 138 146 129 H174 Q180 138 192 142 Q212 148 212 171 V277 Q212 305 183 305 H137 Q108 305 108 277 Z',
] as const;

const capShapes = [
  <rect key="cap" x="132" y="68" width="56" height="42" rx="8" />,
  <rect key="cap" x="126" y="70" width="68" height="38" rx="3" />,
  <path key="cap" d="M135 93 Q135 68 160 68 Q185 68 185 93 Q185 110 160 110 Q135 110 135 93 Z" />,
  <path key="cap" d="M135 69 H185 L196 83 L185 101 H135 L124 83 Z" />,
  <path key="cap" d="M139 68 H181 L193 82 V98 L181 109 H139 L127 98 V82 Z" />,
  <path key="cap" d="M137 92 Q137 69 160 67 Q183 69 183 92 L177 108 H143 Z" />,
];

export function BottleVisual({ product, number }: Props) {
  const glassId = `glass-${product.id}`;
  const shineId = `shine-${product.id}`;
  const auraId = `aura-${product.id}`;
  const metalId = `metal-${product.id}`;
  const clipId = `bottle-${product.id}`;
  const shadowId = `shadow-${product.id}`;
  const shape = (product.shape + number - 1) % bodyPaths.length;

  return (
    <div className="product-art" style={{ '--art-bg': product.palette.background, '--art-aura': product.palette.aura } as CSSProperties} aria-hidden="true">
      <svg className="bottle-illustration" viewBox="0 0 320 380" role="presentation">
        <defs>
          <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={product.palette.glassTop} /><stop offset="0.42" stopColor={product.palette.glassBottom} /><stop offset="0.7" stopColor={product.palette.glassTop} /><stop offset="1" stopColor={product.palette.background} />
          </linearGradient>
          <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0.7" /><stop offset="0.36" stopColor="#fff" stopOpacity="0.08" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={product.palette.background} /><stop offset="0.18" stopColor={product.palette.metal} /><stop offset="0.32" stopColor="#fff4d6" /><stop offset="0.5" stopColor={product.palette.metal} /><stop offset="0.72" stopColor="#fff0c5" /><stop offset="1" stopColor={product.palette.background} /></linearGradient>
          <radialGradient id={auraId} cx="50%" cy="38%" r="58%"><stop offset="0" stopColor={product.palette.aura} stopOpacity="0.57" /><stop offset="1" stopColor={product.palette.aura} stopOpacity="0" /></radialGradient>
          <clipPath id={clipId}><path d={bodyPaths[shape]} /></clipPath>
          <filter id={shadowId} x="-40%" y="-30%" width="180%" height="190%"><feGaussianBlur stdDeviation="12" /></filter>
        </defs>

        <ellipse cx="160" cy="331" rx="91" ry="15" fill="#000" opacity="0.48" filter={`url(#${shadowId})`} />
        <ellipse cx="160" cy="315" rx="82" ry="10" fill="#000" opacity="0.36" />
        <circle cx="160" cy="178" r="145" fill={`url(#${auraId})`} />
        <path d="M65 326 H255" stroke={product.palette.metal} strokeOpacity="0.3" strokeWidth="1" />
        <path d="M104 323 L122 311 H198 L216 323 L201 332 H119 Z" fill={`url(#${metalId})`} opacity="0.38" />
        <path d="M117 323 H203" stroke="#fff" strokeOpacity="0.3" strokeWidth="1" />

        <g fill={`url(#${glassId})`} stroke={product.palette.metal} strokeOpacity="0.72" strokeWidth="2">
          <rect x="140" y="105" width="40" height="43" rx="4" />
          <path d={bodyPaths[shape]} />
        </g>
        <path d="M141 108 H179" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" />
        <path d="M140 138 Q160 145 180 138" fill="none" stroke={`url(#${metalId})`} strokeWidth="3" />
        <path d="M142 143 H178" fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
        <g fill={`url(#${metalId})`} stroke="#fff4da" strokeOpacity="0.58" strokeWidth="1.2">{capShapes[shape]}</g>
        <path d="M136 76 H184" stroke="#fff" strokeOpacity="0.62" strokeWidth="1" />
        <path d="M143 84 V98" stroke="#fff" strokeOpacity="0.46" strokeWidth="1" />
        {(shape === 2 || shape === 5) && <><circle cx="160" cy="87" r="7" fill={product.palette.glassTop} stroke={`url(#${metalId})`} strokeWidth="2" /><circle cx="160" cy="87" r="2" fill="#fff6df" opacity="0.7" /></>}
        {(shape === 1 || shape === 3 || shape === 4) && <path d="M132 105 H188" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />}

        <g clipPath={`url(#${clipId})`}>
          <path d="M102 218 Q156 208 218 218 V320 H102 Z" fill={product.palette.glassBottom} opacity="0.5" />
          <path d="M111 158 Q115 149 122 149 V284 Q122 293 133 298" fill="none" stroke={`url(#${shineId})`} strokeWidth={shape === 1 || shape === 4 ? 7 : 10} strokeLinecap="round" opacity="0.9" />
          <path d="M198 162 V271" fill="none" stroke="#fff" strokeOpacity="0.23" strokeWidth="2" strokeLinecap="round" />
          {(shape === 1 || shape === 4) && <><path d="M127 151 V286" stroke="#fff" strokeOpacity="0.16" strokeWidth="2" /><path d="M193 151 V286" stroke="#fff" strokeOpacity="0.16" strokeWidth="2" /><path d="M137 147 L160 165 L183 147" fill="none" stroke={product.palette.metal} strokeOpacity="0.32" strokeWidth="1.2" /></>}
          {shape === 3 && <path d="M129 145 L117 169 V273" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" />}
          {shape === 5 && <><path d="M135 151 Q160 169 185 151" fill="none" stroke="#fff" strokeOpacity="0.15" strokeWidth="2" /><path d="M120 180 Q160 193 200 180" fill="none" stroke={product.palette.metal} strokeOpacity="0.19" strokeWidth="1" /></>}
        </g>

        <rect x="120" y="202" width="80" height="55" rx="2" fill={product.palette.label} fillOpacity="0.94" />
        <rect x="123" y="205" width="74" height="49" rx="1" fill="none" stroke={`url(#${metalId})`} strokeWidth="1.1" />
        <text x="160" y="222" textAnchor="middle" fill={product.palette.background} fontFamily="Georgia,serif" fontSize="8" letterSpacing="2">NUIT LUMIÈRE</text>
        <path d="M143 229 H177" stroke={product.palette.metal} strokeWidth="0.8" />
        <text x="160" y="241" textAnchor="middle" fill={product.palette.background} fontFamily="Georgia,serif" fontSize="7" letterSpacing="1">N° {String(number).padStart(2, '0')}</text>
        <text x="160" y="250" textAnchor="middle" fill={product.palette.background} fontFamily="Georgia,serif" fontSize="4.7" letterSpacing="0.8">EAU DE PARFUM</text>
      </svg>
      <span className="product-art-index">N° {String(number).padStart(2, '0')}</span>
    </div>
  );
}
