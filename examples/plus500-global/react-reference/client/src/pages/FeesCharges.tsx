import RichTextSection from "@/components/RichTextSection";
import ComparisonTable from "@/components/ComparisonTable";
import BulletList from "@/components/BulletList";
import FAQAccordion from "@/components/FAQAccordion";
import { DollarSign, Shield, Clock, TrendingUp } from "lucide-react";

export default function FeesCharges() {
  const headers = {
    plus500: "Plus500",
    competitor1: "Broker A",
    competitor2: "Broker B"
  };

  const feeComparison = [
    {
      feature: "Commission on trades",
      plus500: "No commission",
      competitor1: "$7 per trade",
      competitor2: "$5 per trade",
      highlighted: true
    },
    {
      feature: "Account opening fee",
      plus500: "Free",
      competitor1: "Free",
      competitor2: "$25"
    },
    {
      feature: "Account maintenance",
      plus500: "Free",
      competitor1: "$10/month",
      competitor2: "Free"
    },
    {
      feature: "Withdrawal fee",
      plus500: "Free",
      competitor1: "$25",
      competitor2: "$15"
    },
    {
      feature: "Inactivity fee",
      plus500: "$10/month after 3 months",
      competitor1: "$20/month after 6 months",
      competitor2: "$15/month after 12 months"
    },
    {
      feature: "Currency conversion",
      plus500: "0.7%",
      competitor1: "1.5%",
      competitor2: "1.0%"
    }
  ];

  const feeFeatures = [
    {
      icon: DollarSign,
      title: "No Commission Trading",
      description: "Trade thousands of instruments without paying commission fees. We earn through competitive spreads only."
    },
    {
      icon: Shield,
      title: "Transparent Pricing",
      description: "All costs are clearly displayed before you trade. No hidden fees or surprise charges on your account."
    },
    {
      icon: Clock,
      title: "Overnight Financing",
      description: "Small overnight financing charges apply only to positions held after market close. Rates are competitive and clearly displayed."
    },
    {
      icon: TrendingUp,
      title: "Competitive Spreads",
      description: "Benefit from tight spreads across all major markets, from forex and commodities to stocks and cryptocurrencies."
    }
  ];

  const faqs = [
    {
      question: "How does Plus500 make money without charging commission?",
      answer: "Plus500 makes money through the spread - the difference between the buy and sell price of an instrument. This model allows us to offer commission-free trading while maintaining competitive pricing."
    },
    {
      question: "What are overnight financing charges?",
      answer: "Overnight financing is charged on positions held after market close. The rate varies by instrument and is clearly displayed in the platform. You can close positions before market close to avoid these charges."
    },
    {
      question: "Are there any deposit or withdrawal fees?",
      answer: "Plus500 does not charge deposit or withdrawal fees. However, your bank or payment provider may charge fees for processing payments."
    },
    {
      question: "What is the inactivity fee?",
      answer: "If your account remains inactive for 3 months, a monthly fee of $10 may be charged. You can avoid this by logging into your account or making a trade at least once every 3 months."
    },
    {
      question: "Are there fees for currency conversion?",
      answer: "A small currency conversion fee of 0.7% applies when depositing or withdrawing in a currency different from your account base currency."
    },
    {
      question: "How can I see all charges before trading?",
      answer: "All costs including spreads, overnight financing, and any applicable charges are displayed in the trading platform before you open a position. There are no hidden fees."
    }
  ];

  const content = (
    <div className="text-muted-foreground space-y-4">
      <p className="text-lg leading-relaxed">
        Plus500 offers transparent, competitive pricing with no commission on trades. 
        Our fee structure is designed to be simple and easy to understand.
      </p>
      <p>
        We make money through competitive spreads rather than charging commission, 
        which means you can trade without worrying about per-trade costs eating into your profits.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>No commission on any trades</li>
        <li>Free account opening and maintenance</li>
        <li>No deposit or withdrawal fees</li>
        <li>Competitive spreads across all markets</li>
        <li>Transparent overnight financing rates</li>
        <li>Clear pricing displayed before trading</li>
      </ul>
    </div>
  );

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transparent Fees & Charges
          </h1>
          <p className="text-xl text-muted-foreground">
            Trade with confidence knowing exactly what you'll pay. No hidden fees, no commission, just competitive spreads.
          </p>
        </div>
      </div>
      
      <RichTextSection
        title="Simple, Transparent Pricing"
        content={content}
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        imageAlt="Financial calculator and charts representing transparent pricing"
        imagePosition="right"
        backgroundColor="muted"
      />
      
      <BulletList
        title="Why Our Pricing Model Works"
        items={feeFeatures}
        columns={4}
      />
      
      <ComparisonTable
        title="Fee Comparison"
        subtitle="See how Plus500's fee structure compares to other leading brokers"
        headers={headers}
        rows={feeComparison}
      />
      
      <FAQAccordion
        title="Frequently Asked Questions"
        subtitle="Common questions about fees and charges"
        faqs={faqs}
        defaultOpen={["item-0"]}
      />
    </div>
  );
}