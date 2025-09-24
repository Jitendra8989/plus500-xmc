import Timeline from '../Timeline';
import { UserPlus, CreditCard, TrendingUp, Shield } from 'lucide-react';

export default function TimelineExample() {
  // todo: remove mock functionality
  const steps = [
    {
      title: "Create Account",
      description: "Sign up for your Plus500 account in minutes with just your email and basic information. No paperwork required.",
      date: "Step 1",
      completed: true,
      icon: <UserPlus className="h-6 w-6" />
    },
    {
      title: "Verify Identity", 
      description: "Quick identity verification process to ensure security and compliance. Upload a photo ID and proof of address.",
      date: "Step 2",
      completed: true,
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Fund Account",
      description: "Deposit funds using credit card, bank transfer, or e-wallet. Minimum deposit starts from just $100.",
      date: "Step 3", 
      completed: false,
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      title: "Start Trading",
      description: "Begin trading CFDs on thousands of instruments including stocks, forex, commodities, and cryptocurrencies.",
      date: "Step 4",
      completed: false,
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  return (
    <Timeline
      title="How to Get Started"
      items={steps}
      showProgress={true}
    />
  );
}