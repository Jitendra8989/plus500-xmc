import React, { useState, useEffect, useCallback, JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import styles from './FinancialInstruments.module.css';

interface FinancialInstrumentField {
  name: string;
  value: string;
}

interface FinancialInstrument {
  id: string;
  name: string;
  path: string;
  fields: FinancialInstrumentField[];
  symbol?: { value: string };
  currentPrice?: { value: string };
  marketStatus?: { value: string };
  assetType?: { value: string };
  exchange?: { value: string };
  currency?: { value: string };
  leverage?: { value: string };
  region?: { value: string };
  sector?: { value: string };
}

interface FinancialInstrumentCategory {
  id: string;
  name: string;
  path: string;
  children: {
    results: FinancialInstrumentSubcategory[];
  };
}

interface FinancialInstrumentSubcategory {
  id: string;
  name: string;
  path: string;
  children: {
    total: number;
  };
}

interface GraphQLResponse {
  item?: {
    id: string;
    name: string;
    path: string;
    children: {
      results: FinancialInstrumentCategory[];
    };
  };
}

interface InstrumentResponse {
  item?: {
    id: string;
    name: string;
    children: {
      results: FinancialInstrument[];
    };
  };
}

type FinancialInstrumentsProps = ComponentProps & {
  fields?: {
    contextId?: { value: string };
    endpoint?: { value: string };
  };
};

const GRAPHQL_ENDPOINT = 'https://edge-platform.sitecorecloud.io/v1/content/api/graphql/v1';
const SITECORE_CONTEXT_ID = '7KMLyD39rv5jUREDjj2Fwr';

export const Default = (props: FinancialInstrumentsProps): JSX.Element => {
  const [categories, setCategories] = useState<FinancialInstrumentCategory[]>([]);
  const [instruments, setInstruments] = useState<FinancialInstrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const makeGraphQLQuery = useCallback(
    async (query: string, variables: Record<string, unknown> = {}) => {
      try {
        const url = new URL(GRAPHQL_ENDPOINT);
        url.searchParams.append('sitecoreContextId', SITECORE_CONTEXT_ID);

        const response = await fetch(url.toString(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.errors) {
          throw new Error(result.errors[0].message);
        }
        return result.data;
      } catch (error) {
        console.error('GraphQL Error:', error);
        setError(
          `Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        return null;
      }
    },
    []
  );

  const loadCategories = useCallback(async () => {
    const query = `
      query GetFinancialInstruments($language: String!) {
        item(path: "/sitecore/content/plus-five-hundred/plus-five-hundred/Data/Financial Instruments", language: $language) {
          id
          name
          path
          children {
            results {
              id
              name
              path
              children {
                results {
                  id
                  name
                  path
                  children {
                    total
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      language: 'en',
    };

    const data: GraphQLResponse = await makeGraphQLQuery(query, variables);

    if (data && data.item) {
      setCategories(data.item.children.results || []);
    } else {
      setError('No categories found or failed to load data');
    }
    setLoading(false);
  }, [makeGraphQLQuery]);

  const loadInstruments = useCallback(
    async (categoryPath: string, subcategoryName?: string) => {
      setLoading(true);
      let targetPath = categoryPath;
      if (subcategoryName) {
        targetPath = `${categoryPath}/${subcategoryName}`;
      }

      const query = `
      query GetInstruments($language: String!, $path: String!) {
        item(path: $path, language: $language) {
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

      const variables = {
        language: 'en',
        path: targetPath,
      };

      const data: InstrumentResponse = await makeGraphQLQuery(query, variables);
      if (data && data.item && data.item.children) {
        const processedInstruments = data.item.children.results
          .map((item) => {
            const fields: Record<string, { value: string }> = {};
            if (item.fields) {
              item.fields.forEach((field) => {
                fields[field.name] = { value: field.value };
              });
            }

            return {
              ...item,
              symbol: fields.Symbol,
              currentPrice: fields['Current Price'],
              marketStatus: fields['Market Status'],
              assetType: fields['Asset Type'],
              exchange: fields.Exchange,
              currency: fields.Currency,
              leverage: fields.Leverage,
              region: fields.Region,
              sector: fields.Sector,
            };
          })
          .filter((item) => item.symbol && item.symbol.value);

        setInstruments(processedInstruments);
      } else {
        setInstruments([]);
      }
      setLoading(false);
    },
    [makeGraphQLQuery]
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSubcategoryClick = (categoryPath: string, subcategoryName: string) => {
    setSelectedSubcategory(`${categoryPath}/${subcategoryName}`);
    loadInstruments(categoryPath, subcategoryName);
  };

  const getTotalInstruments = (category: FinancialInstrumentCategory): number => {
    return category.children.results.reduce((sum, subcat) => sum + (subcat.children.total || 0), 0);
  };

  const renderSummaryStats = () => {
    const totalInstruments = categories.reduce((sum, cat) => sum + getTotalInstruments(cat), 0);
    const totalCategories = categories.length;
    const totalSubcategories = categories.reduce(
      (sum, cat) => sum + cat.children.results.length,
      0
    );

    return (
      <div className={styles.summaryStats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{totalInstruments}</span>
          <span className={styles.statLabel}>Total Instruments</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{totalCategories}</span>
          <span className={styles.statLabel}>Asset Classes</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{totalSubcategories}</span>
          <span className={styles.statLabel}>Subcategories</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>100%</span>
          <span className={styles.statLabel}>System Online</span>
        </div>
      </div>
    );
  };

  const renderInstrumentCard = (instrument: FinancialInstrument) => {
    const symbol = instrument.symbol?.value || 'N/A';
    const name = instrument.name || 'Unknown Instrument';
    const price = instrument.currentPrice?.value || '0.00';
    const marketStatus = instrument.marketStatus?.value || 'Unknown';
    const exchange = instrument.exchange?.value || 'N/A';
    const currency = instrument.currency?.value || 'N/A';
    const leverage = instrument.leverage?.value || 'N/A';
    const region = instrument.region?.value || 'N/A';

    return (
      <div key={instrument.id} className={styles.instrumentCard}>
        <div className={styles.instrumentSymbol}>{symbol}</div>
        <div className={styles.instrumentName}>{name}</div>
        <div className={styles.instrumentPrice}>
          {currency} {price}
        </div>

        <div className={styles.instrumentDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Status</span>
            <span className={styles.detailValue}>{marketStatus}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Exchange</span>
            <span className={styles.detailValue}>{exchange}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Leverage</span>
            <span className={styles.detailValue}>{leverage}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Region</span>
            <span className={styles.detailValue}>{region}</span>
          </div>
        </div>
      </div>
    );
  };

  const filterInstruments = () => {
    if (!searchTerm) return instruments;

    return instruments.filter((instrument) => {
      const symbol = (instrument.symbol?.value || '').toLowerCase();
      const name = (instrument.name || '').toLowerCase();
      return symbol.includes(searchTerm.toLowerCase()) || name.includes(searchTerm.toLowerCase());
    });
  };

  const filteredInstruments = filterInstruments();

  if (error) {
    return (
      <section className={`component ${styles.financialInstruments}`}>
        <div className="component-content">
          <div className={styles.error}>
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`component ${styles.financialInstruments} ${props.params?.styles || ''}`}
      id={props.params?.RenderingIdentifier}
    >
      <div className="component-content">
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Plus500 Financial Instruments</h1>
          <p className={styles.headerSubtitle}>Enterprise-Grade Financial Data Management System</p>
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.sidebar}>
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search instruments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && categories.length === 0 ? (
              <div className={styles.loading}>Loading categories...</div>
            ) : (
              categories.map((category) => (
                <div key={category.id} className={styles.categoryCard}>
                  <div
                    className={styles.categoryHeader}
                    onClick={() => toggleCategory(category.name)}
                  >
                    <span className={styles.categoryTitle}>{category.name}</span>
                    <span className={styles.categoryCount}>{getTotalInstruments(category)}</span>
                  </div>
                  <div
                    className={`${styles.subcategories} ${expandedCategories.has(category.name) ? styles.active : ''}`}
                  >
                    {category.children.results.map((subcat) => (
                      <div
                        key={subcat.id}
                        className={`${styles.subcategory} ${selectedSubcategory === `${category.path}/${subcat.name}` ? styles.selected : ''}`}
                        onClick={() => handleSubcategoryClick(category.path, subcat.name)}
                      >
                        <span>{subcat.name}</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                          {subcat.children.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.contentArea}>
            {renderSummaryStats()}

            {loading ? (
              <div className={styles.loading}>Loading financial instruments...</div>
            ) : filteredInstruments.length === 0 ? (
              <div className={styles.emptyState}>
                <h3 className={styles.emptyStateTitle}>No instruments found</h3>
                <p className={styles.emptyStateMessage}>
                  {searchTerm
                    ? 'Try adjusting your search terms'
                    : 'Select a category from the sidebar to view instruments'}
                </p>
              </div>
            ) : (
              <div className={styles.instrumentGrid}>
                {filteredInstruments.map(renderInstrumentCard)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
