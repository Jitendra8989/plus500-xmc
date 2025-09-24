import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Review {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date?: string;
}

interface ReviewsGridProps {
  reviews: Review[];
  title?: string;
  columns?: 1 | 2 | 3;
}

export default function ReviewsGrid({
  reviews,
  title = "Customer Reviews",
  columns = 3,
}: ReviewsGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            {title}
          </motion.h2>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid ${columnClasses[columns]} gap-8`}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card p-6 rounded-lg border hover-elevate group relative"
              data-testid={`review-card-${index}`}
            >
              <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/20" />
              
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  data-testid={`avatar-${index}`}
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {renderStars(review.rating)}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                "{review.comment}"
              </p>

              {review.date && (
                <div className="text-xs text-muted-foreground">
                  {review.date}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}