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
          {title && (
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
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
          {subtitle && (
            <motion.p
              className="text-xl text-muted-foreground"
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
  const backgroundImage = fields?.Media?.value;
  const primaryCTA = fields?.PrimaryCTA;
  const secondaryCTA = fields?.SecondaryCTA;

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
        <ContentSdkImage
          field={fields?.Media}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          alt="Hero Background"
        />
      ) : (
        backgroundImage?.src && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage.src})` }}
          />
        )
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

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
            {isEditing ? (
              <motion.div variants={fadeInUp}>
                <Text
                  field={fields?.Title}
                  tag="h1"
                  className="mb-6 text-5xl font-bold text-white md:text-7xl"
                />
              </motion.div>
            ) : (
              title && (
                <motion.h1
                  className="mb-6 text-5xl font-bold text-white md:text-7xl"
                  variants={fadeInUp}
                >
                  {title}
                </motion.h1>
              )
            )}

            {isEditing ? (
              <motion.div variants={fadeInUp}>
                <Text
                  field={fields?.Subtitle}
                  tag="p"
                  className="mb-8 text-xl text-white/90 md:text-2xl"
                />
              </motion.div>
            ) : (
              subtitle && (
                <motion.p
                  className="mb-8 text-xl text-white/90 md:text-2xl"
                  variants={fadeInUp}
                >
                  {subtitle}
                </motion.p>
              )
            )}

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              variants={fadeInUp}
            >
              {isEditing ? (
                <>
                  <ContentSdkLink
                    field={primaryCTA}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-primary-border min-h-10 rounded-md bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                    data-testid="button-hero-cta"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    {primaryCTA?.value?.text || <ArrowRight className="h-5 w-5" />}
                  </ContentSdkLink>
                  <ContentSdkLink
                    field={secondaryCTA}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 min-h-10 rounded-md text-white hover:bg-white hover:text-black px-8 py-6 text-lg backdrop-blur-sm"
                    data-testid="button-hero-secondary"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {secondaryCTA?.value?.text || <ArrowRight className="h-5 w-5" />}
                  </ContentSdkLink>
                </>
              ) : (
                <>
                  {primaryCTA?.value && (
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border border-primary-border min-h-10 rounded-md bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                      onClick={() => window.location.href = primaryCTA.value?.href || '#'}
                      data-testid="button-hero-cta"
                    >
                      <TrendingUp className="mr-2 h-5 w-5" />
                      {primaryCTA.value?.text}
                    </button>
                  )}
                  {secondaryCTA?.value && (
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 min-h-10 rounded-md text-white hover:bg-white hover:text-black px-8 py-6 text-lg backdrop-blur-sm"
                      onClick={() => window.location.href = secondaryCTA.value?.href || '#'}
                      data-testid="button-hero-secondary"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      {secondaryCTA.value?.text}
                    </button>
                  )}
                </>
              )}
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