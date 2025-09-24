import React, { Fragment } from "react";
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

// Define content order variants with RTL support
const getContentOrder = (alignment: string) => {
  switch (alignment) {
    case 'left':
      return { imageOrder: 'lg:order-1 rtl:lg:order-2', textOrder: 'lg:order-2 rtl:lg:order-1' }; // Image left, text right (reversed in RTL)
    case 'right':
      return { imageOrder: 'lg:order-2 rtl:lg:order-1', textOrder: 'lg:order-1 rtl:lg:order-2' }; // Image right, text left (reversed in RTL)
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

  // Always render in editing mode for field editing
  // In non-editing mode, render if we have content
  if (!isEditing && !image?.value?.src && !altText && !caption) {
    return null;
  }

  const { imageOrder, textOrder } = getContentOrder(alignmentValue);
  const isCenter = alignmentValue === 'center';

  // Build className manually to avoid parsing issues
  const baseClasses = "py-16 bg-background";
  const additionalClasses = params?.styles || "";
  const combinedClasses = `${baseClasses} ${additionalClasses}`.trim();

  return (
    <section className={combinedClasses}>
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
            {(isEditing || altText) && (
              <motion.div
                className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
                variants={fadeInUp}
              >
                {isEditing ? (
                  <div className="text-3xl md:text-4xl font-bold mb-6 text-foreground rtl:text-right ltr:text-left">
                    <Text
                      field={fields?.Alt}
                      tag="h2"
                      className="block w-full"
                    />
                  </div>
                ) : (
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground rtl:text-right ltr:text-left">
                    {altText}
                  </h2>
                )}
              </motion.div>
            )}
            <motion.div
              className="max-w-4xl mx-auto mb-8 relative"
              variants={fadeInUp}
            >
              {isEditing ? (
                image?.value?.src ? (
                  <ContentSdkImage
                    field={image}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                    alt={altText || "Image"}
                  />
                ) : (
                  // Small placeholder when image is empty
                  <div className="flex justify-center">
                    <ContentSdkImage
                      field={image}
                      className="w-64 h-40 object-cover rounded-lg border-2 border-dashed border-gray-400 bg-gray-100"
                      width={256}
                      height={160}
                      alt="Image"
                    />
                  </div>
                )
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
            {(isEditing || caption) && (
              <motion.div
                className="text-center"
                variants={fadeInUp}
              >
                {isEditing ? (
                  <div className="text-sm text-muted-foreground italic max-w-2xl mx-auto space-y-4 rtl:text-right ltr:text-left">
                    <Text
                      field={fields?.Caption}
                      tag="p"
                      className="block w-full"
                    />
                  </div>
                ) : (
                  caption && (caption.includes('<div class="ck-content">') || caption.includes('<p>')) ? (
                    // Rich text HTML content - strip inline styles and apply proper styling
                    <div className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: caption
                            .replace(/style="[^"]*"/g, '') // Remove all inline styles
                            .replace(/color:[^;]*;?/g, '') // Remove color styles
                            .replace(/background-color:[^;]*;?/g, '') // Remove background colors
                            .replace(/\n/g, '<br>')
                        }}
                      />
                    </div>
                  ) : (
                    // Plain text content - apply proper styling
                    <div className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
                      {caption && caption.split('\n').map((line, index) => (
                        <Fragment key={index}>
                          {line}
                          {index < caption.split('\n').length - 1 && <br />}
                        </Fragment>
                      ))}
                    </div>
                  )
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
              {(isEditing || altText) && (
                <div className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  {isEditing ? (
                    <div className="text-3xl md:text-4xl font-bold mb-6 text-foreground rtl:text-right ltr:text-left">
                      <Text
                        field={fields?.Alt}
                        tag="h2"
                        className="block w-full"
                      />
                    </div>
                  ) : (
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground rtl:text-right ltr:text-left">
                      {altText}
                    </h2>
                  )}
                </div>
              )}
              {(isEditing || caption) && (
                <div className="prose prose-lg max-w-none">
                  <div className="text-muted-foreground space-y-4">
                    {isEditing ? (
                      <div className="text-lg leading-relaxed text-muted-foreground space-y-4 rtl:text-right ltr:text-left">
                        <Text
                          field={fields?.Caption}
                          tag="div"
                          className="block w-full"
                        />
                      </div>
                    ) : (
                      caption && (caption.includes('<div class="ck-content">') || caption.includes('<p>')) ? (
                        // Rich text HTML content - strip inline styles and apply proper styling
                        <div className="text-lg leading-relaxed text-muted-foreground rtl:text-right ltr:text-left">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: caption
                                .replace(/style="[^"]*"/g, '') // Remove all inline styles
                                .replace(/color:[^;]*;?/g, '') // Remove color styles
                                .replace(/background-color:[^;]*;?/g, '') // Remove background colors
                                .replace(/\n/g, '<br>')
                            }}
                          />
                        </div>
                      ) : (
                        // Plain text content - apply proper styling
                        <div className="text-lg leading-relaxed text-muted-foreground rtl:text-right ltr:text-left">
                          {caption && caption.split('\n').map((line, index) => (
                            <Fragment key={index}>
                              {line}
                              {index < caption.split('\n').length - 1 && <br />}
                            </Fragment>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </motion.div>
            <motion.div className={imageOrder} variants={fadeInUp}>
              {isEditing ? (
                image?.value?.src ? (
                  <ContentSdkImage
                    field={image}
                    className="w-full h-auto rounded-lg shadow-lg"
                    alt={altText || "Image"}
                  />
                ) : (
                  // Small placeholder when image is empty in left/right layout
                  <div className="flex justify-center">
                    <ContentSdkImage
                      field={image}
                      className="w-64 h-40 object-cover rounded-lg border-2 border-dashed border-gray-400 bg-gray-100"
                      width={256}
                      height={160}
                      alt="Image"
                    />
                  </div>
                )
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