import React, { JSX } from 'react';
import { Link as ContentSdkLink, ImageField, Field, LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './MarketCalenderEventDetail.module.css';

interface AssociatedMarket {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Title: Field<string>;
    'Sub Title': Field<string>;
    Image: ImageField;
    GeneralLink: LinkField;
    TreeList: unknown[];
  };
}

interface Fields {
  'Event Title': Field<string>;
  'Event Date And Time': Field<string>;
  Description: Field<string>;
  'Reference Link': LinkField;
  'Visibility Window': Field<string>;
  'Associated Market': AssociatedMarket[];
  'Promo Link': LinkField;
  'Regulatory Disclaimer': Field<string>;
  Country: Field<string>;
  'Expected Impact': Field<number>;
  Title: Field<string>;
  Content: Field<string>;
  NavigationFilter: unknown[];
  NavigationTitle: Field<string>;
  NavigationClass: Field<string>;
  'Page Design': Field<string>;
  SxaTags: unknown[];
}

type MarketCalenderEventDetailProps = ComponentProps & {
  fields: Fields;
};

// Helper function to format date and time
const formatDateTime = (dateTimeStr: string): { date: string; time: string; dayOfWeek: string } => {
  if (!dateTimeStr) return { date: '', time: '', dayOfWeek: '' };

  try {
    const date = new Date(dateTimeStr);
    const dateFormatted = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeFormatted = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
    const dayOfWeek = date.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    return {
      date: dateFormatted,
      time: timeFormatted,
      dayOfWeek: dayOfWeek,
    };
  } catch {
    return { date: dateTimeStr, time: '', dayOfWeek: '' };
  }
};

// Helper function to render impact stars
const renderImpactStars = (impact: number): JSX.Element => {
  const stars = [];
  const impactLevel = Math.min(Math.max(impact || 0, 0), 5);

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`${styles.impactStar} ${i <= impactLevel ? styles.impactStarActive : styles.impactStarInactive}`}
      >
        ★
      </span>
    );
  }

  return <div className={styles.impactRating}>{stars}</div>;
};

// Helper function to render associated markets
const renderAssociatedMarkets = (markets: AssociatedMarket[]): JSX.Element => {
  if (!markets || markets.length === 0) return <span>-</span>;

  return (
    <div className={styles.associatedMarkets}>
      {markets.map((market) => (
        <span key={market.id} className={styles.marketTag}>
          {market.fields.Title?.value || market.displayName}
        </span>
      ))}
    </div>
  );
};

export const Default = (props: MarketCalenderEventDetailProps): JSX.Element => {
  if (props.fields) {
    const { date, time, dayOfWeek } = formatDateTime(props.fields['Event Date And Time']?.value);

    // Generate random animation class
    const animationClasses = ['pattern1', 'pattern2', 'pattern3', 'pattern4', 'pattern5'];
    const randomPattern = animationClasses[Math.floor(Math.random() * animationClasses.length)];

    return (
      <article
        className={`component ${styles.eventDetail} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className="component-content">
          {/* Animated Display Section */}
          <div className={`${styles.animatedDisplay} ${styles[randomPattern]}`}>
            <div className={styles.animatedContent}>
              <h1 className={styles.animatedTitle}>
                {props.fields['Event Title']?.value || props.fields.Title?.value}
              </h1>
            </div>
          </div>

          <div className={styles.eventDetailContainer}>
            {/* Back Button */}
            <div className={styles.backButtonContainer}>
              <button
                onClick={() => window.history.back()}
                className={styles.backButton}
                aria-label="Go back to previous page"
              >
                <span className={styles.backArrow}>←</span>
                Back
              </button>
            </div>

            {/* Header Section */}
            <header className={styles.eventHeader}>
              <div className={styles.eventMeta}>
                <div className={styles.eventDate}>
                  <span className={styles.dayOfWeek}>{dayOfWeek}</span>
                  <span className={styles.dateText}>{date}</span>
                  <span className={styles.timeText}>{time}</span>
                </div>

                <div className={styles.eventInfo}>
                  <div className={styles.countryBadge}>
                    <span className={styles.countryName}>{props.fields.Country?.value}</span>
                  </div>

                  <div className={styles.impactSection}>
                    <span className={styles.impactLabel}>Expected Impact:</span>
                    {renderImpactStars(props.fields['Expected Impact']?.value)}
                  </div>
                </div>
              </div>

              <h1 className={styles.eventTitle}>
                {props.fields['Event Title']?.value || props.fields.Title?.value}
              </h1>
            </header>

            {/* Main Content */}
            <div className={styles.eventContent}>
              {/* Description Section */}
              <section className={styles.descriptionSection}>
                <h2 className={styles.sectionTitle}>Event Overview</h2>
                {props.fields.Description?.value && (
                  <div className={styles.description}>
                    <p>{props.fields.Description.value}</p>
                  </div>
                )}
              </section>

              {/* Markets Section */}
              <section className={styles.marketsSection}>
                <h2 className={styles.sectionTitle}>Associated Markets</h2>
                <div className={styles.marketsGrid}>
                  {renderAssociatedMarkets(props.fields['Associated Market'])}
                </div>
              </section>

              {/* Actions Section */}
              <section className={styles.actionsSection}>
                <div className={styles.actionButtons}>
                  {props.fields['Reference Link']?.value?.href && (
                    <ContentSdkLink
                      field={props.fields['Reference Link']}
                      className={styles.referenceButton}
                    />
                  )}

                  {props.fields['Promo Link']?.value?.href && (
                    <ContentSdkLink
                      field={props.fields['Promo Link']}
                      className={styles.promoButton}
                    />
                  )}
                </div>
              </section>

              {/* Regulatory Disclaimer */}
              {props.fields['Regulatory Disclaimer']?.value && (
                <section className={styles.disclaimerSection}>
                  <div className={styles.disclaimer}>
                    <h3 className={styles.disclaimerTitle}>Risk Warning</h3>
                    <p className={styles.disclaimerText}>
                      {props.fields['Regulatory Disclaimer'].value}
                    </p>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`component ${styles.eventDetail}`}>
      <div className="component-content">
        <span className="is-empty-hint">MarketCalenderEventDetail</span>
      </div>
    </article>
  );
};

export const Compact = (props: MarketCalenderEventDetailProps): JSX.Element => {
  if (props.fields) {
    const { date, time } = formatDateTime(props.fields['Event Date And Time']?.value);

    return (
      <article
        className={`component ${styles.eventDetail} ${styles['eventDetail--compact']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className="component-content">
          <div className={styles.compactContainer}>
            {/* Back Button */}
            <div className={styles.backButtonContainer}>
              <button
                onClick={() => window.history.back()}
                className={styles.backButton}
                aria-label="Go back to previous page"
              >
                <span className={styles.backArrow}>←</span>
                Back
              </button>
            </div>

            {/* Compact Header */}
            <div className={styles.compactHeader}>
              <h1 className={styles.compactTitle}>
                {props.fields['Event Title']?.value || props.fields.Title?.value}
              </h1>

              <div className={styles.compactMeta}>
                <span className={styles.compactDate}>
                  {date} at {time}
                </span>
                <span className={styles.compactCountry}>{props.fields.Country?.value}</span>
                {renderImpactStars(props.fields['Expected Impact']?.value)}
              </div>
            </div>

            {/* Compact Content */}
            <div className={styles.compactContent}>
              {props.fields.Description?.value && (
                <p className={styles.compactDescription}>{props.fields.Description.value}</p>
              )}

              <div className={styles.compactMarkets}>
                {renderAssociatedMarkets(props.fields['Associated Market'])}
              </div>

              <div className={styles.compactActions}>
                {props.fields['Reference Link']?.value?.href && (
                  <ContentSdkLink
                    field={props.fields['Reference Link']}
                    className={styles.compactButton}
                  />
                )}

                {props.fields['Promo Link']?.value?.href && (
                  <ContentSdkLink
                    field={props.fields['Promo Link']}
                    className={styles.compactPromoButton}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`component ${styles.eventDetail}`}>
      <div className="component-content">
        <span className="is-empty-hint">MarketCalenderEventDetail - Compact</span>
      </div>
    </article>
  );
};
