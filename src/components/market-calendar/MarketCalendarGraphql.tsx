import React, { useState, useEffect, useCallback, JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import styles from './MarketCalendarGraphql.module.css';

interface MarketEvent {
  id: string;
  name: string;
  path: string;
  eventTitle: string;
  eventDateTime: string;
  description?: string;
  country?: string;
  expectedImpact: string;
  visibilityWindow?: string;
  referenceLink?: string;
  promoLink?: string;
  regulatoryDisclaimer?: string;
}

interface GraphQLField {
  name: string;
  value: string;
}

interface GraphQLEvent {
  id: string;
  name: string;
  path: string;
  fields?: GraphQLField[];
}

interface GraphQLResponse {
  data?: {
    item?: {
      id: string;
      name: string;
      children?: {
        results: GraphQLEvent[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}

type MarketCalendarGraphqlProps = ComponentProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Default = (_props: MarketCalendarGraphqlProps): JSX.Element => {
  const [events, setEvents] = useState<MarketEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<MarketEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    country: '',
    impact: '',
  });
  const [sortBy, setSortBy] = useState('date');

  const graphqlEndpoint = 'https://edge-platform.sitecorecloud.io/v1/content/api/graphql/v1';
  const sitecoreContextId = '7KMLyD39rv5jUREDjj2Fwr';

  useEffect(() => {
    setDefaultDates();
  }, []);

  const setDefaultDates = () => {
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2026-12-31');

    setFilters((prev) => ({
      ...prev,
      dateFrom: startDate.toISOString().split('T')[0],
      dateTo: endDate.toISOString().split('T')[0],
    }));
  };

  const makeGraphQLQuery = async (
    query: string,
    variables: Record<string, unknown> = {}
  ): Promise<unknown> => {
    try {
      const url = new URL(graphqlEndpoint);
      url.searchParams.append('sitecoreContextId', sitecoreContextId);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: GraphQLResponse = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      return result.data;
    } catch (error) {
      console.error('GraphQL Error:', error);
      throw error;
    }
  };

  const searchEvents = async () => {
    setLoading(true);
    setError(null);

    const query = `
      query GetMarketCalendarEvents($language: String!) {
        item(path: "/sitecore/content/plus-five-hundred/plus-five-hundred/US/Home/MarketCalender", language: $language) {
          id
          name
          children {
            results {
              id
              name
              path
              fields {
                name
                value
              }
            }
          }
        }
      }
    `;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (await makeGraphQLQuery(query, { language: 'en' })) as any;

      if (data && data.item && data.item.children && data.item.children.results) {
        const processedEvents = processEvents(data.item.children.results);
        setEvents(processedEvents);
        applyFiltersToEvents(processedEvents);
      } else {
        throw new Error('No market calendar data found in response');
      }
    } catch (err) {
      setError('Failed to load market events: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const processEvents = (rawEvents: GraphQLEvent[]): MarketEvent[] => {
    return rawEvents
      .map((event) => {
        const fields: Record<string, string> = {};
        if (event.fields) {
          event.fields.forEach((field) => {
            fields[field.name] = field.value;
          });
        }

        return {
          id: event.id,
          name: event.name,
          path: event.path,
          eventTitle: fields['Event Title'] || event.name,
          eventDateTime: fields['Event Date And Time'] || '',
          description: fields['Description'] || '',
          country: fields['Country'] || '',
          expectedImpact: fields['Expected Impact'] || '1',
          visibilityWindow: fields['Visibility Window'] || '',
          referenceLink: fields['Reference Link'] || '',
          promoLink: fields['Promo Link'] || '',
          regulatoryDisclaimer: fields['Regulatory Disclaimer'] || '',
        };
      })
      .filter((event) => event.eventDateTime);
  };

  const parseEventDate = (dateTimeString: string): Date | null => {
    if (!dateTimeString || dateTimeString.length < 8) return null;

    try {
      const year = parseInt(dateTimeString.substr(0, 4));
      const month = parseInt(dateTimeString.substr(4, 2)) - 1;
      const day = parseInt(dateTimeString.substr(6, 2));
      const hour = parseInt(dateTimeString.substr(9, 2)) || 0;
      const minute = parseInt(dateTimeString.substr(11, 2)) || 0;

      return new Date(year, month, day, hour, minute);
    } catch (error) {
      console.error('Error parsing date:', dateTimeString, error);
      return null;
    }
  };

  const applyFiltersToEvents = useCallback(
    (eventsToFilter: MarketEvent[] = events) => {
      let filtered = eventsToFilter.filter((event) => {
        const eventDate = parseEventDate(event.eventDateTime);
        if (!eventDate) return false;

        // Date filter
        if (filters.dateFrom && eventDate < new Date(filters.dateFrom)) return false;
        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo);
          toDate.setHours(23, 59, 59);
          if (eventDate > toDate) return false;
        }

        // Country filter
        if (filters.country && event.country !== filters.country) return false;

        // Impact filter
        if (filters.impact && event.expectedImpact !== filters.impact) return false;

        return true;
      });

      // Apply sorting
      filtered = sortEvents(filtered, sortBy);
      setFilteredEvents(filtered);
    },
    [events, filters, sortBy]
  );

  const sortEvents = (eventsToSort: MarketEvent[], sortType: string): MarketEvent[] => {
    return [...eventsToSort].sort((a, b) => {
      switch (sortType) {
        case 'date':
          const dateA = parseEventDate(a.eventDateTime);
          const dateB = parseEventDate(b.eventDateTime);
          return (dateA?.getTime() || 0) - (dateB?.getTime() || 0);
        case 'impact':
          return parseInt(b.expectedImpact) - parseInt(a.expectedImpact);
        case 'country':
          return (a.country || '').localeCompare(b.country || '');
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    if (events.length > 0) {
      applyFiltersToEvents();
    }
  }, [filters, sortBy, applyFiltersToEvents]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const extractUrl = (linkField: string): string => {
    try {
      if (linkField.includes('url="')) {
        const match = linkField.match(/url="([^"]+)"/);
        return match ? match[1] : '#';
      }
      return linkField.includes('http') ? linkField : '#';
    } catch {
      return '#';
    }
  };

  const addToWatchlist = (eventId: string) => {
    console.log('Adding to watchlist:', eventId);
    alert('Event added to watchlist!');
  };

  const renderEventCard = (event: MarketEvent) => {
    const eventDate = parseEventDate(event.eventDateTime);
    const dateStr = eventDate
      ? eventDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Date TBD';
    const timeStr = eventDate
      ? eventDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })
      : '';

    const impactLevel = parseInt(event.expectedImpact) || 1;
    const impactText = ['', 'Low', 'Low-Medium', 'Medium', 'High', 'Very High'][impactLevel];

    return (
      <div key={event.id} className={styles.eventCard}>
        <div className={styles.eventHeader}>
          <div className={styles.eventTitle}>{event.eventTitle}</div>
          <div className={`${styles.impactBadge} ${styles[`impact${impactLevel}`]}`}>
            {impactText} Impact ({impactLevel})
          </div>
        </div>

        <div className={styles.eventDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Date & Time</span>
            <span className={styles.detailValue}>
              {dateStr}
              <small>{timeStr}</small>
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Country</span>
            <span className={styles.detailValue}>{event.country || 'Not specified'}</span>
          </div>
        </div>

        {event.description && <div className={styles.eventDescription}>{event.description}</div>}

        <div className={styles.eventActions}>
          {event.referenceLink && (
            <button
              className={`${styles.actionBtn} ${styles.btnPrimary}`}
              onClick={() => window.open(extractUrl(event.referenceLink!), '_blank')}
            >
              📖 Official Source
            </button>
          )}
          {event.promoLink && (
            <button
              className={`${styles.actionBtn} ${styles.btnSecondary}`}
              onClick={() => window.open(extractUrl(event.promoLink!), '_blank')}
            >
              📈 Trade Now
            </button>
          )}
          <button
            className={`${styles.actionBtn} ${styles.btnSecondary}`}
            onClick={() => addToWatchlist(event.id)}
          >
            ⭐ Watch
          </button>
        </div>

        {event.regulatoryDisclaimer && (
          <div className={styles.regulatoryDisclaimer}>
            <strong>Risk Warning:</strong> {event.regulatoryDisclaimer}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Market Calendar</h1>
        <p className={styles.headerSubtitle}>
          Browse upcoming economic events and market-moving announcements
        </p>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Date From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            className={styles.filterInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Date To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            className={styles.filterInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Country</label>
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Countries</option>
            <option value="United States">United States</option>
            <option value="Germany">Germany</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Japan">Japan</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="France">France</option>
            <option value="Italy">Italy</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Impact Level</label>
          <select
            value={filters.impact}
            onChange={(e) => handleFilterChange('impact', e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Impact Levels</option>
            <option value="1">Low (1)</option>
            <option value="2">Low-Medium (2)</option>
            <option value="3">Medium (3)</option>
            <option value="4">High (4)</option>
            <option value="5">Very High (5)</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <button onClick={searchEvents} className={styles.searchBtn}>
            Search Events
          </button>
        </div>
      </div>

      <div className={styles.resultsSection}>
        <div className={styles.resultsHeader}>
          <div className={styles.resultsCount}>
            {loading ? 'Loading...' : `Found ${filteredEvents.length} events`}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="date">Sort by Date</option>
            <option value="impact">Sort by Impact</option>
            <option value="country">Sort by Country</option>
          </select>
        </div>

        <div className={styles.eventsContainer}>
          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading market events...</p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <h3>Error</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className={`${styles.actionBtn} ${styles.btnPrimary}`}
                style={{ marginTop: '1rem' }}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && filteredEvents.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📅</div>
              <h3>No events found</h3>
              <p>Try adjusting your filters or date range</p>
            </div>
          )}

          {!loading && !error && filteredEvents.length > 0 && (
            <div className={styles.eventsGrid}>{filteredEvents.map(renderEventCard)}</div>
          )}

          {!loading && !error && events.length === 0 && filteredEvents.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📅</div>
              <h3>Market Calendar Ready</h3>
              <p>
                Set your filters above and click &ldquo;Search Events&rdquo; to find relevant market
                events
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
