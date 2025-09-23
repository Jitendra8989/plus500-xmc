import React, { JSX } from 'react';
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

export const Default = (props: HeroSectionProps): JSX.Element => {
  if (props.fields || props.params) {
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

    return (
      <section
        className={`component ${containerClass}`}
        role="banner"
        data-theme={theme}
      >
        <div className="component-content">

          {/* Background Image for BackgroundImage theme and Default */}
          {(theme === 'BackgroundImage' || theme === 'Default') && (
            <div className={styles.backgroundMedia}>
              {props.fields?.Media?.value?.src ? (
                <>
                  <ContentSdkImage
                    field={props.fields.Media}
                    width={1920}
                    height={1080}
                    priority
                    className={styles.backgroundImage}
                  />
                </>
              ) : (
                // Placeholder background when no image is provided
                <div className={styles.placeholderBackground} />
              )}
              {/* Dark overlay for text readability */}
              <div className={styles.backgroundOverlay} />
            </div>
          )}

          <div className={styles.heroContainer}>
            {/* Content Section */}
            <div className={styles.heroContent}>
              {/* Badges */}
              {props.fields?.Badges?.value && (
                <div className={styles.heroBadges}>
                  <ContentSdkRichText
                    field={props.fields.Badges}
                    className={styles.badgeText}
                  />
                </div>
              )}

              {/* Title */}
              {props.fields?.Title?.value && (
                <ContentSdkText
                  field={props.fields.Title}
                  className={styles.heroTitle}
                  tag="h1"
                />
              )}

              {/* Subtitle */}
              {props.fields?.Subtitle?.value && (
                <ContentSdkText
                  field={props.fields.Subtitle}
                  className={styles.heroSubtitle}
                  tag="p"
                />
              )}

              {/* CTA Actions */}
              <div className={styles.heroActions}>
                {(props.fields?.PrimaryCTA?.value?.href || props.fields?.PrimaryCTA?.value?.text) && (
                  <ContentSdkLink
                    field={props.fields.PrimaryCTA}
                    className={styles.ctaPrimary}
                  />
                )}
                {(props.fields?.SecondaryCTA?.value?.href || props.fields?.SecondaryCTA?.value?.text) && (
                  <ContentSdkLink
                    field={props.fields.SecondaryCTA}
                    className={styles.ctaSecondary}
                  />
                )}
              </div>
            </div>

            {/* Media Section for MediaLeft and MediaRight themes */}
            {(theme === 'MediaLeft' || theme === 'MediaRight') && props.fields?.Media?.value && (
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
  }

  // Fallback content when no fields are available
  return (
    <section className={`component ${styles.heroSection} ${styles['heroSection--backgroundImage']}`} role="banner">
      <div className="component-content">
        {/* Background section for fallback */}
        <div className={styles.backgroundMedia}>
          <div className={styles.placeholderBackground} />
          <div className={styles.backgroundOverlay} />
        </div>

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadges}>
              <span className={styles.badge}>Featured</span>
              <span className={styles.badge}>New</span>
            </div>

            <h1 className={styles.heroTitle}>
              Trade with Confidence
            </h1>

            <p className={styles.heroSubtitle}>
              Experience advanced trading tools, real-time market data, and professional analysis on our secure platform.
            </p>

            <div className={styles.heroActions}>
              <a href="#" className={styles.ctaPrimary}>
                Start Trading
              </a>
              <a href="#" className={styles.ctaSecondary}>
                Try Demo
              </a>
            </div>
          </div>
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