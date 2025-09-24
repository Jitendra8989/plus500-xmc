import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Import all components
import HeroBanner from "@/components/HeroBanner";
import ReviewsGrid from "@/components/ReviewsGrid";
import BulletList from "@/components/BulletList";
import ComparisonTable from "@/components/ComparisonTable";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import Timeline from "@/components/Timeline";
import AwardsAndRatings from "@/components/AwardsAndRatings";
import LearningCards from "@/components/LearningCards";
import CategoryInstrumentsRail from "@/components/CategoryInstrumentsRail";
import RichTextSection from "@/components/RichTextSection";

import { Package, Layout, Users, Navigation, Library, Code, Eye, EyeOff } from "lucide-react";

interface ComponentShowcaseProps {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  code?: string;
}

function ComponentShowcase({ title, description, category, children, code }: ComponentShowcaseProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              <Badge variant="secondary">{category}</Badge>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {code && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCode(!showCode)}
              data-testid={`button-toggle-code-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showCode ? 'Hide' : 'Show'} Code
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg p-4 bg-muted/50">
          {children}
        </div>
        {code && showCode && (
          <div className="bg-muted rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ComponentLibrary() {
  // Sample data for components
  const sampleReviews = [
    {
      name: "Sarah Johnson",
      role: "Professional Trader",
      comment: "Plus500 has transformed my trading experience. The platform is intuitive and the execution is lightning fast.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Mike Chen",
      role: "Day Trader",
      comment: "The risk management tools are excellent. I feel confident trading with Plus500's platform.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
    }
  ];

  const sampleBulletItems = [
    {
      icon: Package,
      title: "Advanced Trading",
      description: "Access professional-grade trading tools and real-time market data."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get help from our experienced customer support team whenever you need it."
    }
  ];

  const sampleInstruments = [
    { symbol: "BTC", name: "Bitcoin", price: 43567.89, change: 1234.56, changePercent: 2.91 },
    { symbol: "ETH", name: "Ethereum", price: 2845.32, change: -45.23, changePercent: -1.56 },
    { symbol: "AAPL", name: "Apple Inc", price: 189.45, change: 3.21, changePercent: 1.72 }
  ];

  const sampleComparisonHeaders = {
    plus500: "Plus500",
    competitor1: "Competitor A",
    competitor2: "Competitor B"
  };

  const sampleComparisonRows = [
    {
      feature: "Commission",
      plus500: "No commission",
      competitor1: "$7 per trade",
      competitor2: "$5 per trade",
      highlighted: true
    },
    {
      feature: "Minimum deposit",
      plus500: "$100",
      competitor1: "$500",
      competitor2: "$250"
    }
  ];

  const sampleFAQs = [
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply create an account, verify your identity, and make your first deposit to begin trading."
    },
    {
      question: "Is my money safe?",
      answer: "Yes, Plus500 is regulated by top-tier authorities and uses advanced security measures to protect your funds."
    }
  ];

  const sampleTimelineItems = [
    {
      title: "Account Creation",
      description: "Sign up and verify your account",
      date: "Step 1",
      completed: true,
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "First Deposit",
      description: "Fund your account to start trading",
      date: "Step 2",
      completed: false,
      icon: <Package className="h-6 w-6" />
    }
  ];

  const sampleAwards = [
    {
      title: "Best Trading Platform",
      description: "Recognized for excellence in trading technology",
      year: "2024",
      icon: <Package className="h-8 w-8 text-primary" />
    }
  ];

  const sampleLearningCards = [
    {
      title: "Trading Basics",
      description: "Learn the fundamentals of CFD trading",
      duration: "30 min",
      level: "Beginner" as const,
      category: "Getting Started",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const categoryIcons = {
    Business: Package,
    UI: Layout,
    Layout: Library,
    Navigation: Navigation,
    Form: Code
  };

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Component Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore all available components with their variants and configurations. 
              This showcase demonstrates how each component looks and behaves in different contexts.
            </p>
          </motion.div>

          <Tabs defaultValue="business" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 gap-4">
              <TabsTrigger value="business" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Business
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="ui" className="flex items-center gap-2">
                <Library className="h-4 w-4" />
                UI
              </TabsTrigger>
              <TabsTrigger value="navigation" className="flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                Navigation
              </TabsTrigger>
              <TabsTrigger value="form" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Form
              </TabsTrigger>
            </TabsList>

            {/* Business Components */}
            <TabsContent value="business" className="space-y-8">
              <ComponentShowcase
                title="Hero Banner"
                description="Prominent banner with title, subtitle, background image and call-to-action buttons"
                category="Business"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Default Hero Banner</h3>
                    <HeroBanner
                      title="Welcome to Plus500"
                      subtitle="Start trading CFDs on shares, indices, commodities and more"
                      backgroundImage="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      ctaText="Start Trading"
                      secondaryCtaText="Try Demo"
                      onCtaClick={() => console.log('CTA clicked')}
                      onSecondaryCtaClick={() => console.log('Secondary CTA clicked')}
                    />
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Minimal Hero Banner</h3>
                    <HeroBanner
                      title="Simple Hero"
                      subtitle="Clean and minimal design"
                      backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      ctaText="Get Started"
                      onCtaClick={() => console.log('CTA clicked')}
                    />
                  </div>
                </div>
              </ComponentShowcase>

              <ComponentShowcase
                title="Reviews Grid"
                description="Customer reviews in responsive grid layout with ratings and avatars"
                category="Business"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">2 Column Reviews</h3>
                    <ReviewsGrid
                      title="Customer Reviews"
                      reviews={sampleReviews}
                      columns={2}
                    />
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Single Column Reviews</h3>
                    <ReviewsGrid
                      title="What Our Customers Say"
                      reviews={sampleReviews.slice(0, 1)}
                      columns={1}
                    />
                  </div>
                </div>
              </ComponentShowcase>

              <ComponentShowcase
                title="Bullet List"
                description="Feature list with icons, titles, and descriptions"
                category="Business"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">2 Column Layout</h3>
                    <BulletList
                      title="Key Features"
                      items={sampleBulletItems}
                      columns={2}
                    />
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Single Column Layout</h3>
                    <BulletList
                      title="Platform Benefits"
                      items={sampleBulletItems}
                      columns={1}
                    />
                  </div>
                </div>
              </ComponentShowcase>

              <ComponentShowcase
                title="Category Instruments Rail"
                description="Horizontal scrollable rail showing financial instruments with prices"
                category="Business"
              >
                <CategoryInstrumentsRail
                  title="Popular Instruments"
                  instruments={sampleInstruments}
                />
              </ComponentShowcase>

              <ComponentShowcase
                title="CTA Section"
                description="Call-to-action section with gradient background and buttons"
                category="Business"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Gradient Background</h3>
                    <CTASection
                      title="Ready to Start Trading?"
                      subtitle="Join millions of traders worldwide"
                      primaryButtonText="Open Account"
                      secondaryButtonText="Try Demo"
                      onPrimaryClick={() => console.log('Primary clicked')}
                      onSecondaryClick={() => console.log('Secondary clicked')}
                      backgroundVariant="gradient"
                    />
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Solid Background</h3>
                    <CTASection
                      title="Learn More About Trading"
                      subtitle="Access our educational resources"
                      primaryButtonText="Start Learning"
                      onPrimaryClick={() => console.log('Primary clicked')}
                      backgroundVariant="solid"
                    />
                  </div>
                </div>
              </ComponentShowcase>
            </TabsContent>

            {/* Layout Components */}
            <TabsContent value="layout" className="space-y-8">
              <ComponentShowcase
                title="Rich Text Section"
                description="Content section with text and optional image positioning"
                category="Layout"
              >
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Image on Right</h3>
                    <RichTextSection
                      title="About Plus500"
                      content={
                        <div className="text-muted-foreground space-y-4">
                          <p>Plus500 is a leading fintech company that has been operating since 2008.</p>
                          <ul className="list-disc list-inside space-y-2">
                            <li>25+ million registered users</li>
                            <li>50+ countries worldwide</li>
                            <li>Multi-regulated platform</li>
                          </ul>
                        </div>
                      }
                      image="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                      imageAlt="About Plus500"
                      imagePosition="right"
                    />
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Image on Left</h3>
                    <RichTextSection
                      title="Our Platform"
                      content={
                        <div className="text-muted-foreground">
                          <p>Experience professional-grade trading with our advanced platform.</p>
                        </div>
                      }
                      image="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                      imageAlt="Trading Platform"
                      imagePosition="left"
                      backgroundColor="muted"
                    />
                  </div>
                </div>
              </ComponentShowcase>

              <ComponentShowcase
                title="Comparison Table"
                description="Feature comparison table with highlighting"
                category="Layout"
              >
                <ComparisonTable
                  title="Platform Comparison"
                  subtitle="See how Plus500 compares to competitors"
                  headers={sampleComparisonHeaders}
                  rows={sampleComparisonRows}
                />
              </ComponentShowcase>

              <ComponentShowcase
                title="Timeline"
                description="Process timeline with progress tracking"
                category="Layout"
              >
                <Timeline
                  title="Getting Started"
                  items={sampleTimelineItems}
                  showProgress={true}
                />
              </ComponentShowcase>
            </TabsContent>

            {/* UI Components */}
            <TabsContent value="ui" className="space-y-8">
              <ComponentShowcase
                title="Awards and Ratings"
                description="Award showcase with icons and descriptions"
                category="UI"
              >
                <AwardsAndRatings
                  title="Recognition & Awards"
                  awards={sampleAwards}
                  columns={2}
                />
              </ComponentShowcase>

              <ComponentShowcase
                title="Learning Cards"
                description="Educational content cards with difficulty levels"
                category="UI"
              >
                <LearningCards
                  title="Featured Courses"
                  subtitle="Start your trading education"
                  cards={sampleLearningCards}
                  columns={1}
                  onCardClick={(card) => console.log('Card clicked:', card.title)}
                />
              </ComponentShowcase>

              <ComponentShowcase
                title="FAQ Accordion"
                description="Collapsible FAQ sections"
                category="UI"
              >
                <FAQAccordion
                  title="Frequently Asked Questions"
                  subtitle="Common questions about trading"
                  faqs={sampleFAQs}
                  defaultOpen={["item-0"]}
                />
              </ComponentShowcase>
            </TabsContent>

            {/* Navigation Components */}
            <TabsContent value="navigation" className="space-y-8">
              <ComponentShowcase
                title="Header"
                description="Site navigation header with menus and CTAs"
                category="Navigation"
              >
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    The header component is visible at the top of every page with navigation menus, 
                    logo, and action buttons.
                  </p>
                </div>
              </ComponentShowcase>

              <ComponentShowcase
                title="Footer"
                description="Site footer with links and company information"
                category="Navigation"
              >
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    The footer component appears at the bottom of every page with links, 
                    copyright information, and company details.
                  </p>
                </div>
              </ComponentShowcase>
            </TabsContent>

            {/* Form Components */}
            <TabsContent value="form" className="space-y-8">
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">Form Components</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Form components include various UI elements like buttons, inputs, cards, and other 
                  interactive elements that are used throughout the application. These are built using 
                  shadcn/ui components and are available in the /components/ui directory.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button>Primary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}