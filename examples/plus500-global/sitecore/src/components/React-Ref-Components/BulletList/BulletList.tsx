import React from "react";
import { Check } from "lucide-react";
import {
  Text,
  NextImage as ContentSdkImage,
  useSitecore
} from '@sitecore-content-sdk/nextjs';
import { motion } from "framer-motion";
import { BulletListProps } from './bulletlist.props';
import {
  fadeInUp,
  staggerContainer,
  viewportSettings
} from '../../../utils/animations';

// Awards variant - with card styling and borders
export const Awards: React.FC<BulletListProps> = (props) => {
  const { page } = useSitecore();

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing mode
  const isEditing = page.mode.isEditing;

  // Extract Sitecore fields
  const { fields } = props;
  const heading = fields?.Heading?.value;
  const items = fields?.Items || [];
  // const styleVariant = fields?.StyleVariant?.value;

  // Default to 4 columns to match the data (4 items)
  const columns = 4;

  // Column classes mapping
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        {heading && (
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp}
          >
            {isEditing ? (
              <Text
                field={fields?.Heading}
                tag="h2"
                className="text-3xl md:text-4xl font-bold"
              />
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold">
                {heading}
              </h2>
            )}
          </motion.div>
        )}

        <motion.div
          className={`grid ${columnClasses[columns]} gap-8`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {items && Array.isArray(items) && items.map((item, index) => {
            // Skip invalid items
            if (!item || !item.fields) {
              return null;
            }

            const iconImage = item?.fields?.Icon;
            const itemTitle = item?.fields?.Text?.value;
            const itemDescription = item?.fields?.Subtext?.value;

            return (
              <motion.div
                key={item.id}
                className="text-center p-6 rounded-lg border bg-card hover-elevate group"
                data-testid={`award-item-${index}`}
                variants={fadeInUp}
              >
                <div className="mb-4 flex justify-center">
                  {isEditing ? (
                    iconImage && (
                      <ContentSdkImage
                        field={iconImage}
                        className="h-16 w-auto object-contain"
                        width={64}
                        height={64}
                        alt="Award"
                      />
                    )
                  ) : (
                    iconImage?.value?.src ? (
                      <img
                        src={iconImage.value.src}
                        alt={iconImage.value.alt || "Award"}
                        className="h-16 w-auto object-contain"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <Check className="h-8 w-8 text-primary" />
                      </div>
                    )
                  )}
                </div>

                {isEditing ? (
                  <Text
                    field={item.fields?.Text}
                    tag="h3"
                    className="font-semibold text-lg mb-2"
                  />
                ) : (
                  itemTitle && (
                    <h3 className="font-semibold text-lg mb-2">{itemTitle}</h3>
                  )
                )}

                {isEditing ? (
                  <Text
                    field={item.fields?.Subtext}
                    tag="p"
                    className="text-muted-foreground text-sm leading-relaxed mb-2"
                  />
                ) : (
                  itemDescription && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      {itemDescription}
                    </p>
                  )
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// Default variant - simple bullet list styling
export const Default: React.FC<BulletListProps> = (props) => {
  const { page } = useSitecore();

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing mode
  const isEditing = page.mode.isEditing;

  // Extract Sitecore fields
  const { fields } = props;
  const heading = fields?.Heading?.value;
  const items = fields?.Items || [];
  // const styleVariant = fields?.StyleVariant?.value;

  // Default to 4 columns to match the data (4 items)
  const columns = 4;

  // Column classes mapping
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {heading && (
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp}
          >
            {isEditing ? (
              <Text
                field={fields?.Heading}
                tag="h2"
                className="text-3xl md:text-4xl font-bold"
              />
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold">
                {heading}
              </h2>
            )}
          </motion.div>
        )}

        <motion.div
          className={`grid ${columnClasses[columns]} gap-8`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {items && Array.isArray(items) && items.map((item, index) => {
            // Skip invalid items
            if (!item || !item.fields) {
              return null;
            }

            const iconImage = item?.fields?.Icon;
            const itemTitle = item?.fields?.Text?.value;
            const itemDescription = item?.fields?.Subtext?.value;

            return (
              <motion.div
                key={item.id}
                className="text-center group"
                data-testid={`bullet-item-${index}`}
                variants={fadeInUp}
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors duration-300">
                    {isEditing ? (
                      iconImage && (
                        <ContentSdkImage
                          field={iconImage}
                          className="h-8 w-8"
                          width={32}
                          height={32}
                          alt="Icon"
                        />
                      )
                    ) : (
                      iconImage?.value?.src ? (
                        <img
                          src={iconImage.value.src}
                          alt={iconImage.value.alt || "Icon"}
                          className="h-8 w-8"
                          width={32}
                          height={32}
                        />
                      ) : (
                        <Check className="h-8 w-8 text-primary" />
                      )
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <Text
                    field={item.fields?.Text}
                    tag="h3"
                    className="text-xl font-semibold mb-3"
                  />
                ) : (
                  itemTitle && (
                    <h3 className="text-xl font-semibold mb-3">{itemTitle}</h3>
                  )
                )}

                {isEditing ? (
                  <Text
                    field={item.fields?.Subtext}
                    tag="p"
                    className="text-muted-foreground leading-relaxed"
                  />
                ) : (
                  itemDescription && (
                    <p className="text-muted-foreground leading-relaxed">
                      {itemDescription}
                    </p>
                  )
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};