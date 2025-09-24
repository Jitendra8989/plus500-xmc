import ReviewSummary from '../ReviewSummary';

export default function ReviewSummaryExample() {
  // todo: remove mock functionality
  const ratingBreakdown = [
    { stars: 5, count: 2850, percentage: 68.4 },
    { stars: 4, count: 890, percentage: 21.4 },
    { stars: 3, count: 285, percentage: 6.8 },
    { stars: 2, count: 85, percentage: 2.0 },
    { stars: 1, count: 58, percentage: 1.4 },
  ];

  return (
    <ReviewSummary
      averageRating={4.5}
      totalReviews={4168}
      ratingBreakdown={ratingBreakdown}
      title="What Our Traders Say"
    />
  );
}