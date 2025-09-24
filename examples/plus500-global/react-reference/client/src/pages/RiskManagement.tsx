import RichTextSection from "@/components/RichTextSection";
import BulletList from "@/components/BulletList";
import Timeline from "@/components/Timeline";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { Shield, AlertTriangle, TrendingDown, Target } from "lucide-react";

export default function RiskManagement() {
  const riskFeatures = [
    {
      icon: Shield,
      title: "Guaranteed Stop Loss",
      description: "Protect your capital with guaranteed stop losses that ensure your position closes at your predetermined level."
    },
    {
      icon: Target,
      title: "Position Sizing",
      description: "Learn proper position sizing techniques to limit risk per trade and protect your overall portfolio."
    },
    {
      icon: TrendingDown,
      title: "Negative Balance Protection",
      description: "Never lose more than your account balance with our negative balance protection for retail clients."
    },
    {
      icon: AlertTriangle,
      title: "Risk Warnings",
      description: "Real-time risk warnings and margin alerts help you stay informed about your exposure levels."
    }
  ];

  const riskSteps = [
    {
      title: "Define Your Risk Tolerance",
      description: "Assess your financial situation and determine how much capital you can afford to lose without impacting your lifestyle.",
      date: "Step 1",
      completed: true,
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Set Position Limits",
      description: "Never risk more than 1-2% of your account balance on a single trade to preserve capital for future opportunities.",
      date: "Step 2",
      completed: true,
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Use Stop Losses",
      description: "Always set stop losses before entering a trade to limit potential losses and protect your capital.",
      date: "Step 3",
      completed: false,
      icon: <AlertTriangle className="h-6 w-6" />
    },
    {
      title: "Monitor & Adjust",
      description: "Regularly review your risk management strategy and adjust based on performance and changing market conditions.",
      date: "Step 4",
      completed: false,
      icon: <TrendingDown className="h-6 w-6" />
    }
  ];

  const faqs = [
    {
      question: "What is a guaranteed stop loss?",
      answer: "A guaranteed stop loss is an order that ensures your position will be closed at exactly the price you specify, regardless of market gaps or volatility. This provides complete protection against slippage but may come with a small premium."
    },
    {
      question: "How much should I risk per trade?",
      answer: "Most professional traders recommend risking no more than 1-2% of your account balance on any single trade. This allows you to withstand a series of losses without significantly impacting your overall capital."
    },
    {
      question: "What is negative balance protection?",
      answer: "Negative balance protection ensures that retail clients cannot lose more money than they have deposited in their account. If your account balance goes negative due to market movements, Plus500 will reset it to zero."
    },
    {
      question: "How do margin calls work?",
      answer: "A margin call occurs when your account equity falls below the required margin level. Plus500 will send warnings as your margin level decreases, and positions may be automatically closed if margin falls too low."
    },
    {
      question: "What is diversification and why is it important?",
      answer: "Diversification means spreading your trades across different instruments, markets, and strategies to reduce overall portfolio risk. This helps protect against significant losses if one particular market moves against you."
    },
    {
      question: "Can I practice risk management with a demo account?",
      answer: "Yes, our demo account is perfect for practicing risk management techniques with virtual money. You can test different position sizes, stop loss levels, and strategies without risking real capital."
    }
  ];

  const riskContent = (
    <div className="text-muted-foreground space-y-4">
      <p className="text-lg leading-relaxed">
        Risk management is the most important aspect of successful trading. It involves identifying, 
        analyzing, and taking steps to reduce or control the exposure to risk in your trading activities.
      </p>
      <p>
        Effective risk management can mean the difference between long-term trading success and 
        significant financial losses. It's not about avoiding risk entirely, but managing it intelligently.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Never risk more than you can afford to lose</li>
        <li>Use appropriate position sizing for each trade</li>
        <li>Always set stop losses before entering trades</li>
        <li>Diversify across different instruments and strategies</li>
        <li>Keep emotions out of trading decisions</li>
        <li>Regularly review and adjust your risk strategy</li>
      </ul>
    </div>
  );

  const toolsContent = (
    <div className="text-muted-foreground space-y-4">
      <p className="text-lg leading-relaxed">
        Plus500 provides a comprehensive suite of risk management tools designed to help 
        protect your capital and manage your exposure effectively.
      </p>
      <p>
        These tools are integrated directly into our platform, making it easy to implement 
        proper risk management practices with every trade you make.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Guaranteed and standard stop losses</li>
        <li>Take profit orders for profit taking</li>
        <li>Real-time margin and risk monitoring</li>
        <li>Position size calculators</li>
        <li>Negative balance protection</li>
        <li>Risk alerts and notifications</li>
      </ul>
    </div>
  );

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Risk Management
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn essential risk management strategies and tools to protect your capital and trade with confidence.
          </p>
        </div>
      </div>
      
      <RichTextSection
        title="Understanding Trading Risk"
        content={riskContent}
        image="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        imageAlt="Risk Management Fundamentals"
        imagePosition="right"
        backgroundColor="muted"
      />
      
      <BulletList
        title="Risk Management Tools"
        items={riskFeatures}
        columns={4}
      />
      
      <RichTextSection
        title="Plus500 Risk Management Features"
        content={toolsContent}
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        imageAlt="Risk Management Tools"
        imagePosition="left"
        backgroundColor="default"
      />
      
      <Timeline
        title="Risk Management Framework"
        items={riskSteps}
        showProgress={true}
      />
      
      <FAQAccordion
        title="Risk Management FAQ"
        subtitle="Common questions about managing risk in CFD trading"
        faqs={faqs}
        defaultOpen={["item-0"]}
      />
      
      <CTASection
        title="Start Trading with Confidence"
        subtitle="Use our comprehensive risk management tools to protect your capital and trade responsibly."
        primaryButtonText="Open Account"
        secondaryButtonText="Try Risk-Free Demo"
        onPrimaryClick={() => console.log('Open Account clicked')}
        onSecondaryClick={() => console.log('Try Demo clicked')}
        backgroundVariant="gradient"
      />
    </div>
  );
}