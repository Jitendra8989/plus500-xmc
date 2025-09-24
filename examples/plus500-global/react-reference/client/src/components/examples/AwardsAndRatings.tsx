import AwardsAndRatings from '../AwardsAndRatings';
import { Star, Shield, Award, CheckCircle } from 'lucide-react';

export default function AwardsAndRatingsExample() {
  // todo: remove mock functionality
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

  return (
    <AwardsAndRatings
      title="Awards & Recognition"
      awards={awards}
      columns={4}
    />
  );
}