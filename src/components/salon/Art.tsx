/** Flat paper-collage shapes. Pure decoration. */
export function Collage({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <path d="M260 300 V170 a70 70 0 0 1 140 0 V300 Z" fill="var(--muted)" />
      <circle cx="40" cy="40" r="70" fill="var(--secondary)" />
      <circle cx="350" cy="60" r="28" fill="var(--primary)" />
      <path d="M0 300 V250 a45 45 0 0 1 90 0 V300 Z" fill="var(--primary)" />
      <Star x={120} y={240} r={14} />
      <Star x={300} y={120} r={9} />
      <line x1="0" y1="140" x2="400" y2="140" stroke="var(--foreground)" strokeWidth="0.6" />
      <circle cx="200" cy="150" r="120" fill="none" stroke="var(--foreground)" strokeWidth="0.6" />
    </svg>
  );
}
export function Star({ x, y, r, fill = "var(--foreground)" }: { x: number; y: number; r: number; fill?: string }) {
  const d = Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; const rr = i % 2 ? r * 0.3 : r; return `${x + Math.cos(a) * rr},${y + Math.sin(a) * rr}`; }).join(" ");
  return <polygon points={d} fill={fill} />;
}
