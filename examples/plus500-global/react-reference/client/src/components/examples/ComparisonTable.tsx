import ComparisonTable from '../ComparisonTable';

export default function ComparisonTableExample() {
  // todo: remove mock functionality
  const headers = {
    plus500: "Plus500",
    competitor1: "Competitor A",
    competitor2: "Competitor B"
  };

  const rows = [
    {
      feature: "Commission-free trading",
      plus500: true,
      competitor1: false,
      competitor2: "$7 per trade",
      highlighted: true
    },
    {
      feature: "Minimum deposit",
      plus500: "$100",
      competitor1: "$500",
      competitor2: "$250"
    },
    {
      feature: "Demo account",
      plus500: true,
      competitor1: true,
      competitor2: false
    },
    {
      feature: "Mobile app",
      plus500: true,
      competitor1: true,
      competitor2: true
    },
    {
      feature: "24/7 support",
      plus500: true,
      competitor1: false,
      competitor2: true
    },
    {
      feature: "Guaranteed stop loss",
      plus500: true,
      competitor1: false,
      competitor2: false,
      highlighted: true
    },
    {
      feature: "Number of instruments",
      plus500: "2800+",
      competitor1: "1200+", 
      competitor2: "800+"
    },
    {
      feature: "Regulated",
      plus500: true,
      competitor1: true,
      competitor2: true
    }
  ];

  return (
    <ComparisonTable
      title="Why Choose Plus500?"
      subtitle="See how Plus500 compares to other leading trading platforms"
      headers={headers}
      rows={rows}
    />
  );
}