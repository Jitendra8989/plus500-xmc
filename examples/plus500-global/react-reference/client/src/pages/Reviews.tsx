import ReviewSummary from "@/components/ReviewSummary";
import ReviewsGrid from "@/components/ReviewsGrid";
import BulletList from "@/components/BulletList";
import CTASection from "@/components/CTASection";
import { Star, Users, Shield, TrendingUp } from "lucide-react";

export default function Reviews() {
  const ratingBreakdown = [
    { stars: 5, count: 2850, percentage: 68.4 },
    { stars: 4, count: 890, percentage: 21.4 },
    { stars: 3, count: 285, percentage: 6.8 },
    { stars: 2, count: 85, percentage: 2.0 },
    { stars: 1, count: 58, percentage: 1.4 },
  ];

  const allReviews = [
    {
      name: "Sarah Johnson",
      role: "Professional Trader",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "Plus500 has been my go-to platform for over 3 years. The execution is fast, spreads are competitive, and the mobile app is excellent. Highly recommend for both beginners and professionals.",
      date: "2 weeks ago"
    },
    {
      name: "Michael Chen",
      role: "Investment Advisor", 
      avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "The risk management tools are outstanding. I particularly love the guaranteed stop loss feature. Customer service is responsive and the platform is very reliable.",
      date: "1 month ago"
    },
    {
      name: "Alex Rivera",
      role: "Day Trader",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face", 
      rating: 4,
      comment: "Great platform with a clean interface. The charting tools are comprehensive and the market analysis is helpful. Only wish they had more cryptocurrency options.",
      date: "3 weeks ago"
    },
    {
      name: "Emma Thompson",
      role: "Retail Investor",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "As a beginner, I found Plus500 very user-friendly. The demo account helped me learn without risk, and the educational resources are excellent.",
      date: "1 week ago"
    },
    {
      name: "David Wilson",
      role: "Swing Trader",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      rating: 4,
      comment: "Been using Plus500 for 2 years now. The platform is stable, withdrawals are processed quickly, and the customer support team is knowledgeable.",
      date: "4 days ago"
    },
    {
      name: "Lisa Martinez",
      role: "Part-time Trader",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c6024e95?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      comment: "Perfect for someone like me who trades part-time. The mobile app allows me to monitor and trade on the go. Very satisfied with the service.",
      date: "5 days ago"
    }
  ];

  const reviewHighlights = [
    {
      icon: Star,
      title: "Excellent Platform",
      description: "Users consistently praise our intuitive platform design, fast execution, and comprehensive trading tools."
    },
    {
      icon: Users,
      title: "Great Customer Service",
      description: "24/7 support team receives high marks for responsiveness, knowledge, and problem-solving capabilities."
    },
    {
      icon: Shield,
      title: "Trusted & Reliable",
      description: "Traders value our regulatory compliance, security measures, and transparent fee structure."
    },
    {
      icon: TrendingUp,
      title: "Competitive Pricing",
      description: "No commission trading and competitive spreads are frequently mentioned as key advantages."
    }
  ];

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Customer Reviews
          </h1>
          <p className="text-xl text-muted-foreground">
            See what our 25+ million users have to say about their Plus500 trading experience.
          </p>
        </div>
      </div>
      
      <ReviewSummary
        averageRating={4.5}
        totalReviews={4168}
        ratingBreakdown={ratingBreakdown}
        title="What Our Traders Say"
      />
      
      <BulletList
        title="Why Traders Choose Plus500"
        items={reviewHighlights}
        columns={4}
      />
      
      <ReviewsGrid
        title="Recent Reviews"
        reviews={allReviews}
        columns={3}
      />
      
      <CTASection
        title="Join Millions of Satisfied Traders"
        subtitle="Experience the platform that traders around the world trust. Start with a free demo account or open a live account today."
        primaryButtonText="Start Trading Now"
        secondaryButtonText="Try Free Demo"
        onPrimaryClick={() => console.log('Start Trading clicked')}
        onSecondaryClick={() => console.log('Try Demo clicked')}
        backgroundVariant="gradient"
      />
    </div>
  );
}