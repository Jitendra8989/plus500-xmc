import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    stars: number;
    count: number;
    percentage: number;
  }[];
  title?: string;
}

export default function ReviewSummary({
  averageRating,
  totalReviews,
  ratingBreakdown,
  title = "Customer Reviews",
}: ReviewSummaryProps) {
  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const starSize = size === "lg" ? "h-6 w-6" : "h-4 w-4";

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className={`${starSize} fill-yellow-400 text-yellow-400`} />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className={`${starSize} text-gray-300`} />
          <Star
            className={`${starSize} fill-yellow-400 text-yellow-400 absolute top-0 left-0`}
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />
      );
    }

    return stars;
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Summary Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="mb-4">
                <div className="text-5xl font-bold text-primary mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center lg:justify-start mb-2">
                  {renderStars(averageRating, "lg")}
                </div>
                <p className="text-muted-foreground">
                  Based on {totalReviews.toLocaleString()} reviews
                </p>
              </div>
            </motion.div>

            {/* Rating Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {ratingBreakdown.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{rating.stars}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${rating.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-yellow-400 h-2 rounded-full"
                    />
                  </div>
                  
                  <div className="w-16 text-right">
                    <span className="text-sm text-muted-foreground">
                      {rating.count}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}