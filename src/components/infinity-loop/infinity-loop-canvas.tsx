"use client";

import { useEffect, useRef } from "react";

const SVGNS = "http://www.w3.org/2000/svg";
const PATH_D =
  "M 0 0 C -130 -170, -360 -170, -360 0 C -360 170, -130 170, 0 0 C 130 -170, 360 -170, 360 0 C 360 170, 130 170, 0 0 Z";
const PERIOD = 9500;

type FixedLabel = {
  name: string;
  fixed: true;
  fx: number;
  fy: number;
  anchorMidT: number;
};
type TrackLabel = {
  name: string;
  fixed?: false;
  t: number;
  offset: number;
  anchorMidT: number;
};
type LabelDatum = FixedLabel | TrackLabel;

const LABEL_DATA: LabelDatum[] = [
  { name: "STRATEGY",   t: 0.135, offset: 30, anchorMidT: 0.135 },
  { name: "CONSULTING", t: 0.255, offset: 34, anchorMidT: 0.255 },
  { name: "PRODUCT",    t: 0.378, offset: 30, anchorMidT: 0.378 },
  { name: "MEDIA",      fixed: true, fx: 0, fy: -218, anchorMidT: 0.0 },
  { name: "MARKETING",  t: 0.622, offset: 30, anchorMidT: 0.622 },
  { name: "CREATIVE",   t: 0.745, offset: 34, anchorMidT: 0.745 },
  { name: "ORGANIC",    t: 0.865, offset: 30, anchorMidT: 0.865 },
];

const COLOR_BOUNDARIES = [
  { t: 0.135, c: [125, 241, 255] },
  { t: 0.378, c: [120, 170, 255] },
  { t: 0.622, c: [255, 140, 210] },
  { t: 0.865, c: [180, 150, 255] },
];
const TRANSITION_WIN = 0.05;

function lerpColor(a: number[], b: number[], f: number): number[] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

function snakeColor(rawT: number): number[] {
  const t = ((rawT % 1) + 1) % 1;
  const BS = COLOR_BOUNDARIES;
  let curIdx = -1;
  for (let i = 0; i < BS.length; i++) {
    if (t >= BS[i].t) curIdx = i;
  }
  if (curIdx === -1) curIdx = BS.length - 1;
  const cur = BS[curIdx].c;
  const nextIdx = (curIdx + 1) % BS.length;
  const next = BS[nextIdx];
  let dToNext = next.t - t;
  if (dToNext < 0) dToNext += 1;
  if (dToNext < TRANSITION_WIN) {
    return lerpColor(cur, next.c, 1 - dToNext / TRANSITION_WIN);
  }
  return [...cur];
}

const SNAKE_LAYERS = [
  { dashFrac: 0.30, width: 26,  blur: "ail-hugeGlow", alpha: 0.30 },
  { dashFrac: 0.26, width: 14,  blur: "ail-bigGlow",  alpha: 0.55 },
  { dashFrac: 0.20, width: 7,   blur: "ail-medGlow",  alpha: 0.85 },
  { dashFrac: 0.12, width: 3.4, blur: "ail-softGlow", alpha: 1.00 },
  { dashFrac: 0.05, width: 1.6, blur: null,            alpha: 1.00 },
];

const InfinityLoopCanvas = function InfinityLoopCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const pathEl = svg.querySelector<SVGPathElement>("#ail-path");
    const trailG  = svg.querySelector<SVGGElement>("#ail-trail");
    const labelsG = svg.querySelector<SVGGElement>("#ail-labels");
    if (!pathEl || !trailG || !labelsG) return;

    const len = pathEl.getTotalLength();

    const pointAt = (t: number) =>
      pathEl.getPointAtLength(((t % 1) + 1) % 1 * len);

    const outwardOffset = (t: number, dist: number) => {
      const p  = pointAt(t);
      const p2 = pointAt(t + 0.001);
      const dx = p2.x - p.x, dy = p2.y - p.y;
      const m  = Math.hypot(dx, dy) || 1;
      let nx = -dy / m, ny = dx / m;
      if (nx * p.x + ny * p.y < 0) { nx = -nx; ny = -ny; }
      return { x: p.x + nx * dist, y: p.y + ny * dist };
    };

    // Labels
    const labelEls: Array<{ el: SVGTextElement; anchorMidT: number }> = [];
    LABEL_DATA.forEach((l) => {
      const el = document.createElementNS(SVGNS, "text") as SVGTextElement;
      el.setAttribute("class", "ail-label");
      el.setAttribute("font-family", "'Space Grotesk', system-ui, sans-serif");
      el.setAttribute("text-anchor", "middle");
      el.setAttribute("dominant-baseline", "middle");
      el.textContent = l.name;
      const pos = l.fixed
        ? { x: l.fx, y: l.fy }
        : outwardOffset(l.t, l.offset);
      el.setAttribute("x", String(pos.x));
      el.setAttribute("y", String(pos.y));
      labelsG.appendChild(el);
      labelEls.push({ el, anchorMidT: l.anchorMidT });
    });

    // Snake layers
    const layers: Array<{ el: SVGPathElement; dashLen: number }> = [];
    SNAKE_LAYERS.forEach((L) => {
      const dash = L.dashFrac * len;
      const p = document.createElementNS(SVGNS, "path") as SVGPathElement;
      p.setAttribute("d", PATH_D);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke-width", String(L.width));
      p.setAttribute("stroke-linecap", "round");
      p.setAttribute("stroke-linejoin", "round");
      p.setAttribute("stroke-dasharray", `${dash} ${len - dash}`);
      p.setAttribute("opacity", String(L.alpha));
      if (L.blur) p.setAttribute("filter", `url(#${L.blur})`);
      trailG.appendChild(p);
      layers.push({ el: p, dashLen: dash });
    });

    // Head bloom
    const makeCircle = (r: string, filter?: string) => {
      const c = document.createElementNS(SVGNS, "circle") as SVGCircleElement;
      c.setAttribute("r", r);
      if (filter) c.setAttribute("filter", `url(#${filter})`);
      trailG.appendChild(c);
      return c;
    };
    const headOuter = makeCircle("9", "ail-hugeGlow");
    const headMid   = makeCircle("4", "ail-medGlow");
    const headCore  = makeCircle("1.8");
    headCore.setAttribute("fill", "#ffffff");

    function frame(now: number) {
      const t       = (now / PERIOD) % 1;
      const headPos = t * len;
      const col     = snakeColor(t);
      const stroke  = `rgb(${col[0]},${col[1]},${col[2]})`;

      for (const L of layers) {
        L.el.setAttribute("stroke-dashoffset", (L.dashLen - headPos).toFixed(2));
        L.el.setAttribute("stroke", stroke);
      }

      const p  = pointAt(t);
      const cx = p.x.toFixed(2), cy = p.y.toFixed(2);
      headOuter.setAttribute("cx", cx); headOuter.setAttribute("cy", cy);
      headOuter.setAttribute("fill", stroke);
      headMid.setAttribute("cx", cx);   headMid.setAttribute("cy", cy);
      headMid.setAttribute("fill", "#ffffff");
      headCore.setAttribute("cx", cx);  headCore.setAttribute("cy", cy);

      labelEls.forEach(({ el, anchorMidT }) => {
        let d = Math.abs(t - anchorMidT);
        d = Math.min(d, 1 - d);
        const active = d < 0.055;
        if (active) {
          el.style.setProperty("--label-glow", `rgba(${col[0]},${col[1]},${col[2]},0.95)`);
        }
        if (active && !el.classList.contains("active")) {
          el.classList.add("active");
        } else if (!active && el.classList.contains("active")) {
          el.classList.remove("active");
        }
      });

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      labelsG.innerHTML = "";
      trailG.innerHTML  = "";
    };
  }, []);

  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9", maxHeight: "72vh" }}>
      <svg
        ref={svgRef}
        viewBox="-500 -260 1000 520"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full block overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes ail-float {
              0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
              50%       { transform: translateY(-5px) rotate(0.5deg); }
            }
            @keyframes ail-blink {
              0%, 92%, 96%, 100% { transform: scaleY(1); }
              94%                { transform: scaleY(0.1); }
            }
            @keyframes ail-labelPulse {
              0%   { filter: drop-shadow(0 0 18px var(--label-glow, rgba(125,241,255,0.95))); }
              100% { filter: drop-shadow(0 0 6px  var(--label-glow, rgba(125,241,255,0.55))); }
            }
            .ail-robot {
              transform-box: fill-box;
              transform-origin: center;
              animation: ail-float 3.6s ease-in-out infinite;
            }
            .ail-eye {
              animation: ail-blink 5s infinite;
              transform-box: fill-box;
              transform-origin: center;
            }
            .ail-eye-r { animation-delay: 0.05s; }
            .ail-label {
              fill: rgba(210,225,255,0.32);
              font-size: 13px;
              font-weight: 500;
              letter-spacing: 0.26em;
              pointer-events: none;
              transition: fill 320ms ease, font-size 320ms ease, letter-spacing 320ms ease, opacity 320ms ease;
            }
            .ail-label.active {
              fill: #ffffff;
              font-size: 16px;
              letter-spacing: 0.32em;
              animation: ail-labelPulse 1.2s ease-out;
            }
          ` }} />

          <filter id="ail-softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <filter id="ail-medGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="ail-bigGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="ail-hugeGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="26" />
          </filter>

          <radialGradient id="ail-robotBody" cx="35%" cy="30%">
            <stop offset="0%"   stopColor="#ffffff" />
            <stop offset="60%"  stopColor="#dbe4f7" />
            <stop offset="100%" stopColor="#a6b4d0" />
          </radialGradient>
          <radialGradient id="ail-robotVisor" cx="50%" cy="40%">
            <stop offset="0%"   stopColor="#1b2440" />
            <stop offset="100%" stopColor="#05070f" />
          </radialGradient>
          <linearGradient id="ail-trackGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"   stopColor="rgba(125,241,255,0.20)" />
            <stop offset="0.5" stopColor="rgba(140,180,255,0.20)" />
            <stop offset="1"   stopColor="rgba(255,150,210,0.20)" />
          </linearGradient>
        </defs>

        {/* Ambient bloom layers behind the track */}
        <path d={PATH_D} stroke="rgba(125,241,255,0.10)" strokeWidth="22" fill="none" filter="url(#ail-bigGlow)" />
        <path d={PATH_D} stroke="rgba(160,220,255,0.18)" strokeWidth="6"  fill="none" filter="url(#ail-medGlow)" />

        {/* Base track rail */}
        <path id="ail-path" d={PATH_D} stroke="url(#ail-trackGrad)" strokeWidth="1.5" fill="none" />

        {/* Animated snake trail + head bloom (populated by JS) */}
        <g id="ail-trail" />

        {/* Service labels (populated by JS) */}
        <g id="ail-labels" />

        {/* Robot at the crossover */}
        <g className="ail-robot" transform="translate(0, -6)">
          {/* ground glow shadow */}
          <ellipse cx="0" cy="44" rx="34" ry="5"   fill="#7df1ff" opacity="0.35" filter="url(#ail-bigGlow)" />
          <ellipse cx="0" cy="44" rx="18" ry="2.5" fill="#ffffff" opacity="0.5"  filter="url(#ail-medGlow)" />

          {/* antenna */}
          <line x1="0" y1="-28" x2="0" y2="-42" stroke="#7df1ff" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="0" cy="-44" r="3.2" fill="#7df1ff" filter="url(#ail-medGlow)" />
          <circle cx="0" cy="-44" r="1.5" fill="#ffffff" />

          {/* head */}
          <rect x="-24" y="-28" width="48" height="40" rx="13"
                fill="url(#ail-robotBody)" stroke="rgba(125,241,255,0.55)" strokeWidth="0.8" />
          <rect x="-19" y="-25" width="22" height="4"  rx="2" fill="#ffffff" opacity="0.55" />

          {/* visor */}
          <rect x="-17" y="-20" width="34" height="20" rx="7"
                fill="url(#ail-robotVisor)" stroke="rgba(125,241,255,0.3)" strokeWidth="0.5" />
          <rect x="-15" y="-18.5" width="14" height="2" rx="1" fill="#7df1ff" opacity="0.25" />

          {/* eyes */}
          <circle className="ail-eye"       cx="-7" cy="-10" r="2.4" fill="#7df1ff" filter="url(#ail-softGlow)" />
          <circle className="ail-eye ail-eye-r" cx="7"  cy="-10" r="2.4" fill="#7df1ff" filter="url(#ail-softGlow)" />
          <circle cx="-7" cy="-10" r="1.1" fill="#ffffff" />
          <circle cx="7"  cy="-10" r="1.1" fill="#ffffff" />

          {/* mouth bar */}
          <rect x="-5" y="-4.5" width="10" height="1.2" rx="0.6" fill="#7df1ff" opacity="0.7" />

          {/* neck */}
          <rect x="-6" y="12" width="12" height="3" fill="rgba(140,160,200,0.7)" />

          {/* body */}
          <rect x="-20" y="14" width="40" height="22" rx="8"
                fill="url(#ail-robotBody)" stroke="rgba(125,241,255,0.55)" strokeWidth="0.8" />
          <circle cx="0" cy="25" r="3.5" fill="#7df1ff" filter="url(#ail-medGlow)" />
          <circle cx="0" cy="25" r="1.6" fill="#ffffff" />
          <rect x="-15" y="22" width="3" height="6" rx="1" fill="rgba(50,70,120,0.5)" />
          <rect x="12"  y="22" width="3" height="6" rx="1" fill="rgba(50,70,120,0.5)" />
        </g>
      </svg>
    </div>
  );
};

InfinityLoopCanvas.displayName = "InfinityLoopCanvas";
export { InfinityLoopCanvas };
