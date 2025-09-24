import React from "react";
import {
  Text,
  NextImage as ContentSdkImage,
  useSitecore
} from '@sitecore-content-sdk/nextjs';
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { TestimonialGridProps } from './testimonialsgrid.props';

// Helper function to parse percentage and convert to star rating
const parsePercentageToStars = (percentageString: string | undefined) => {
  if (!percentageString || typeof percentageString !== 'string') return 5; // Default to 5 stars

  // Extract number from percentage string (e.g., "5%" -> 5)
  const match = percentageString.match(/(\d+)/);
  if (match) {
    const percentage = parseInt(match[1]);
    // Convert percentage to star rating (assuming 1-5 scale)
    return Math.min(5, Math.max(1, percentage));
  }

  return 5; // Default to 5 stars
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

export const Default: React.FC<TestimonialGridProps> = (props) => {
  const { page } = useSitecore();

  if (!props) {
    return null;
  }

  const isEditing = page.mode.isEditing;
  const { fields } = props;
  const heading = fields?.Heading?.value;
  const items = fields?.Items || [];
  const columns = fields?.Columns?.value || 3;

  // Safety check for items
  if (!items || !Array.isArray(items)) {
    return null;
  }

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        {heading && (
          <div className="text-center mb-12">
            {isEditing ? (
              <Text
                field={fields?.Heading}
                tag="h2"
                className="text-3xl md:text-4xl font-bold"
              />
            ) : (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold"
              >
                {heading}
              </motion.h2>
            )}
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid ${columnClasses[columns as keyof typeof columnClasses]} gap-8`}
        >
          {items.map((item, index) => {
            if (!item || !item.fields) {
              return null;
            }

            const name = item?.fields?.Text?.value || '';
            const quote = item?.fields?.Subtext?.value || '';
            const avatar = item?.fields?.Icon;
            const profession = item?.fields?.Money?.value || '';
            const percentageString = item?.fields?.Percentage?.value;
            const rating = parsePercentageToStars(percentageString);

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-card p-6 rounded-lg border hover-elevate group relative"
                data-testid={`review-card-${index}`}
              >
                <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/20" />

                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 flex-shrink-0">
                    {isEditing ? (
                      avatar && (
                        <ContentSdkImage
                          field={avatar}
                          className="w-12 h-12 rounded-full object-cover"
                          width={48}
                          height={48}
                          alt="Profile"
                        />
                      )
                    ) : (
                      avatar?.value?.src && (
                        <img
                          src={avatar.value.src}
                          alt={avatar.value.alt || name || "Profile"}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )
                    )}
                  </div>
                  <div>
                    {name && (
                      <h4 className="font-semibold">
                        {isEditing ? (
                          item.fields?.Text && (
                            <Text
                              field={item.fields.Text}
                              tag="span"
                            />
                          )
                        ) : (
                          name
                        )}
                      </h4>
                    )}
                    {profession && (
                      <p className="text-sm text-muted-foreground">
                        {isEditing ? (
                          item.fields?.Money && (
                            <Text
                              field={item.fields.Money}
                              tag="span"
                            />
                          )
                        ) : (
                          profession
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex mb-3">
                  {renderStars(rating)}
                </div>

                {quote && (
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {isEditing ? (
                      item.fields?.Subtext && (
                        <Text
                          field={item.fields.Subtext}
                          tag="span"
                        />
                      )
                    ) : (
                      quote
                    )}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};