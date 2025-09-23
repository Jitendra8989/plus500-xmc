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
import styles from './FeatureSection.module.css';

interface FeatureItem {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Title: Field<string>;
    SubTitle: Field<string>;
    Description: RichTextField;
    Image: ImageField;
    PrimaryCTA: LinkField;
    SecondaryCTA: LinkField;
  };
}

interface Fields {
  SectionTitle: Field<string>;
  SectionSubtitle: Field<string>;
  SectionDescription?: RichTextField;
  SectionCTA: LinkField;
  SecondaryCTA?: LinkField;
  FeatureItems: FeatureItem[];
  BackgroundImage?: ImageField;
}

type FeatureSectionProps = ComponentProps & {
  fields: Fields;
};

// Helper function to render feature items for Protection variant
const renderProtectionFeatures = (features: FeatureItem[]): JSX.Element[] => {
  return features.map((feature) => (
    <div key={feature.id} className={styles.protectionFeature}>
      <div className={styles.protectionIcon}>
        {feature.fields.Image?.value ? (
          <ContentSdkImage
            field={feature.fields.Image}
            width={80}
            height={80}
            className={styles.featureIconImage}
          />
        ) : (
          <div className={styles.defaultIcon}>
            <svg className={styles.iconSvg} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7L12 2z" />
            </svg>
          </div>
        )}
      </div>

      {feature.fields.Title?.value && (
        <ContentSdkText field={feature.fields.Title} className={styles.protectionTitle} tag="h3" />
      )}

      {feature.fields.SubTitle?.value && (
        <ContentSdkText
          field={feature.fields.SubTitle}
          className={styles.protectionDescription}
          tag="p"
        />
      )}

      {feature.fields.Description?.value && (
        <ContentSdkRichText
          field={feature.fields.Description}
          className={styles.protectionDescription}
        />
      )}

      {/* Feature CTAs */}
      {(feature.fields.PrimaryCTA?.value?.href ||
        feature.fields.PrimaryCTA?.value?.text ||
        feature.fields.SecondaryCTA?.value?.href ||
        feature.fields.SecondaryCTA?.value?.text) && (
        <div className={styles.protectionFeatureCTAs}>
          {(feature.fields.PrimaryCTA?.value?.href || feature.fields.PrimaryCTA?.value?.text) && (
            <ContentSdkLink
              field={feature.fields.PrimaryCTA}
              className={styles.protectionFeaturePrimary}
            />
          )}
          {(feature.fields.SecondaryCTA?.value?.href ||
            feature.fields.SecondaryCTA?.value?.text) && (
            <ContentSdkLink
              field={feature.fields.SecondaryCTA}
              className={styles.protectionFeatureSecondary}
            />
          )}
        </div>
      )}
    </div>
  ));
};

// Helper function to render feature items for Education variant
const renderEducationFeatures = (features: FeatureItem[]): JSX.Element[] => {
  return features.map((feature) => (
    <div key={feature.id} className={styles.educationItem}>
      <div className={styles.educationItemContent}>
        <div className={styles.educationIcon}>
          {feature.fields.Image?.value ? (
            <ContentSdkImage
              field={feature.fields.Image}
              width={40}
              height={40}
              className={styles.educationIconImage}
            />
          ) : (
            <svg className={styles.educationIconSvg} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
        </div>

        <div className={styles.educationContent}>
          {feature.fields.Title?.value && (
            <ContentSdkText
              field={feature.fields.Title}
              className={styles.educationTitle}
              tag="span"
            />
          )}
          {feature.fields.SubTitle?.value && (
            <ContentSdkText
              field={feature.fields.SubTitle}
              className={styles.educationSubtitle}
              tag="div"
            />
          )}
        </div>
      </div>

      <div className={styles.educationArrow}>
        {feature.fields.PrimaryCTA?.value?.href || feature.fields.PrimaryCTA?.value?.text ? (
          <ContentSdkLink field={feature.fields.PrimaryCTA} className={styles.educationArrowLink}>
            <svg className={styles.arrowIcon} fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </ContentSdkLink>
        ) : (
          <svg className={styles.arrowIcon} fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        )}
      </div>
    </div>
  ));
};

// Helper function to render feature items for Features variant
const renderFeatureItems = (features: FeatureItem[]): JSX.Element[] => {
  const iconColors = ['yellow', 'orange', 'blue', 'green', 'purple', 'red'];

  return features.map((feature, index) => {
    const colorClass = iconColors[index % iconColors.length];

    return (
      <div key={feature.id} className={styles.featureItem}>
        <div className={`${styles.featureIcon} ${styles[`featureIcon--${colorClass}`]}`}>
          {feature.fields.Image?.value ? (
            <ContentSdkImage
              field={feature.fields.Image}
              width={32}
              height={32}
              className={styles.featureIconImage}
            />
          ) : (
            <svg className={styles.featureIconSvg} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          )}
        </div>

        {feature.fields.Title?.value && (
          <ContentSdkText field={feature.fields.Title} className={styles.featureTitle} tag="h3" />
        )}

        {feature.fields.SubTitle?.value && (
          <ContentSdkText
            field={feature.fields.SubTitle}
            className={styles.featureDescription}
            tag="p"
          />
        )}

        {feature.fields.Description?.value && (
          <ContentSdkRichText
            field={feature.fields.Description}
            className={styles.featureDescription}
          />
        )}

        {/* Feature CTAs */}
        {(feature.fields.PrimaryCTA?.value?.href ||
          feature.fields.PrimaryCTA?.value?.text ||
          feature.fields.SecondaryCTA?.value?.href ||
          feature.fields.SecondaryCTA?.value?.text) && (
          <div className={styles.featureItemCTAs}>
            {(feature.fields.PrimaryCTA?.value?.href || feature.fields.PrimaryCTA?.value?.text) && (
              <ContentSdkLink
                field={feature.fields.PrimaryCTA}
                className={styles.featureItemPrimary}
              />
            )}
            {(feature.fields.SecondaryCTA?.value?.href ||
              feature.fields.SecondaryCTA?.value?.text) && (
              <ContentSdkLink
                field={feature.fields.SecondaryCTA}
                className={styles.featureItemSecondary}
              />
            )}
          </div>
        )}
      </div>
    );
  });
};

export const Protection = (props: FeatureSectionProps): JSX.Element => {
  if (props.fields) {
    return (
      <section
        className={`component ${styles.featureSection} ${styles['featureSection--protection']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className="component-content">
          {props.fields.BackgroundImage?.value && (
            <div className={styles.backgroundImage}>
              <ContentSdkImage
                field={props.fields.BackgroundImage}
                width={1920}
                height={1080}
                priority
              />
            </div>
          )}

          <div className={styles.protectionContainer}>
            {/* Title */}
            {props.fields.SectionTitle?.value && (
              <ContentSdkText
                field={props.fields.SectionTitle}
                className={styles.protectionMainTitle}
                tag="h2"
              />
            )}

            {/* Features Grid */}
            {props.fields.FeatureItems && props.fields.FeatureItems.length > 0 && (
              <div className={styles.protectionGrid}>
                {renderProtectionFeatures(props.fields.FeatureItems)}
              </div>
            )}

            {/* CTA Button */}
            {props.fields.SectionCTA?.value && (
              <div className={styles.protectionCTA}>
                <ContentSdkLink
                  field={props.fields.SectionCTA}
                  className={styles.protectionButton}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.featureSection}`}>
      <div className="component-content">
        <span className="is-empty-hint">FeatureSection - Protection</span>
      </div>
    </section>
  );
};

export const Education = (props: FeatureSectionProps): JSX.Element => {
  if (props.fields) {
    return (
      <section
        className={`component ${styles.featureSection} ${styles['featureSection--education']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className="component-content">
          <div className={styles.educationContainer}>
            {/* Header Section */}
            <div className={styles.educationHeader}>
              {props.fields.SectionTitle?.value && (
                <ContentSdkText
                  field={props.fields.SectionTitle}
                  className={styles.educationMainTitle}
                  tag="h2"
                />
              )}

              {props.fields.SectionSubtitle?.value && (
                <ContentSdkText
                  field={props.fields.SectionSubtitle}
                  className={styles.educationSubtitle}
                  tag="p"
                />
              )}

              {/* Primary CTA */}
              {props.fields.SectionCTA?.value && (
                <div className={styles.educationCTA}>
                  <ContentSdkLink
                    field={props.fields.SectionCTA}
                    className={styles.educationButton}
                  />
                </div>
              )}
            </div>

            {/* Content Card */}
            {props.fields.FeatureItems && props.fields.FeatureItems.length > 0 && (
              <div className={styles.educationCard}>
                <div className={styles.educationCardContent}>
                  {renderEducationFeatures(props.fields.FeatureItems)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.featureSection}`}>
      <div className="component-content">
        <span className="is-empty-hint">FeatureSection - Education</span>
      </div>
    </section>
  );
};

export const Features = (props: FeatureSectionProps): JSX.Element => {
  if (props.fields) {
    return (
      <section
        className={`component ${styles.featureSection} ${styles['featureSection--features']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className="component-content">
          <div className={styles.featuresContainer}>
            {/* Title */}
            {props.fields.SectionTitle?.value && (
              <ContentSdkText
                field={props.fields.SectionTitle}
                className={styles.featuresMainTitle}
                tag="h2"
              />
            )}

            {/* Features Grid */}
            {props.fields.FeatureItems && props.fields.FeatureItems.length > 0 && (
              <div className={styles.featuresGrid}>
                {renderFeatureItems(props.fields.FeatureItems)}
              </div>
            )}

            {/* Optional CTA */}
            {props.fields.SectionCTA?.value && (
              <div className={styles.featuresCTA}>
                <ContentSdkLink field={props.fields.SectionCTA} className={styles.featuresButton} />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.featureSection}`}>
      <div className="component-content">
        <span className="is-empty-hint">FeatureSection - Features</span>
      </div>
    </section>
  );
};

// Default export (same as Protection)
export const Default = Protection;
