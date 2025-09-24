import CategoryInstrumentsRail from '../CategoryInstrumentsRail';

export default function CategoryInstrumentsRailExample() {
  // todo: remove mock functionality
  const cryptoInstruments = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 43567.89,
      change: 1234.56,
      changePercent: 2.91
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2845.32,
      change: -45.23,
      changePercent: -1.56
    },
    {
      symbol: "ADA",
      name: "Cardano",
      price: 0.4523,
      change: 0.0234,
      changePercent: 5.44
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: 89.76,
      change: 3.21,
      changePercent: 3.71
    }
  ];

  return (
    <CategoryInstrumentsRail
      title="Popular Cryptocurrencies"
      instruments={cryptoInstruments}
    />
  );
}