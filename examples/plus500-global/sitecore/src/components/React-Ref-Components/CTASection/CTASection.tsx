import React from "react";
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  Text,
  Link as ContentSdkLink,
  NextImage as ContentSdkImage,
  useSitecore
} from '@sitecore-content-sdk/nextjs';
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { CTASectionProps } from './ctasection.props';
import {
  fadeInUp,
  staggerContainer,
  viewportSettings
} from '../../../utils/animations';

// Define background variants using CVA
export const ctaVariants = cva('py-20 relative overflow-hidden', {
  variants: {
    backgroundVariant: {
      gradient: '',
      solid: '',
      image: ''
    },
  },
  defaultVariants: {
    backgroundVariant: 'gradient',
  },
});

export const Default: React.FC<CTASectionProps> = (props) => {
  const { page } = useSitecore();

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing mode
  const isEditing = page.mode.isEditing;

  // Extract Sitecore fields and params
  const { fields, params } = props;
  const title = fields?.Title?.value;
  const subtitle = fields?.Subtitle?.value;
  const primaryCTA = fields?.PrimaryCTA;
  const secondaryCTA = fields?.SecondaryCTA;
  const backgroundImage = fields?.BackgroundImage;

  // Get background variant from params or field
  const { backgroundVariant } = params || {};
  const backgroundVariantValue = backgroundVariant || fields?.BackgroundVariant?.value || 'gradient';

  // Background classes
  const backgroundClasses = {
    gradient: "bg-gradient-to-r from-primary via-primary/90 to-blue-600",
    solid: "bg-primary",
    image: "bg-cover bg-center bg-no-repeat",
  };

  const backgroundClass = backgroundClasses[backgroundVariantValue as keyof typeof backgroundClasses] || backgroundClasses.gradient;

  return (
    <section className={cn(ctaVariants({ backgroundVariant: backgroundVariantValue as any }), [params?.styles && params.styles])}>
      {/* Background */}
      <div className={`absolute inset-0 ${backgroundClass}`}>
        {backgroundVariantValue === 'image' && backgroundImage && (
          <>
            {isEditing ? (
              <ContentSdkImage
                field={backgroundImage}
                className="w-full h-full object-cover"
                alt="Background"
              />
            ) : (
              backgroundImage?.value?.src && (
                <img
                  src={backgroundImage.value.src}
                  alt={backgroundImage.value.alt || "Background"}
                  className="w-full h-full object-cover"
                />
              )
            )}
          </>
        )}
      </div>

      {/* Gradient overlay for image backgrounds */}
      {backgroundVariantValue === "image" && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-600/90" />
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {title && (
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              {isEditing ? (
                <Text
                  field={fields?.Title}
                  tag="span"
                />
              ) : (
                title
              )}
            </motion.h2>
          )}

          {subtitle && (
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              {isEditing ? (
                <Text
                  field={fields?.Subtitle}
                  tag="span"
                />
              ) : (
                subtitle
              )}
            </motion.p>
          )}

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            {primaryCTA && (
              <div>
                {isEditing ? (
                  <ContentSdkLink
                    field={primaryCTA}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-primary-border min-h-10 rounded-md bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold group"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </ContentSdkLink>
                ) : (
                  primaryCTA?.value?.href && (
                    <a
                      href={primaryCTA.value.href}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-primary-border min-h-10 rounded-md bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold group"
                      target={primaryCTA.value.target || '_self'}
                      data-testid="button-cta-primary"
                    >
                      <TrendingUp className="mr-2 h-5 w-5" />
                      {primaryCTA.value.text || "Apply for DFS Account"}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )
                )}
              </div>
            )}

            {secondaryCTA && (
              <div>
                {isEditing ? (
                  <ContentSdkLink
                    field={secondaryCTA}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border [border-color:var(--button-outline)] shadow-xs active:shadow-none min-h-10 rounded-md border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg backdrop-blur-sm"
                  />
                ) : (
                  secondaryCTA?.value?.href && (
                    <a
                      href={secondaryCTA.value.href}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border [border-color:var(--button-outline)] shadow-xs active:shadow-none min-h-10 rounded-md border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg backdrop-blur-sm"
                      target={secondaryCTA.value.target || '_self'}
                      data-testid="button-cta-secondary"
                    >
                      {secondaryCTA.value.text || "Learn More"}
                    </a>
                  )
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};