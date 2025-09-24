import React from "react";
import { TrendingUp, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Text,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  useSitecore
} from '@sitecore-content-sdk/nextjs';
import { motion } from "framer-motion";
import { HeroSectionProps } from './herosection.props';
import {
  fadeInUp,
  staggerContainer,
  viewportSettings
} from '../../../utils/animations';

// Minimal variant - simple text-only hero
export const Minimal: React.FC<HeroSectionProps> = (props) => {
  const { page } = useSitecore();

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing mode
  const isEditing = page.mode.isEditing;

  // Extract Sitecore fields
  const { fields } = props;
  const title = fields?.Title?.value;
  const subtitle = fields?.Subtitle?.value;

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          {(isEditing || title) && (
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 rtl:text-right ltr:text-left"
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
            </motion.h1>
          )}
          {(isEditing || subtitle) && (
            <motion.p
              className="text-xl text-muted-foreground rtl:text-right ltr:text-left"
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
        </motion.div>
      </div>
    </div>
  );
};

// Default variant - full hero with background image and CTAs
export const Default: React.FC<HeroSectionProps> = (props) => {
  const { page } = useSitecore();

  // Defensive check for props
  if (!props) {
    return null;
  }

  // Check editing mode
  const isEditing = page.mode.isEditing;

  // Extract Sitecore fields (no fallbacks)
  const { fields } = props;
  const title = fields?.Title?.value;
  const subtitle = fields?.Subtitle?.value;

  // Debug logging for Arabic content
  if (isEditing) {
    console.log('HeroSection Debug:', {
      title,
      subtitle,
      titleField: fields?.Title,
      subtitleField: fields?.Subtitle,
      hasTitle: !!title,
      hasSubtitle: !!subtitle
    });
  }
  const backgroundImage = fields?.Media?.value;
  const primaryCTA = fields?.PrimaryCTA;
  const secondaryCTA = fields?.SecondaryCTA;

  // Check if we have a background image to determine styling
  const hasBackgroundImage = backgroundImage?.src;

  const handleCtaClick = () => {
    // TODO: Handle primary CTA click
    console.log("Primary CTA clicked");
  };

  const handleSecondaryCtaClick = () => {
    // TODO: Handle secondary CTA click
    console.log("Secondary CTA clicked");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      {isEditing ? (
        backgroundImage?.src ? (
          <ContentSdkImage
            field={fields?.Media}
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
            alt="Hero Background"
          />
        ) : (
          // Small placeholder in top-right when image is empty
          <div className="absolute top-4 right-4 z-20">
            <ContentSdkImage
              field={fields?.Media}
              className="w-32 h-20 object-cover rounded border-2 border-dashed border-gray-400 bg-gray-100"
              width={128}
              height={80}
              alt="Hero Background"
            />
          </div>
        )
      ) : (
        backgroundImage?.src && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage.src})` }}
          />
        )
      )}

      {/* Dark Overlay - only show when there's actually a background image */}
      {backgroundImage?.src && (
        <div className="absolute inset-0 bg-black/60" />
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              {isEditing ? (
                <div className={`mb-6 text-5xl font-bold md:text-7xl rtl:text-right ltr:text-left ${
                  hasBackgroundImage ? 'text-white' : 'text-foreground'
                }`}>
                  <Text
                    field={fields?.Title}
                    tag="h1"
                    className="block w-full min-h-[1em]"
                  />
                </div>
              ) : (
                title && (
                  <h1 className={`mb-6 text-5xl font-bold md:text-7xl rtl:text-right ltr:text-left ${
                    hasBackgroundImage ? 'text-white' : 'text-foreground'
                  }`}>
                    {title}
                  </h1>
                )
              )}
            </motion.div>

            <motion.div variants={fadeInUp}>
              {isEditing ? (
                <div className={`mb-8 text-xl md:text-2xl rtl:text-right ltr:text-left ${
                  hasBackgroundImage ? 'text-white/90' : 'text-muted-foreground'
                }`}>
                  <Text
                    field={fields?.Subtitle}
                    tag="p"
                    className="block w-full min-h-[1em]"
                  />
                </div>
              ) : (
                subtitle && (
                  <p className={`mb-8 text-xl md:text-2xl rtl:text-right ltr:text-left ${
                    hasBackgroundImage ? 'text-white/90' : 'text-muted-foreground'
                  }`}>
                    {subtitle}
                  </p>
                )
              )}
            </motion.div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:gap-6 rtl:sm:flex-row-reverse"
              variants={fadeInUp}
            >
              {/* Primary CTA - always show in editing mode, show with content in non-editing */}
              <div className="flex-shrink-0 sm:mr-3 rtl:sm:mr-0 rtl:sm:ml-3">
                {isEditing ? (
                  <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-primary-border min-h-10 rounded-md px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white">
                    <TrendingUp className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
                    <ContentSdkLink
                      field={primaryCTA}
                      className="text-white no-underline"
                      data-testid="button-hero-cta"
                    >
                      {primaryCTA?.value?.text || "Primary CTA"}
                    </ContentSdkLink>
                  </div>
                ) : (
                  primaryCTA?.value && (
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-primary-border min-h-10 rounded-md px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white"
                      onClick={() => window.location.href = primaryCTA?.value?.href || '#'}
                      data-testid="button-hero-cta"
                    >
                      <TrendingUp className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
                      {primaryCTA.value?.text}
                    </button>
                  )
                )}
              </div>

              {/* Secondary CTA - always show in editing mode, show with content in non-editing */}
              <div className="flex-shrink-0 sm:ml-3 rtl:sm:ml-0 rtl:sm:mr-3">
                {isEditing ? (
                  <div className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 min-h-10 rounded-md px-8 py-6 text-lg border ${
                    hasBackgroundImage
                      ? 'backdrop-blur-sm border-white text-white hover:bg-white hover:text-black'
                      : 'border-primary text-primary hover:bg-primary hover:text-white'
                  }`}>
                    <Play className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
                    <ContentSdkLink
                      field={secondaryCTA}
                      className={`no-underline ${
                        hasBackgroundImage ? 'text-white' : 'text-foreground'
                      }`}
                      data-testid="button-hero-secondary"
                    >
                      {secondaryCTA?.value?.text || "Secondary CTA"}
                    </ContentSdkLink>
                  </div>
                ) : (
                  secondaryCTA?.value && (
                    <button
                      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 min-h-10 rounded-md px-8 py-6 text-lg ${
                        hasBackgroundImage
                          ? 'backdrop-blur-sm border border-white text-white hover:bg-white hover:text-black'
                          : 'border border-primary text-primary hover:bg-primary hover:text-white'
                      }`}
                      onClick={() => window.location.href = secondaryCTA?.value?.href || '#'}
                      data-testid="button-hero-secondary"
                    >
                      <Play className="mr-2 rtl:ml-2 rtl:mr-0 h-5 w-5" />
                      {secondaryCTA.value?.text}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-12 w-6 rounded-full border-2 border-white/50 p-1 animate-bounce">
          <div className="h-2 w-2 rounded-full bg-white/50 mx-auto" />
        </div>
      </div>
    </div>
  );
};