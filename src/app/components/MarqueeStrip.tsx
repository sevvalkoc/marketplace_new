interface MarqueeStripProps {
  items: string[];
  bgColor?: string;
  textColor?: string;
  separator?: string;
}

export const MarqueeStrip = ({
  items,
  bgColor = 'bg-[#F4F4F2]',
  textColor = 'text-black/40',
  separator = '—',
}: MarqueeStripProps) => {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className={`${bgColor} overflow-hidden py-3`}>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-left 40s linear infinite;
          display: flex;
          width: max-content;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-5 px-5 whitespace-nowrap ${textColor}`}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            <span className="opacity-40">{separator}</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
