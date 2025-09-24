import LearningCards from '../LearningCards';

export default function LearningCardsExample() {
  // todo: remove mock functionality
  const learningCards = [
    {
      title: "Introduction to CFD Trading",
      description: "Learn the fundamentals of Contract for Difference trading, including how CFDs work, benefits, and basic terminology.",
      duration: "30 min",
      level: "Beginner" as const,
      category: "Trading Basics",
      image: "/images/Financial_education_illustration_acde0a9d.png"
    },
    {
      title: "Risk Management Strategies",
      description: "Master essential risk management techniques including stop losses, position sizing, and portfolio diversification.",
      duration: "45 min", 
      level: "Intermediate" as const,
      category: "Risk Management",
      image: "/images/Financial_education_illustration_acde0a9d.png"
    },
    {
      title: "Technical Analysis Masterclass",
      description: "Advanced charting techniques, indicators, and pattern recognition to improve your trading decisions.",
      duration: "90 min",
      level: "Advanced" as const,
      category: "Technical Analysis",
      image: "/images/Crypto_trading_illustration_e904d10e.png"
    },
    {
      title: "Forex Trading Fundamentals",
      description: "Understanding currency pairs, pip values, leverage, and the factors that move the forex markets.",
      duration: "60 min",
      level: "Beginner" as const,
      category: "Forex",
      image: "/images/Crypto_trading_illustration_e904d10e.png"
    },
    {
      title: "Cryptocurrency Trading Guide",
      description: "Navigate the volatile crypto markets with confidence. Learn about major cryptocurrencies and trading strategies.",
      duration: "50 min",
      level: "Intermediate" as const,
      category: "Cryptocurrency",
      image: "/images/Crypto_trading_illustration_e904d10e.png"
    },
    {
      title: "Psychology of Trading",
      description: "Overcome emotional barriers and develop the mental discipline required for successful trading.",
      duration: "40 min",
      level: "Intermediate" as const,
      category: "Trading Psychology",
      image: "/images/Financial_education_illustration_acde0a9d.png"
    }
  ];

  return (
    <LearningCards
      title="Trading Academy"
      subtitle="Enhance your trading knowledge with our comprehensive educational resources"
      cards={learningCards}
      columns={3}
      onCardClick={(card) => console.log('Learning card clicked:', card.title)}
    />
  );
}