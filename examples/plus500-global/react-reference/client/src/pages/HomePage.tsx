import HeroBanner from "@/components/HeroBanner";
import BulletList from "@/components/BulletList";
import CategoryInstrumentsRail from "@/components/CategoryInstrumentsRail";
import AwardsAndRatings from "@/components/AwardsAndRatings";
import ReviewsGrid from "@/components/ReviewsGrid";
import CTASection from "@/components/CTASection";
import { Shield, Clock, Globe, TrendingUp, Star, Award, CheckCircle } from "lucide-react";

export default function HomePage() {
  // todo: remove mock functionality
  const features = [
    {
      icon: Shield,
      title: "Regulated & Secure",
      description: "FCA, CySEC, ASIC regulated with client funds protection and negative balance protection."
    },
    {
      icon: Clock,
      title: "24/7 Trading",
      description: "Trade major markets around the clock with our advanced platform and mobile apps."
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access thousands of instruments across forex, stocks, commodities, crypto and indices."
    },
    {
      icon: TrendingUp,
      title: "Competitive Spreads",
      description: "Enjoy tight spreads and no commission fees on our comprehensive range of CFDs."
    }
  ];

  const topInstruments = [
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
      symbol: "AAPL",
      name: "Apple Inc",
      price: 189.76,
      change: 3.21,
      changePercent: 1.72
    },
    {
      symbol: "EUR/USD",
      name: "Euro/US Dollar",
      price: 1.0852,
      change: 0.0023,
      changePercent: 0.21
    }
  ];

  const awards = [
    {
      title: "Best Trading Platform",
      description: "Awarded for excellence in trading platform innovation and user experience",
      year: "2024",
      icon: <Award className="h-8 w-8 text-primary" />
    },
    {
      title: "5-Star Rating",
      description: "Consistently rated 5 stars by traders for reliability and performance", 
      year: "2024",
      icon: <Star className="h-8 w-8 text-primary" />
    },
    {
      title: "Regulated & Licensed",
      description: "Fully regulated by FCA, CySEC, and ASIC for maximum security",
      icon: <Shield className="h-8 w-8 text-primary" />
    },
    {
      title: "Trusted by Millions",
      description: "Over 25 million registered users worldwide trust our platform",
      icon: <CheckCircle className="h-8 w-8 text-primary" />
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Professional Trader",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "Plus500 has been my go-to platform for over 3 years. The execution is fast, spreads are competitive, and the mobile app is excellent.",
      date: "2 weeks ago"
    },
    {
      name: "Michael Chen",
      role: "Investment Advisor", 
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "The risk management tools are outstanding. I particularly love the guaranteed stop loss feature. Customer service is responsive.",
      date: "1 month ago"
    },
    {
      name: "Alex Rivera",
      role: "Day Trader",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face", 
      rating: 4,
      comment: "Great platform with a clean interface. The charting tools are comprehensive and the market analysis is helpful.",
      date: "3 weeks ago"
    }
  ];

  return (
    <div>
      <HeroBanner
        title="Trade with Confidence"
        subtitle="Join millions of traders worldwide on Plus500's award-winning platform. Trade CFDs on shares, forex, commodities, cryptocurrencies and more."
        backgroundImage="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
        ctaText="Start Trading Now"
        secondaryCtaText="Try Free Demo"
        onCtaClick={() => console.log('Start Trading clicked')}
        onSecondaryCtaClick={() => console.log('Try Demo clicked')}
      />
      
      <BulletList
        title="Why Choose Plus500?"
        items={features}
        columns={4}
      />
      
      <CategoryInstrumentsRail
        title="Popular Trading Instruments"
        instruments={topInstruments}
      />
      
      <AwardsAndRatings
        title="Awards & Recognition"
        awards={awards}
        columns={4}
      />
      
      <ReviewsGrid
        title="What Our Traders Say"
        reviews={reviews}
        columns={3}
      />
      
      <CTASection
        title="Ready to Start Trading?"
        subtitle="Join over 25 million users who trust Plus500. Start with a free demo account and learn to trade with virtual money, or dive right in with a live account."
        primaryButtonText="Open Live Account"
        secondaryButtonText="Try Free Demo"
        onPrimaryClick={() => console.log('Open Live Account clicked')}
        onSecondaryClick={() => console.log('Try Free Demo clicked')}
        backgroundVariant="gradient"
      />
    </div>
  );
}