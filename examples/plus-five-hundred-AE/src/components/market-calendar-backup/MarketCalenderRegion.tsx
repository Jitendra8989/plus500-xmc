import React, { JSX } from 'react';
import {
  Link as ContentSdkLink,
  Text as ContentSdkText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './MarketCalenderRegion.module.css';

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
const formatDateTime = (dateTimeStr: string): { date: string; time: string } => {
  if (!dateTimeStr) return { date: '', time: '' };

  try {
    const date = new Date(dateTimeStr);
    const dateFormatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeFormatted = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
    return { date: dateFormatted, time: timeFormatted };
  } catch {
    return { date: dateTimeStr, time: '' };
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
      {markets.map((market, index) => (
        <span key={market.id} className={styles.marketTag}>
          {market.fields.Title?.value || market.displayName}
          {index < markets.length - 1 && ', '}
        </span>
      ))}
    </div>
  );
};

export const Default = (props: MarketCalenderRegionProps): JSX.Element => {
  if (props.fields && props.fields.items && props.fields.items.length > 0) {
    return (
      <section
        className={`component ${styles.marketCalenderRegion} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className="component-content">
          {/* Page Header with Route Fields */}
          {(props.route?.fields?.Title?.value || props.route?.fields?.Description?.value) && (
            <div className={styles.pageHeader}>
              {props.route.fields.Title?.value && (
                <h1 className={styles.pageTitle}>
                  <ContentSdkText field={props.route.fields.Title} />
                </h1>
              )}
              {props.route.fields.Description?.value && (
                <p className={styles.pageDescription}>
                  <ContentSdkText field={props.route.fields.Description} />
                </p>
              )}
            </div>
          )}

          <div className={styles.tableContainer}>
            <table className={styles.marketCalendarTable}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th className={styles.dateColumn}>Date & Time</th>
                  <th className={styles.eventColumn}>Event</th>
                  <th className={styles.countryColumn}>Country</th>
                  <th className={styles.marketsColumn}>Markets</th>
                  <th className={styles.impactColumn}>Impact</th>
                  <th className={styles.actionsColumn}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {props.fields.items.map((event) => {
                  const { date, time } = formatDateTime(event.fields['Event Date And Time']?.value);

                  return (
                    <tr key={event.id} className={styles.tableRow}>
                      {/* Date & Time Column */}
                      <td className={styles.dateCell}>
                        <div className={styles.dateTimeContainer}>
                          <div className={styles.eventDate}>{date}</div>
                          <div className={styles.eventTime}>{time}</div>
                        </div>
                      </td>

                      {/* Event Column */}
                      <td className={styles.eventCell}>
                        <div className={styles.eventInfo}>
                          <h3 className={styles.eventTitle}>
                            {event.fields['Event Title']?.value || event.fields.Title?.value}
                          </h3>
                          {event.fields.Description?.value && (
                            <p className={styles.eventDescription}>
                              {event.fields.Description.value}
                            </p>
                          )}
                          {event.fields['Reference Link']?.value?.href && (
                            <ContentSdkLink
                              field={event.fields['Reference Link']}
                              className={styles.referenceLink}
                            />
                          )}
                          {event.url && (
                            <a href={event.url} className={styles.learnMoreLink}>
                              Learn more
                            </a>
                          )}
                          {event.fields['Detail Page URL']?.value && (
                            <a
                              href={event.fields['Detail Page URL'].value}
                              className={styles.detailPageLink}
                            >
                              View Details
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Country Column */}
                      <td className={styles.countryCell}>
                        <span className={styles.countryName}>
                          {event.fields.Country?.value || '-'}
                        </span>
                      </td>

                      {/* Associated Markets Column */}
                      <td className={styles.marketsCell}>
                        {renderAssociatedMarkets(event.fields['Associated Market'])}
                      </td>

                      {/* Impact Column */}
                      <td className={styles.impactCell}>
                        {renderImpactStars(event.fields['Expected Impact']?.value)}
                      </td>

                      {/* Actions Column */}
                      <td className={styles.actionsCell}>
                        <div className={styles.actionButtons}>
                          {event.fields['Promo Link']?.value?.href && (
                            <ContentSdkLink
                              field={event.fields['Promo Link']}
                              className={styles.promoButton}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Regulatory Disclaimer - shown once at bottom */}
            {props.fields.items[0]?.fields['Regulatory Disclaimer']?.value && (
              <div className={styles.regulatoryDisclaimer}>
                <p>{props.fields.items[0].fields['Regulatory Disclaimer'].value}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`component ${styles.marketCalenderRegion}`}>
      <div className="component-content">
        <span className="is-empty-hint">MarketCalenderRegion</span>
      </div>
    </section>
  );
};

// Compact variant - shows fewer details in a more condensed format
export const Compact = (props: MarketCalenderRegionProps): JSX.Element => {
  if (props.fields && props.fields.items && props.fields.items.length > 0) {
    return (
      <section
        className={`component ${styles.marketCalenderRegion} ${styles['marketCalenderRegion--compact']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className="component-content">
          {/* Page Header with Route Fields */}
          {(props.route?.fields?.Title?.value || props.route?.fields?.Description?.value) && (
            <div className={styles.pageHeader}>
              {props.route.fields.Title?.value && (
                <h1 className={styles.pageTitle}>
                  <ContentSdkText field={props.route.fields.Title} />
                </h1>
              )}
              {props.route.fields.Description?.value && (
                <p className={styles.pageDescription}>
                  <ContentSdkText field={props.route.fields.Description} />
                </p>
              )}
            </div>
          )}

          <div className={styles.compactContainer}>
            {props.fields.items.map((event) => {
              const { date, time } = formatDateTime(event.fields['Event Date And Time']?.value);

              return (
                <div key={event.id} className={styles.compactEventCard}>
                  <div className={styles.compactHeader}>
                    <div className={styles.compactDateTime}>
                      <span className={styles.compactDate}>{date}</span>
                      <span className={styles.compactTime}>{time}</span>
                    </div>
                    <div className={styles.compactImpact}>
                      {renderImpactStars(event.fields['Expected Impact']?.value)}
                    </div>
                  </div>

                  <div className={styles.compactContent}>
                    <h4 className={styles.compactEventTitle}>
                      {event.fields['Event Title']?.value || event.fields.Title?.value}
                    </h4>
                    <div className={styles.compactMeta}>
                      <span className={styles.compactCountry}>{event.fields.Country?.value}</span>
                      {event.fields['Associated Market'] &&
                        event.fields['Associated Market'].length > 0 && (
                          <span className={styles.compactMarkets}>
                            • {event.fields['Associated Market'][0].fields.Title?.value}
                            {event.fields['Associated Market'].length > 1 &&
                              ` +${event.fields['Associated Market'].length - 1}`}
                          </span>
                        )}
                    </div>
                    {event.fields['Detail Page URL']?.value && (
                      <a
                        href={event.fields['Detail Page URL'].value}
                        className={styles.compactDetailLink}
                      >
                        View Details
                      </a>
                    )}
                  </div>

                  {event.fields['Promo Link']?.value?.href && (
                    <div className={styles.compactActions}>
                      <ContentSdkLink
                        field={event.fields['Promo Link']}
                        className={styles.compactPromoButton}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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

// List variant - shows events in a simple list format
export const List = (props: MarketCalenderRegionProps): JSX.Element => {
  if (props.fields && props.fields.items && props.fields.items.length > 0) {
    return (
      <section
        className={`component ${styles.marketCalenderRegion} ${styles['marketCalenderRegion--list']} ${props.params?.styles || ''}`}
        id={props.params?.RenderingIdentifier}
      >
        <div className="component-content">
          {/* Page Header with Route Fields */}
          {(props.route?.fields?.Title?.value || props.route?.fields?.Description?.value) && (
            <div className={styles.pageHeader}>
              {props.route.fields.Title?.value && (
                <h1 className={styles.pageTitle}>
                  <ContentSdkText field={props.route.fields.Title} />
                </h1>
              )}
              {props.route.fields.Description?.value && (
                <p className={styles.pageDescription}>
                  <ContentSdkText field={props.route.fields.Description} />
                </p>
              )}
            </div>
          )}

          <div className={styles.listContainer}>
            {props.fields.items.map((event) => {
              const { date, time } = formatDateTime(event.fields['Event Date And Time']?.value);

              return (
                <div key={event.id} className={styles.listItem}>
                  <div className={styles.listDateTime}>
                    <div className={styles.listDate}>{date}</div>
                    <div className={styles.listTime}>{time}</div>
                  </div>

                  <div className={styles.listContent}>
                    <h4 className={styles.listEventTitle}>
                      {event.fields['Event Title']?.value || event.fields.Title?.value}
                    </h4>
                    {event.fields.Description?.value && (
                      <p className={styles.listDescription}>{event.fields.Description.value}</p>
                    )}
                    <div className={styles.listMeta}>
                      <span className={styles.listCountry}>{event.fields.Country?.value}</span>
                      {renderAssociatedMarkets(event.fields['Associated Market'])}
                    </div>
                    {event.fields['Detail Page URL']?.value && (
                      <a
                        href={event.fields['Detail Page URL'].value}
                        className={styles.listDetailLink}
                      >
                        View Details
                      </a>
                    )}
                  </div>

                  <div className={styles.listSidebar}>
                    {renderImpactStars(event.fields['Expected Impact']?.value)}
                    {event.fields['Promo Link']?.value?.href && (
                      <ContentSdkLink
                        field={event.fields['Promo Link']}
                        className={styles.listPromoButton}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
