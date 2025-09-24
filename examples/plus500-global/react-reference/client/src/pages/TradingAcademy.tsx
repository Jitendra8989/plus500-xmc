import HeroBanner from "@/components/HeroBanner";
import LearningCards from "@/components/LearningCards";
import BulletList from "@/components/BulletList";
import CTASection from "@/components/CTASection";
import { BookOpen, Video, Users, Award } from "lucide-react";

export default function TradingAcademy() {
  const learningCards = [
    {
      title: "Introduction to CFD Trading",
      description: "Learn the fundamentals of Contract for Difference trading, including how CFDs work, benefits, and basic terminology.",
      duration: "30 min",
      level: "Beginner" as const,
      category: "Trading Basics",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Risk Management Strategies",
      description: "Master essential risk management techniques including stop losses, position sizing, and portfolio diversification.",
      duration: "45 min", 
      level: "Intermediate" as const,
      category: "Risk Management",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Technical Analysis Masterclass",
      description: "Advanced charting techniques, indicators, and pattern recognition to improve your trading decisions.",
      duration: "90 min",
      level: "Advanced" as const,
      category: "Technical Analysis",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Forex Trading Fundamentals",
      description: "Understanding currency pairs, pip values, leverage, and the factors that move the forex markets.",
      duration: "60 min",
      level: "Beginner" as const,
      category: "Forex",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Cryptocurrency Trading Guide",
      description: "Navigate the volatile crypto markets with confidence. Learn about major cryptocurrencies and trading strategies.",
      duration: "50 min",
      level: "Intermediate" as const,
      category: "Cryptocurrency",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Psychology of Trading",
      description: "Overcome emotional barriers and develop the mental discipline required for successful trading.",
      duration: "40 min",
      level: "Intermediate" as const,
      category: "Trading Psychology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Advanced Options Strategies",
      description: "Explore complex options trading strategies including spreads, straddles, and covered calls.",
      duration: "75 min",
      level: "Advanced" as const,
      category: "Options Trading",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Market Analysis & Research",
      description: "Learn how to analyze market trends, read economic indicators, and make informed trading decisions.",
      duration: "55 min",
      level: "Intermediate" as const,
      category: "Market Analysis",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Building a Trading Plan",
      description: "Create a comprehensive trading plan with clear goals, strategies, and risk management rules.",
      duration: "35 min",
      level: "Beginner" as const,
      category: "Trading Strategy",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const academyFeatures = [
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description: "Over 50 educational courses covering everything from basic trading concepts to advanced strategies."
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "High-quality video content with step-by-step instructions and real-world trading examples."
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from professional traders and market analysts with years of experience in financial markets."
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn completion certificates for courses and track your progress through our learning pathway."
    }
  ];

  return (
    <div>
      <HeroBanner
        title="Trading Academy"
        subtitle="Master the art of trading with our comprehensive educational resources. From beginner basics to advanced strategies, learn at your own pace."
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        ctaText="Start Learning"
        secondaryCtaText="Browse Courses"
        onCtaClick={() => console.log('Start Learning clicked')}
        onSecondaryCtaClick={() => console.log('Browse Courses clicked')}
      />
      
      <BulletList
        title="Why Choose Plus500 Academy"
        items={academyFeatures}
        columns={4}
      />
      
      <LearningCards
        title="Popular Courses"
        subtitle="Enhance your trading knowledge with our expert-designed courses"
        cards={learningCards}
        columns={3}
        onCardClick={(card) => console.log('Course clicked:', card.title)}
      />
      
      <CTASection
        title="Ready to Become a Better Trader?"
        subtitle="Join thousands of traders who have improved their skills through our comprehensive trading education program."
        primaryButtonText="Start Your Journey"
        secondaryButtonText="View All Courses"
        onPrimaryClick={() => console.log('Start Journey clicked')}
        onSecondaryClick={() => console.log('View All Courses clicked')}
        backgroundVariant="gradient"
      />
    </div>
  );
}