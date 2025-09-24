import HeroBanner from "@/components/HeroBanner";
import CategoryInstrumentsRail from "@/components/CategoryInstrumentsRail";
import RichTextSection from "@/components/RichTextSection";
import BulletList from "@/components/BulletList";
import ComparisonTable from "@/components/ComparisonTable";
import CTASection from "@/components/CTASection";
import { Bitcoin, Shield, TrendingUp, Zap } from "lucide-react";

export default function TradingCryptocurrencies() {
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
    },
    {
      symbol: "DOGE",
      name: "Dogecoin", 
      price: 0.1876,
      change: -0.0034,
      changePercent: -1.78
    },
    {
      symbol: "LTC",
      name: "Litecoin",
      price: 78.45,
      change: 2.34,
      changePercent: 3.08
    },
    {
      symbol: "XRP",
      name: "Ripple",
      price: 0.6234,
      change: 0.0123,
      changePercent: 2.01
    },
    {
      symbol: "AVAX",
      name: "Avalanche",
      price: 34.56,
      change: 1.23,
      changePercent: 3.69
    }
  ];

  const cryptoFeatures = [
    {
      icon: Bitcoin,
      title: "Major Cryptocurrencies",
      description: "Trade Bitcoin, Ethereum, and 50+ other popular cryptocurrencies as CFDs with competitive spreads."
    },
    {
      icon: TrendingUp,
      title: "Volatile Markets",
      description: "Capitalize on cryptocurrency volatility with both long and short positions to profit from market movements."
    },
    {
      icon: Zap,
      title: "Fast Execution",
      description: "Lightning-fast order execution ensures you don't miss opportunities in fast-moving crypto markets."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Use guaranteed stops and risk management tools to protect your capital in volatile crypto markets."
    }
  ];

  const headers = {
    plus500: "Plus500",
    competitor1: "Crypto Exchange A",
    competitor2: "Crypto Exchange B"
  };

  const comparisonRows = [
    {
      feature: "Commission",
      plus500: "No commission",
      competitor1: "0.5% per trade",
      competitor2: "0.25% per trade"
    },
    {
      feature: "Leverage",
      plus500: "Up to 1:30",
      competitor1: "No leverage",
      competitor2: "Up to 1:10"
    },
    {
      feature: "Short selling",
      plus500: true,
      competitor1: false,
      competitor2: false,
      highlighted: true
    },
    {
      feature: "Stop loss guaranteed",
      plus500: true,
      competitor1: false,
      competitor2: false,
      highlighted: true
    },
    {
      feature: "Number of cryptos",
      plus500: "50+",
      competitor1: "200+",
      competitor2: "100+"
    },
    {
      feature: "Minimum deposit",
      plus500: "$100",
      competitor1: "$10",
      competitor2: "$50"
    }
  ];

  const content = (
    <div className="text-muted-foreground space-y-4">
      <p className="text-lg leading-relaxed">
        Cryptocurrency CFD trading allows you to speculate on the price movements of digital currencies 
        without actually owning them. Trade Bitcoin, Ethereum, and other major cryptocurrencies with leverage.
      </p>
      <p>
        With Plus500, you can go long or short on cryptocurrency prices, use advanced risk management tools, 
        and benefit from competitive spreads on all major crypto pairs.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Trade 50+ cryptocurrency CFDs</li>
        <li>No commission fees</li>
        <li>Leverage up to 1:30</li>
        <li>Advanced charting tools</li>
        <li>Risk management features</li>
      </ul>
    </div>
  );

  return (
    <div>
      <HeroBanner
        title="Cryptocurrency Trading"
        subtitle="Trade Bitcoin, Ethereum and 50+ cryptocurrencies as CFDs. Profit from both rising and falling markets with competitive spreads and no commission."
        backgroundImage="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ctaText="Start Crypto Trading"
        secondaryCtaText="Try Demo Account"
        onCtaClick={() => console.log('Start Crypto Trading clicked')}
        onSecondaryCtaClick={() => console.log('Try Demo clicked')}
      />
      
      <CategoryInstrumentsRail
        title="Popular Cryptocurrencies"
        instruments={cryptoInstruments}
      />
      
      <RichTextSection
        title="What is Cryptocurrency CFD Trading?"
        content={content}
        image="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        imageAlt="Cryptocurrency Trading Illustration"
        imagePosition="right"
        backgroundColor="muted"
      />
      
      <BulletList
        title="Why Trade Crypto CFDs with Plus500?"
        items={cryptoFeatures}
        columns={4}
      />
      
      <ComparisonTable
        title="Plus500 vs Traditional Crypto Exchanges"
        subtitle="See why CFD trading offers unique advantages over traditional cryptocurrency exchanges"
        headers={headers}
        rows={comparisonRows}
      />
      
      <CTASection
        title="Start Trading Cryptocurrencies Today"
        subtitle="Access the world's most popular cryptocurrencies with competitive spreads, no commissions, and advanced risk management tools."
        primaryButtonText="Open Crypto Account"
        secondaryButtonText="Practice with Demo"
        onPrimaryClick={() => console.log('Open Crypto Account clicked')}
        onSecondaryClick={() => console.log('Practice with Demo clicked')}
        backgroundVariant="gradient"
      />
    </div>
  );
}