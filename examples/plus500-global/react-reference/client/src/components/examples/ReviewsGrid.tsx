import ReviewsGrid from '../ReviewsGrid';

export default function ReviewsGridExample() {
  // todo: remove mock functionality
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Professional Trader",
      avatar: "/images/Female_testimonial_headshot_798b5861.png",
      rating: 5,
      comment: "Plus500 has been my go-to platform for over 3 years. The execution is fast, spreads are competitive, and the mobile app is excellent. Highly recommend for both beginners and professionals.",
      date: "2 weeks ago"
    },
    {
      name: "Michael Chen",
      role: "Investment Advisor", 
      avatar: "/images/Male_testimonial_headshot_96315fbe.png",
      rating: 5,
      comment: "The risk management tools are outstanding. I particularly love the guaranteed stop loss feature. Customer service is responsive and the platform is very reliable.",
      date: "1 month ago"
    },
    {
      name: "Alex Rivera",
      role: "Day Trader",
      avatar: "/images/Young_professional_headshot_4a1ade06.png", 
      rating: 4,
      comment: "Great platform with a clean interface. The charting tools are comprehensive and the market analysis is helpful. Only wish they had more cryptocurrency options.",
      date: "3 weeks ago"
    }
  ];

  return (
    <ReviewsGrid
      title="What Our Traders Say"
      reviews={reviews}
      columns={3}
    />
  );
}