const features = [
  {
    label: 'Free Delivery',
    sub: 'On orders over £150',
  },
  {
    label: '30-Day Returns',
    sub: 'No questions asked',
  },
  {
    label: 'Secure Payment',
    sub: 'Encrypted & protected',
  },
  {
    label: 'Curated Selection',
    sub: 'Every product hand-picked',
  },
];

export const TrustBar = () => (
  <div className="border-y border-black/8 bg-white">
    <div className="max-w-[1400px] mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center py-6 px-4 text-center ${
              i < features.length - 1 ? 'border-r border-black/8' : ''
            }`}
          >
            <p
              className="text-black mb-1"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {f.label}
            </p>
            <p
              className="text-black/35"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem' }}
            >
              {f.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
