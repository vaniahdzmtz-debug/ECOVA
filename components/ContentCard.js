import RatingDial from './RatingDial';

const LABELS = {
  low: { text: 'Low impact', textColor: 'text-moss', bg: 'bg-sageLight' },
  medium: { text: 'Medium impact', textColor: 'text-clayDeep', bg: 'bg-clay/15' },
  high: { text: 'High impact', textColor: 'text-rust', bg: 'bg-rust/10' },
};

export default function ContentCard({ name, level, explanation }) {
  const label = LABELS[level] || LABELS.low;

  return (
    <div className="bg-card border border-forest/10 rounded-2xl p-5 flex flex-col hover:border-forest/25 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <RatingDial level={level} />
        <span
          className={`text-xs font-medium uppercase tracking-wide ${label.textColor} ${label.bg} rounded-full px-2.5 py-1`}
        >
          {label.text}
        </span>
      </div>
      <p className="font-medium text-forest mb-1">{name}</p>
      <p className="text-sm text-ink/70 leading-relaxed">{explanation}</p>
    </div>
  );
}
