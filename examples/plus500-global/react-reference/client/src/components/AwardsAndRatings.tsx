import { motion } from "framer-motion";
import { Star, Award, Shield, CheckCircle } from "lucide-react";

interface AwardData {
  title: string;
  description: string;
  year?: string;
  logo?: string;
  icon?: React.ReactNode;
}

interface AwardsAndRatingsProps {
  title?: string;
  awards: AwardData[];
  columns?: 2 | 3 | 4;
}

export default function AwardsAndRatings({
  title = "Awards & Recognition",
  awards,
  columns = 4,
}: AwardsAndRatingsProps) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
          {awards.map((award, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 rounded-lg border bg-card hover-elevate group"
              data-testid={`award-item-${index}`}
            >
              <div className="mb-4 flex justify-center">
                {award.logo ? (
                  <img
                    src={award.logo}
                    alt={award.title}
                    className="h-16 w-auto object-contain"
                  />
                ) : (
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {award.icon || <Award className="h-8 w-8 text-primary" />}
                  </div>
                )}
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{award.title}</h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                {award.description}
              </p>
              
              {award.year && (
                <div className="text-xs text-muted-foreground font-medium">
                  {award.year}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}