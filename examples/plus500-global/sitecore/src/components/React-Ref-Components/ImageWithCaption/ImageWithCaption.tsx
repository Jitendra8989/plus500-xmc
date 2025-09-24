import React from "react";
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  Text,
  NextImage as ContentSdkImage,
  useSitecore
} from '@sitecore-content-sdk/nextjs';
import { motion } from "framer-motion";
import { ImageWithCaptionProps } from './imagewithcaption.props';
import {
  fadeInUp,
  staggerContainer,
  viewportSettings
} from '../../../utils/animations';

// Define imageVariants using class-variance-authority for styling
export const imageVariants = cva('py-16 bg-background', {
  variants: {
    alignment: {
      center: '',
      left: '',
      right: ''
    },
  },
  defaultVariants: {
    alignment: 'center',
  },
});

// Define content order variants
const getContentOrder = (alignment: string) => {
  switch (alignment) {
    case 'left':
      return { imageOrder: 'lg:order-1', textOrder: 'lg:order-2' }; // Image left, text right
    case 'right':
      return { imageOrder: 'lg:order-2', textOrder: 'lg:order-1' }; // Image right, text left
    default:
      return { imageOrder: '', textOrder: '' }; // Center - single column
  }
};

export const Default: React.FC<ImageWithCaptionProps> = (props) => {
  const { page } = useSitecore();

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing mode
  const isEditing = page.mode.isEditing;

  // Extract Sitecore fields and params
  const { fields, params } = props;
  const image = fields?.Image;
  const altText = fields?.Alt?.value; // Serves as both title and alt text
  const caption = fields?.Caption?.value;

  // Get alignment from params.FieldNames (Sitecore variant) or fields fallback
  const alignmentFromParams = params?.FieldNames?.toLowerCase();
  const alignmentValue = alignmentFromParams || fields?.Alignment?.value?.toLowerCase() || 'center';

  // Don't render if no image
  if (!image) {
    return null;
  }

  const { imageOrder, textOrder } = getContentOrder(alignmentValue);
  const isCenter = alignmentValue === 'center';

  return (
    <section className={cn(imageVariants({ alignment: alignmentValue as any }), [params?.styles && params.styles])}>
      <div className="container mx-auto px-6 max-w-6xl">
        {isCenter ? (
          // Center layout - single column
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
          >
            {altText && (
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
                variants={fadeInUp}
              >
                {isEditing ? (
                  <Text
                    field={fields?.Alt}
                    tag="span"
                  />
                ) : (
                  altText
                )}
              </motion.h2>
            )}
            <motion.div
              className="max-w-4xl mx-auto mb-8"
              variants={fadeInUp}
            >
              {isEditing ? (
                <ContentSdkImage
                  field={image}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                  alt={altText || "Image"}
                />
              ) : (
                image?.value?.src && (
                  <img
                    src={image.value.src}
                    alt={altText || image.value.alt || "Image"}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                  />
                )
              )}
            </motion.div>
            {caption && (
              <motion.div
                className="text-center"
                variants={fadeInUp}
              >
                {isEditing ? (
                  <Text
                    field={fields?.Caption}
                    tag="p"
                    className="text-sm text-muted-foreground italic max-w-2xl mx-auto"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
                    {caption}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        ) : (
          // Left/Right layout - two columns
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
          >
            <motion.div className={textOrder} variants={fadeInUp}>
              {altText && (
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  {isEditing ? (
                    <Text
                      field={fields?.Alt}
                      tag="span"
                    />
                  ) : (
                    altText
                  )}
                </h2>
              )}
              {caption && (
                <div className="prose prose-lg max-w-none">
                  <div className="text-muted-foreground space-y-4">
                    {isEditing ? (
                      <Text
                        field={fields?.Caption}
                        tag="div"
                        className="text-lg leading-relaxed"
                      />
                    ) : (
                      <div
                        className="text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: caption.replace(/\n/g, '<br>') }}
                      />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
            <motion.div className={imageOrder} variants={fadeInUp}>
              {isEditing ? (
                <ContentSdkImage
                  field={image}
                  className="w-full h-auto rounded-lg shadow-lg"
                  alt={altText || "Image"}
                />
              ) : (
                image?.value?.src && (
                  <img
                    src={image.value.src}
                    alt={altText || image.value.alt || "Image"}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};