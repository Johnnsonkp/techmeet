import './circular.css';

import React from 'react';

type CircularRemote2Props = {
  segments: string[];
  highlightedIdx: number;
};

  // const SEGMENTS = segments.length;
  const radius = 90;
  const center = 90;
  // const segmentAngle = 360 / SEGMENTS;

  // Helper to create SVG arc path for a sector (used for sectors only)
  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', cx, cy,
      'L', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  }

  // Helper to create a simple arc path for label text (not a sector, just an arc)
  function describeLabelArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number, sweepFlag: number) {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', r, r, 0, largeArcFlag, sweepFlag, end.x, end.y
    ].join(' ');
  }

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  function CircularRemote2({ segments, highlightedIdx }: CircularRemote2Props) {
    const SEGMENTS = segments.length;
    const radius = 90;
    const center = 90;
    const segmentAngle = 360 / SEGMENTS;

  return (
    <div
      style={{
        position: "absolute",
        top: 150,
        right: 153,
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: 'transparent',
        boxShadow: '0 0 8px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255,255,255,0.15)',
        border: '4px solid rgba(255,255,255,0.2)',
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      {/* SVG sectors for each segment */}
      <svg width={180} height={180} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        {segments.map((_, i) => {
          const startAngle = i * segmentAngle;
          const endAngle = (i + 1) * segmentAngle;
          // const endAngle = (i + 1) * segmentAngle;
          const isActive = i === highlightedIdx;
          return (
            <path
              key={i}
              d={describeArc(center, center, radius - 4, startAngle, endAngle)}
              fill={isActive ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}
              style={{
                transition: 'fill 0.4s cubic-bezier(.4,2,.6,1)',
                filter: isActive ? 'drop-shadow(0 0 12px #fff)' : 'none',
              }}
            />
          );
        })}
      </svg>

      {/* Spokes for segment separation */}
      {segments.map((_, i) => {
        const angle = i * segmentAngle;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 1,
              height: 90,
              background: 'rgba(255,255,255,0.3)',
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: 'bottom center',
              zIndex: 1,
            }}
          />
        );
      })}


      {/* Curved SVG labels between spokes */}
      <svg width={180} height={180} style={{ position: 'absolute', top: 0, left: 0, zIndex: 3, pointerEvents: 'none' }}>
        {segments.map((label, i) => {
          // Arc for label: center of segment, small arc
          const angle = (i + 0.5) * segmentAngle;
          const isActive = i === highlightedIdx;
          // const arcRadius = radius - 18;
          const arcRadius = radius - 20;
          // Arc covers about 60% of the segment
          const arcSpan = segmentAngle * 0.6;
          let arcStart = angle - arcSpan / 2;
          let arcEnd = angle + arcSpan / 2;
          const arcId = `label-arc-${i}`;
          // Flip text if in top-left or top-right (angle between 45 and 135)
          const flip = (angle > 45 && angle < 135);
          let labelArcStart = arcStart;
          let labelArcEnd = arcEnd;
          let sweepFlag = 0;
          if (flip) {
            // For top arcs, swap start/end and set sweepFlag=1
            labelArcStart = arcEnd;
            labelArcEnd = arcStart;
            sweepFlag = 1;
          }
          return (
            <g key={i}>
              <path
                id={arcId}
                d={describeLabelArc(center, center, arcRadius, labelArcStart, labelArcEnd, sweepFlag)}
                fill="none"
                stroke="none"
              />
              <text
                fill={isActive ? '#fff' : 'rgba(255,255,255,0.7)'}
                fontWeight={isActive ? 700 : 500}
                fontSize={isActive ? 15 : 13}
                style={{
                  transition: 'all 0.4s cubic-bezier(.4,2,.6,1)',
                  filter: isActive ? 'drop-shadow(0 0 8px #fff)' : 'none',
                  letterSpacing: 1,
                }}
                dominantBaseline="middle"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                <textPath
                  href={`#${arcId}`}
                  startOffset="50%"
                  alignmentBaseline="middle"
                >
                  {label}
                </textPath>
              </text>
            </g>
          );
        })}
      </svg>

      {/* Center circle */}
      <div
        style={{
          position: 'absolute',
          top: '53%',
          left: '50%',
          width: 30,
          height: 30,
          background: 'gray',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 4,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />
    </div>
  );
}

export default CircularRemote2;