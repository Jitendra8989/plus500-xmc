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

  // Safety check for items - don't render if no items and not in editing mode
  if ((!items || !Array.isArray(items)) && !isEditing) {
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
        <div className="text-center mb-12">
          {isEditing ? (
            <Text
              field={fields?.Heading || { value: '' }}
              tag="h2"
              className="text-3xl md:text-4xl font-bold rtl:text-right ltr:text-left"
            />
          ) : (
            heading && <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold rtl:text-right ltr:text-left"
            >
              {heading}
            </motion.h2>
          )}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid ${columnClasses[columns as keyof typeof columnClasses]} gap-8`}
          dir="ltr"
        >
          {isEditing && (!items || items.length === 0) ? (
            <div className="min-h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 bg-gray-50 col-span-full">
              {/* Empty div for selecting component in page editor */}
            </div>
          ) : (
            (items || isEditing) && items.map((item, index) => {
              // In editing mode, show all items even if fields are empty
              // In production, skip invalid items
              if (!isEditing && (!item || !item.fields)) {
                return null;
              }

              const name = item?.fields?.Text?.value || '';
              const quote = item?.fields?.Subtext?.value || '';
              const avatar = item?.fields?.Icon;
              const profession = item?.fields?.Money?.value || '';
              const percentageString = item?.fields?.Percentage?.value;
              const rating = parsePercentageToStars(percentageString);
              const textField = item?.fields?.Text || { value: '' };
              const subtextField = item?.fields?.Subtext || { value: '' };
              const moneyField = item?.fields?.Money || { value: '' };
              const percentageField = item?.fields?.Percentage || { value: '' };
              const iconField = item?.fields?.Icon || { value: { src: '', alt: 'Avatar' } };

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-card p-6 rounded-lg border hover-elevate group relative"
                data-testid={`review-card-${index}`}
              >
                <Quote className="absolute top-4 right-4 rtl:left-4 rtl:right-auto h-6 w-6 text-primary/20" />

                <div className="flex items-center mb-4 rtl:flex-row-reverse">
                  <div className="w-12 h-12 rounded-full mr-4 rtl:ml-4 rtl:mr-0 flex-shrink-0">
                    {isEditing ? (
                      <ContentSdkImage
                        field={iconField}
                        className="w-12 h-12 rounded-full object-cover"
                        width={48}
                        height={48}
                        alt="Profile"
                      />
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
                    <h4 className="font-semibold rtl:text-right ltr:text-left">
                      {isEditing ? (
                        <Text
                          field={textField}
                          tag="span"
                        />
                      ) : (
                        name && name
                      )}
                      </h4>
                    <p className="text-sm text-muted-foreground rtl:text-right ltr:text-left">
                      {isEditing ? (
                        <Text
                          field={moneyField}
                          tag="span"
                        />
                      ) : (
                        profession && profession
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex mb-3 items-center gap-2">
                  {isEditing ? (
                    <>
                      <span className="text-sm text-gray-600">Rating:</span>
                      <Text
                        field={percentageField}
                        tag="span"
                        className="min-h-5 inline-block min-w-12 bg-gray-50 border border-dashed border-gray-300 px-2 py-1 rounded text-sm"
                      />
                      <span className="text-sm text-gray-500">(1-5 stars)</span>
                    </>
                  ) : (
                    renderStars(rating)
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4 rtl:text-right ltr:text-left">
                  {isEditing ? (
                    <Text
                      field={subtextField}
                      tag="span"
                    />
                  ) : (
                    quote && quote
                  )}
                </p>
              </motion.div>
            );
            }))}
        </motion.div>
      </div>
    </section>
  );
};