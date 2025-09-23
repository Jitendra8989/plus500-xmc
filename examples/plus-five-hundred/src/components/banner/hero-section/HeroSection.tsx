import React from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

interface Fields {
  Title: Field<string>;
  Subtitle: Field<string>;
  Badges: RichTextField;
  Media: ImageField;
  PrimaryCTA: LinkField;
  SecondaryCTA: LinkField;
}

type HeroSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: HeroSectionProps) => {
  // Get theme from params - using FieldNames as the theme selector
  const theme = props.params?.FieldNames || 'Default';

  // Determine container class based on theme
  let containerClass = styles.heroSection;

  switch (theme) {
    case 'TextOnly':
      containerClass = `${styles.heroSection} ${styles['heroSection--textOnly']}`;
      break;
    case 'Minimal':
      containerClass = `${styles.heroSection} ${styles['heroSection--textOnly']} ${styles['heroSection--minimal']}`;
      break;
    case 'MediaLeft':
      containerClass = `${styles.heroSection} ${styles['heroSection--mediaLeft']}`;
      break;
    case 'MediaRight':
      containerClass = `${styles.heroSection} ${styles['heroSection--mediaRight']}`;
      break;
    case 'BackgroundImage':
    default:
      containerClass = `${styles.heroSection} ${styles['heroSection--backgroundImage']}`;
      break;
  }

  // Determine if we have structured content or should use fallback
  const hasContent = props.fields && Object.keys(props.fields).length > 0;

  return (
    <section className={`component ${containerClass}`} role="banner" data-theme={theme}>
      <div className="component-content">
        {/* Background Image for BackgroundImage theme and Default */}
        {(theme === 'BackgroundImage' || theme === 'Default') && (
          <div className={styles.backgroundMedia}>
            {hasContent && props.fields?.Media?.value?.src ? (
              <ContentSdkImage
                field={props.fields.Media}
                width={1920}
                height={1080}
                priority
                className={styles.backgroundImage}
              />
            ) : (
              <div className={styles.placeholderBackground} />
            )}
            <div className={styles.backgroundOverlay} />
          </div>
        )}

        <div className={styles.heroContainer}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badges - Structured or Fallback */}
            {hasContent && props.fields?.Badges?.value ? (
              <motion.div
                className={styles.heroBadges}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ContentSdkRichText field={props.fields.Badges} className={styles.badgeText} />
              </motion.div>
            ) : null}

            {/* Title - Structured or Fallback */}
            {hasContent && props.fields?.Title?.value ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ContentSdkText field={props.fields.Title} className={styles.heroTitle} tag="h1" />
              </motion.div>
            ) : (
              <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Trade with Confidence
              </motion.h1>
            )}

            {/* Subtitle - Structured or Fallback */}
            {hasContent && props.fields?.Subtitle?.value ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ContentSdkText
                  field={props.fields.Subtitle}
                  className={styles.heroSubtitle}
                  tag="p"
                />
              </motion.div>
            ) : (
              <motion.p
                className={styles.heroSubtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Experience advanced trading tools, real-time market data, and professional analysis
                on our secure platform.
              </motion.p>
            )}

            {/* CTA Actions - Structured or Fallback */}
            <motion.div
              className={styles.heroActions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {hasContent ? (
                <>
                  {(props.fields?.PrimaryCTA?.value?.href ||
                    props.fields?.PrimaryCTA?.value?.text) && (
                    <ContentSdkLink field={props.fields.PrimaryCTA} className={styles.ctaPrimary} />
                  )}
                  {(props.fields?.SecondaryCTA?.value?.href ||
                    props.fields?.SecondaryCTA?.value?.text) && (
                    <ContentSdkLink
                      field={props.fields.SecondaryCTA}
                      className={styles.ctaSecondary}
                    />
                  )}
                </>
              ) : (
                <>
                  <a href="#" className={styles.ctaPrimary}>
                    Start Trading
                  </a>
                  <a href="#" className={styles.ctaSecondary}>
                    Try Demo
                  </a>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Media Section for MediaLeft and MediaRight themes */}
          {(theme === 'MediaLeft' || theme === 'MediaRight') &&
            hasContent &&
            props.fields?.Media?.value && (
              <div className={styles.heroMedia}>
                <ContentSdkImage
                  field={props.fields.Media}
                  className={styles.mediaImage}
                  width={600}
                  height={400}
                />
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

// Export variants if needed
export const TextOnly = Default;
export const Minimal = Default;
export const MediaLeft = Default;
export const MediaRight = Default;
export const BackgroundImage = Default;

// Default export for Sitecore SDK compatibility
export default Default;
