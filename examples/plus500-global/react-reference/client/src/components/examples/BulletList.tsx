import BulletList from '../BulletList';
import { Shield, Clock, Globe, TrendingUp } from 'lucide-react';

export default function BulletListExample() {
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

  return (
    <BulletList
      title="Why Choose Plus500?"
      items={features}
      columns={2}
    />
  );
}