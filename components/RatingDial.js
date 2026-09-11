const LEVELS = {
  low: { color: '#6F8F6B', fillPercent: 0.25 },
  medium: { color: '#C97B3D', fillPercent: 0.55 },
  high: { color: '#B5502D', fillPercent: 0.85 },
};

export default function RatingDial({ level = 'low', size = 52 }) {
  const config = LEVELS[level] || LEVELS.low;
  const radius = size / 2 - 6;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const dashoffset = circumference * (1 - config.fillPercent);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#E3DCC8" strokeWidth="6" />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={config.color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
        transform={`rotate(-90 ${center} ${center})`}
      />
    </svg>
  );
}
