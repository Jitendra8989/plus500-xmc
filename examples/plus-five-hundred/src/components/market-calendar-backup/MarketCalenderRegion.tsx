import React, { JSX, useState } from 'react';
import {
  Link as ContentSdkLink,
  Text as ContentSdkText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import stylesImport from './MarketCalenderRegion.module.css';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const styles = stylesImport as any;

interface AssociatedMarket {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Title: Field<string>;
    SubTitle: Field<string>;
    Image: ImageField;
    GeneralLink: LinkField;
    TreeList: unknown[];
  };
}

interface MarketEvent {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    'Event Title': Field<string>;
    'Event Date And Time': Field<string>;
    Description: Field<string>;
    'Reference Link': LinkField;
    'Detail Page URL': Field<string>;
    'Visibility Window': Field<string>;
    'Associated Market': AssociatedMarket[];
    'Promo Link': LinkField;
    Country: Field<string>;
    'Expected Impact': Field<number>;
    Title: Field<string>;
    Content: Field<string>;
    NavigationFilter: unknown[];
    NavigationTitle: Field<string>;
    NavigationClass: Field<string>;
    'Page Design': Field<string>;
    SxaTags: unknown[];
  };
}

interface Fields {
  items: MarketEvent[];
}

interface RouteFields {
  Title?: Field<string>;
  Description?: Field<string>;
}

type MarketCalenderRegionProps = ComponentProps & {
  fields: Fields;
  route?: {
    name: string;
    displayName: string;
    fields: RouteFields;
  };
};

// Helper function to format date and time
const formatDateTime = (dateTimeStr: string): { date: string; time: string; fullDate: string } => {
  if (!dateTimeStr) return { date: '', time: '', fullDate: '' };

  try {
    const date = new Date(dateTimeStr);
    const dateFormatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const timeFormatted = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const fullDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return { date: dateFormatted, time: timeFormatted, fullDate };
  } catch {
    return { date: dateTimeStr, time: '', fullDate: dateTimeStr };
  }
};

// Helper function to get country flag
const getCountryFlag = (country: string): string => {
  const flags: { [key: string]: string } = {
    'United States': '🇺🇸',
    Germany: '🇩🇪',
    'United Kingdom': '🇬🇧',
    Japan: '🇯🇵',
    Canada: '🇨🇦',
    Australia: '🇦🇺',
    France: '🇫🇷',
    Italy: '🇮🇹',
    China: '🇨🇳',
    Switzerland: '🇨🇭',
    Spain: '🇪🇸',
    Netherlands: '🇳🇱',
    Brazil: '🇧🇷',
    India: '🇮🇳',
  };
  return flags[country] || '🌍';
};

// Helper function to get impact level details
const getImpactDetails = (
  impact: number
): { text: string; level: string; stars: number; icon: string } => {
  const impactLevel = Math.min(Math.max(impact || 0, 0), 5);
  const impactMap = [
    { text: 'No Impact', level: 'none', stars: 0, icon: '○' },
    { text: 'Low', level: 'low', stars: 1, icon: '📊' },
    { text: 'Medium', level: 'medium', stars: 2, icon: '📈' },
    { text: 'Medium', level: 'medium', stars: 3, icon: '📈' },
    { text: 'High', level: 'high', stars: 4, icon: '⚠️' },
    { text: 'Critical', level: 'critical', stars: 5, icon: '🚨' },
  ];
  return impactMap[impactLevel];
};

// Helper function to render impact stars
const renderImpactStars = (impactLevel: number): JSX.Element => {
  const stars = [];
  const maxStars = 5;

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span
        key={i}
        className={`${styles.impactStar} ${
          i <= impactLevel ? styles.impactStarFilled : styles.impactStarEmpty
        }`}
        aria-hidden="true"
      >
        ★
      </span>
    );
  }

  return (
    <div
      className={styles.impactStars}
      role="img"
      aria-label={`Impact level: ${impactLevel} out of ${maxStars} stars`}
      title={`Impact level: ${impactLevel}/5`}
    >
      {stars}
    </div>
  );
};

// Helper function to get event category
const getEventCategory = (markets: AssociatedMarket[]): string => {
  if (!markets || markets.length === 0) return 'Economic Data';

  // Get the first market's title as category
  const category = markets[0].fields.Title?.value || markets[0].displayName;
  return category || 'Market Event';
};

export const Default = (props: MarketCalenderRegionProps): JSX.Element => {
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 cards initially (2 rows × 3 columns)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // Load 6 more cards (2 more rows)
  };

  if (props.fields && props.fields.items && props.fields.items.length > 0) {
    const visibleEvents = props.fields.items.slice(0, visibleCount);
    const hasMoreEvents = visibleCount < props.fields.items.length;

    return (
      <section
        className={`component ${styles.marketCalenderRegion} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className={styles.container}>
          {/* Page Header */}
          {(props.route?.fields?.Title?.value || props.route?.fields?.Description?.value) && (
            <div className={styles.header}>
              {props.route.fields.Title?.value && (
                <h1 className={styles.title}>
                  <ContentSdkText field={props.route.fields.Title} />
                </h1>
              )}
              {props.route.fields.Description?.value && (
                <p className={styles.subtitle}>
                  <ContentSdkText field={props.route.fields.Description} />
                </p>
              )}
            </div>
          )}

          {/* Events Grid */}
          <div className={styles.eventsGrid}>
            {visibleEvents.map((event) => {
              const { date, time } = formatDateTime(event.fields['Event Date And Time']?.value);
              const impactDetails = getImpactDetails(event.fields['Expected Impact']?.value);
              const category = getEventCategory(event.fields['Associated Market']);
              const country = event.fields.Country?.value || 'International';
              const countryFlag = getCountryFlag(country);

              return (
                <div key={event.id} className={styles.eventCard}>
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.impactContainer}>
                      <div
                        className={`${styles.impactBadge} ${styles[`impact--${impactDetails.level}`]}`}
                      >
                        <span className={styles.impactIcon}>{impactDetails.icon}</span>
                        {impactDetails.text}
                      </div>
                      {renderImpactStars(impactDetails.stars)}
                    </div>
                    <div className={styles.eventMeta}>
                      <span className={styles.eventDate}>
                        <svg
                          className={styles.calendarIcon}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <line
                            x1="16"
                            y1="2"
                            x2="16"
                            y2="6"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
                          <line
                            x1="3"
                            y1="10"
                            x2="21"
                            y2="10"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        {date}
                      </span>
                      <span className={styles.eventTime}>
                        <svg
                          className={styles.clockIcon}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                          <polyline
                            points="12,6 12,12 16,14"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        {time}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardContent}>
                    <div className={styles.categoryInfo}>
                      <span className={styles.category}>{category}</span>
                    </div>

                    <h3 className={styles.eventTitle}>
                      {event.fields['Event Title']?.value || event.fields.Title?.value}
                    </h3>

                    <div className={styles.eventCountry}>
                      <span className={styles.countryFlag}>{countryFlag}</span>
                      <span className={styles.countryName}>{country}</span>
                    </div>

                    {event.fields.Description?.value && (
                      <p className={styles.eventDescription}>{event.fields.Description.value}</p>
                    )}

                    {/* Associated Markets */}
                    {event.fields['Associated Market'] &&
                      event.fields['Associated Market'].length > 0 && (
                        <div className={styles.associatedMarkets}>
                          <strong>Markets:</strong>
                          <div className={styles.marketTags}>
                            {event.fields['Associated Market'].slice(0, 3).map((market) => (
                              <span key={market.id} className={styles.marketTag}>
                                {market.fields.Title?.value || market.displayName}
                              </span>
                            ))}
                            {event.fields['Associated Market'].length > 3 && (
                              <span className={styles.marketTag}>
                                +{event.fields['Associated Market'].length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Card Actions */}
                  <div className={styles.cardActions}>
                    {event.fields['Reference Link']?.value?.href && (
                      <ContentSdkLink
                        field={event.fields['Reference Link']}
                        className={`${styles.actionBtn} ${styles.btnPrimary}`}
                      >
                        View Details
                        <svg
                          className={styles.arrowIcon}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m9 18 6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </ContentSdkLink>
                    )}

                    {event.fields['Detail Page URL']?.value && (
                      <a
                        href={event.fields['Detail Page URL'].value}
                        className={`${styles.actionBtn} ${styles.btnSecondary}`}
                      >
                        Learn More
                      </a>
                    )}

                    {event.fields['Promo Link']?.value?.href && (
                      <ContentSdkLink
                        field={event.fields['Promo Link']}
                        className={`${styles.actionBtn} ${styles.btnSecondary}`}
                      >
                        Trade Now
                      </ContentSdkLink>
                    )}

                    {event.url && (
                      <a href={event.url} className={`${styles.actionBtn} ${styles.btnSecondary}`}>
                        Full Event
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMoreEvents && (
            <div className={styles.loadMoreContainer}>
              <button
                onClick={handleLoadMore}
                className={styles.loadMoreBtn}
                aria-label="Load more events"
              >
                <svg
                  className={styles.loadMoreIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6 9 6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.marketCalenderRegion}`}>
      <div className="component-content">
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📅</div>
          <h3>No Market Events Available</h3>
          <p>Check back soon for upcoming market events and economic announcements</p>
        </div>
      </div>
    </section>
  );
};

// Compact variant - Updated to match card design but smaller
export const Compact = (props: MarketCalenderRegionProps): JSX.Element => {
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 compact cards initially (2 rows × 3 columns)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // Load 6 more cards (2 more rows)
  };

  if (props.fields && props.fields.items && props.fields.items.length > 0) {
    const visibleEvents = props.fields.items.slice(0, visibleCount);
    const hasMoreEvents = visibleCount < props.fields.items.length;

    return (
      <section
        className={`component ${styles.marketCalenderRegion} ${styles['marketCalenderRegion--compact']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className={styles.container}>
          {/* Page Header */}
          {(props.route?.fields?.Title?.value || props.route?.fields?.Description?.value) && (
            <div className={styles.header}>
              {props.route.fields.Title?.value && (
                <h1 className={styles.title}>
                  <ContentSdkText field={props.route.fields.Title} />
                </h1>
              )}
              {props.route.fields.Description?.value && (
                <p className={styles.subtitle}>
                  <ContentSdkText field={props.route.fields.Description} />
                </p>
              )}
            </div>
          )}

          <div className={styles.compactGrid}>
            {visibleEvents.map((event) => {
              const { date, time } = formatDateTime(event.fields['Event Date And Time']?.value);
              const impactDetails = getImpactDetails(event.fields['Expected Impact']?.value);
              const country = event.fields.Country?.value || 'International';
              const countryFlag = getCountryFlag(country);

              return (
                <div key={event.id} className={styles.compactCard}>
                  <div className={styles.compactHeader}>
                    <div className={styles.compactImpactContainer}>
                      <div
                        className={`${styles.impactBadge} ${styles[`impact--${impactDetails.level}`]} ${styles.compactBadge}`}
                      >
                        <span className={styles.impactIcon}>{impactDetails.icon}</span>
                        {impactDetails.text}
                      </div>
                      <div className={styles.compactStars}>
                        {renderImpactStars(impactDetails.stars)}
                      </div>
                    </div>
                  </div>

                  <div className={styles.compactContent}>
                    <h4 className={styles.compactTitle}>
                      {event.fields['Event Title']?.value || event.fields.Title?.value}
                    </h4>

                    <div className={styles.compactMeta}>
                      <span className={styles.compactDateTime}>
                        {countryFlag} {date} • {time}
                      </span>
                    </div>
                  </div>

                  <div className={styles.compactActions}>
                    {event.fields['Detail Page URL']?.value && (
                      <a href={event.fields['Detail Page URL'].value} className={styles.compactBtn}>
                        Details
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMoreEvents && (
            <div className={styles.loadMoreContainer}>
              <button
                onClick={handleLoadMore}
                className={styles.loadMoreBtn}
                aria-label="Load more events"
              >
                <svg
                  className={styles.loadMoreIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6 9 6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.marketCalenderRegion}`}>
      <div className="component-content">
        <span className="is-empty-hint">MarketCalenderRegion - Compact</span>
      </div>
    </section>
  );
};

// List variant - 2 rows at a time
export const List = (props: MarketCalenderRegionProps): JSX.Element => {
  const [visibleCount, setVisibleCount] = useState(4); // Show 4 list items initially (2 rows worth)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // Load 4 more items (2 more rows worth)
  };

  if (props.fields && props.fields.items && props.fields.items.length > 0) {
    const visibleEvents = props.fields.items.slice(0, visibleCount);
    const hasMoreEvents = visibleCount < props.fields.items.length;

    return (
      <section
        className={`component ${styles.marketCalenderRegion} ${styles['marketCalenderRegion--list']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className={styles.container}>
          {/* Page Header */}
          {(props.route?.fields?.Title?.value || props.route?.fields?.Description?.value) && (
            <div className={styles.header}>
              {props.route.fields.Title?.value && (
                <h1 className={styles.title}>
                  <ContentSdkText field={props.route.fields.Title} />
                </h1>
              )}
              {props.route.fields.Description?.value && (
                <p className={styles.subtitle}>
                  <ContentSdkText field={props.route.fields.Description} />
                </p>
              )}
            </div>
          )}

          <div className={styles.listContainer}>
            {visibleEvents.map((event) => {
              const { date, time } = formatDateTime(event.fields['Event Date And Time']?.value);
              const impactDetails = getImpactDetails(event.fields['Expected Impact']?.value);
              const country = event.fields.Country?.value || 'International';
              const countryFlag = getCountryFlag(country);

              return (
                <div key={event.id} className={styles.listItem}>
                  <div className={styles.listDateTime}>
                    <div className={styles.listDate}>{date}</div>
                    <div className={styles.listTime}>{time}</div>
                  </div>

                  <div className={styles.listContent}>
                    <div className={styles.listHeader}>
                      <h4 className={styles.listEventTitle}>
                        {event.fields['Event Title']?.value || event.fields.Title?.value}
                      </h4>
                      <div className={styles.listImpactContainer}>
                        <div
                          className={`${styles.impactBadge} ${styles[`impact--${impactDetails.level}`]} ${styles.listBadge}`}
                        >
                          <span className={styles.impactIcon}>{impactDetails.icon}</span>
                          {impactDetails.text}
                        </div>
                        <div className={styles.listStars}>
                          {renderImpactStars(impactDetails.stars)}
                        </div>
                      </div>
                    </div>

                    {event.fields.Description?.value && (
                      <p className={styles.listDescription}>{event.fields.Description.value}</p>
                    )}

                    <div className={styles.listMeta}>
                      <span className={styles.listCountry}>
                        {countryFlag} {country}
                      </span>
                      {event.fields['Associated Market'] &&
                        event.fields['Associated Market'].length > 0 && (
                          <span className={styles.listMarkets}>
                            • {event.fields['Associated Market'][0].fields.Title?.value}
                            {event.fields['Associated Market'].length > 1 &&
                              ` +${event.fields['Associated Market'].length - 1}`}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className={styles.listActions}>
                    {event.fields['Detail Page URL']?.value && (
                      <a
                        href={event.fields['Detail Page URL'].value}
                        className={styles.listActionBtn}
                      >
                        View Details
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMoreEvents && (
            <div className={styles.loadMoreContainer}>
              <button
                onClick={handleLoadMore}
                className={styles.loadMoreBtn}
                aria-label="Load more events"
              >
                <svg
                  className={styles.loadMoreIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6 9 6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.marketCalenderRegion}`}>
      <div className="component-content">
        <span className="is-empty-hint">MarketCalenderRegion - List</span>
      </div>
    </section>
  );
};

// Default export for Sitecore SDK compatibility
export default Default;
