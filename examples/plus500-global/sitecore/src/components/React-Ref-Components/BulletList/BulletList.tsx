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

  // Default to 4 columns to match the data (4 items)
  const columns = 4;

  // Column classes mapping
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  // In editing mode, always show items even if empty

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp}
          >
            {isEditing ? (
              <div className="text-3xl md:text-4xl font-bold rtl:text-right ltr:text-left">
                <Text
                  field={fields?.Heading || { value: '' }}
                  tag="h2"
                  className="block w-full"
                />
              </div>
            ) : (
              heading && <h2 className="text-3xl md:text-4xl font-bold rtl:text-right ltr:text-left">
                {heading}
              </h2>
            )}
          </motion.div>
        </div>

        <motion.div
          className={`grid ${columnClasses[columns]} gap-8`}
          dir="ltr"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {isEditing && (!items || items.length === 0) ? (
            <div className="min-h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 bg-gray-50 col-span-full">
              {/* Empty div for selecting component in page editor */}
            </div>
          ) : (
            ((isEditing && items) || (items && Array.isArray(items))) && items.map((item, index) => {
            const iconImage = item?.fields?.Icon;
            const itemTitle = item?.fields?.Text?.value;
            const itemDescription = item?.fields?.Subtext?.value;
            const textField = item?.fields?.Text || { value: '' };
            const subtextField = item?.fields?.Subtext || { value: '' };

            return (
              <motion.div
                key={item.id}
                className="text-center p-6 rounded-lg border bg-card hover-elevate group"
                data-testid={`award-item-${index}`}
                variants={fadeInUp}
              >
                <div className="mb-4 flex justify-center">
                  {isEditing ? (
                      <ContentSdkImage
                        field={iconImage || { value: { src: '', alt: 'Icon' } }}
                        className="h-16 w-auto object-contain"
                        width={64}
                        height={64}
                        alt="Award"
                      />
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

                <div className="font-semibold text-lg mb-2 rtl:text-right ltr:text-left">
                  {isEditing ? (
                      <Text
                        field={textField}
                        tag="h3"
                        className="block w-full"
                      />
                  ) : (
                    itemTitle && <h3 className="font-semibold text-lg mb-2 rtl:text-right ltr:text-left">{itemTitle}</h3>
                  )}
                </div>

                <div className="text-muted-foreground text-sm leading-relaxed mb-2 rtl:text-right ltr:text-left">
                  {isEditing ? (
                      <Text
                        field={subtextField}
                        tag="p"
                        className="block w-full"
                      />
                  ) : (
                    itemDescription && <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      {itemDescription}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          }))}
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

  // Default to 4 columns to match the data (4 items)
  const columns = 4;

  // Column classes mapping
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  // In editing mode, always show items even if empty

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInUp}
          >
            {isEditing ? (
              <div className="text-3xl md:text-4xl font-bold rtl:text-right ltr:text-left">
                <Text
                  field={fields?.Heading || { value: '' }}
                  tag="h2"
                  className="block w-full"
                />
              </div>
            ) : (
              heading && <h2 className="text-3xl md:text-4xl font-bold rtl:text-right ltr:text-left">
                {heading}
              </h2>
            )}
          </motion.div>
        </div>

        <motion.div
          className={`grid ${columnClasses[columns]} gap-8`}
          dir="ltr"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {isEditing && (!items || items.length === 0) ? (
            <div className="min-h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 bg-gray-50 col-span-full">
              {/* Empty div for selecting component in page editor */}
            </div>
          ) : (
            ((isEditing && items) || (items && Array.isArray(items))) && items.map((item, index) => {
            const iconImage = item?.fields?.Icon;
            const itemTitle = item?.fields?.Text?.value;
            const itemDescription = item?.fields?.Subtext?.value;
            const textField = item?.fields?.Text || { value: '' };
            const subtextField = item?.fields?.Subtext || { value: '' };

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
                        <ContentSdkImage
                          field={iconImage || { value: { src: '', alt: 'Icon' } }}
                          className="h-8 w-8 object-contain"
                          width={32}
                          height={32}
                          alt="Icon"
                        />
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

                <div className="text-xl font-semibold mb-3">
                  {isEditing ? (
                      <Text
                        field={textField}
                        tag="h3"
                        className="block w-full"
                      />
                  ) : (
                    itemTitle && <h3 className="text-xl font-semibold mb-3">{itemTitle}</h3>
                  )}
                </div>

                <div className="text-muted-foreground leading-relaxed">
                  {isEditing ? (
                      <Text
                        field={subtextField}
                        tag="p"
                        className="block w-full"
                      />
                  ) : (
                    itemDescription && <p className="text-muted-foreground leading-relaxed">
                      {itemDescription}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          }))}
        </motion.div>
      </div>
    </section>
  );
};