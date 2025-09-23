import React, { JSX, useState, useEffect, useRef } from 'react';
import { ComponentProps } from 'lib/component-props';
import styles from './FinnhubStockDashboard.module.css';

interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
}

interface CompanyProfile {
  name: string;
  ticker: string;
  logo: string;
  finnhubIndustry: string;
  marketCapitalization: number;
  shareOutstanding: number;
  ipo: string;
  weburl: string;
}

interface NewsItem {
  headline: string;
  url: string;
  source: string;
  datetime: number;
}

interface SearchResult {
  symbol: string;
  description: string;
}

type FinnhubStockDashboardProps = ComponentProps;

const FinnhubStockDashboard = (props: FinnhubStockDashboardProps): JSX.Element => {
  const [symbolInput, setSymbolInput] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState({
    search: false,
    quote: false,
    profile: false,
    news: false,
  });
  const [errors, setErrors] = useState({
    search: '',
    quote: '',
    profile: '',
    news: '',
  });
  const [currentSymbol, setCurrentSymbol] = useState('');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  // Helper function to make API calls
  const fetchData = async (endpoint: string, params: Record<string, string> = {}) => {
    if (!apiKey || apiKey === 'your_finnhub_api_key_here') {
      throw new Error('Finnhub API key not configured');
    }

    const searchParams = new URLSearchParams({ ...params, token: apiKey });
    const url = `https://finnhub.io/api/v1/${endpoint}?${searchParams.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  // Search symbols with debouncing
  const searchSymbols = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading((prev) => ({ ...prev, search: true }));
    setErrors((prev) => ({ ...prev, search: '' }));

    try {
      const data = await fetchData('search', { q: query });
      // Filter out non-US stocks and show top 5
      const filteredResults = data.result
        .filter((item: SearchResult) => item.symbol.indexOf('.') === -1)
        .slice(0, 5);
      setSearchResults(filteredResults);
    } catch (error) {
      setErrors((prev) => ({ ...prev, search: 'Search failed' }));
      setSearchResults([]);
    } finally {
      setLoading((prev) => ({ ...prev, search: false }));
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (value: string) => {
    setSymbolInput(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      searchSymbols(value);
    }, 300);
  };

  // Select symbol from search results
  const selectSymbol = (symbol: string) => {
    setSymbolInput(symbol);
    setSearchResults([]);
    fetchAllData(symbol);
  };

  // Update quote widget
  const updateQuote = async (symbol: string) => {
    setLoading((prev) => ({ ...prev, quote: true }));
    setErrors((prev) => ({ ...prev, quote: '' }));

    try {
      const data = await fetchData('quote', { symbol });

      // Validate the response data structure
      if (!data || typeof data !== 'object') {
        throw new Error(`Invalid response for symbol "${symbol}".`);
      }

      // Check if we have valid numeric data
      if (
        data.c === undefined ||
        data.c === null ||
        (data.c === 0 && data.h === 0 && data.l === 0 && data.o === 0)
      ) {
        throw new Error(
          `No data available for symbol "${symbol}". Please check if the symbol is valid.`
        );
      }

      // Ensure all numeric fields are valid numbers
      const validatedData = {
        c: typeof data.c === 'number' ? data.c : 0,
        d: typeof data.d === 'number' ? data.d : 0,
        dp: typeof data.dp === 'number' ? data.dp : 0,
        h: typeof data.h === 'number' ? data.h : 0,
        l: typeof data.l === 'number' ? data.l : 0,
        o: typeof data.o === 'number' ? data.o : 0,
      };

      setQuote(validatedData);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        quote: error instanceof Error ? error.message : 'Failed to fetch quote',
      }));
      setQuote(null);
    } finally {
      setLoading((prev) => ({ ...prev, quote: false }));
    }
  };

  // Update profile widget
  const updateProfile = async (symbol: string) => {
    setLoading((prev) => ({ ...prev, profile: true }));
    setErrors((prev) => ({ ...prev, profile: '' }));

    try {
      const data = await fetchData('stock/profile2', { symbol });

      // Validate the response data structure
      if (!data || typeof data !== 'object') {
        throw new Error(`Invalid profile response for symbol "${symbol}".`);
      }

      // Check if we have essential company data
      if (!data.name && !data.ticker) {
        throw new Error(`No company profile found for symbol "${symbol}".`);
      }

      // Sanitize the profile data
      const validatedProfile = {
        name: data.name || symbol,
        ticker: data.ticker || symbol,
        logo: data.logo || '',
        finnhubIndustry: data.finnhubIndustry || 'N/A',
        marketCapitalization:
          typeof data.marketCapitalization === 'number' ? data.marketCapitalization : 0,
        shareOutstanding: typeof data.shareOutstanding === 'number' ? data.shareOutstanding : 0,
        ipo: data.ipo || 'N/A',
        weburl: data.weburl || '',
      };

      setProfile(validatedProfile);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        profile: error instanceof Error ? error.message : 'Failed to fetch profile',
      }));
      setProfile(null);
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  };

  // Update news widget
  const updateNews = async (symbol: string) => {
    setLoading((prev) => ({ ...prev, news: true }));
    setErrors((prev) => ({ ...prev, news: '' }));

    try {
      const today = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(today.getMonth() - 1);

      const fromDate = oneMonthAgo.toISOString().split('T')[0];
      const toDate = today.toISOString().split('T')[0];

      const newsData = await fetchData('company-news', {
        symbol,
        from: fromDate,
        to: toDate,
      });

      // Validate news data
      if (!Array.isArray(newsData)) {
        throw new Error(`Invalid news response for symbol "${symbol}".`);
      }

      // Filter and validate news items
      const validatedNews = newsData
        .filter((item) => item && typeof item === 'object' && item.headline)
        .slice(0, 5)
        .map((item) => ({
          headline: item.headline || 'No headline',
          url: item.url || '#',
          source: item.source || 'Unknown',
          datetime: typeof item.datetime === 'number' ? item.datetime : Date.now() / 1000,
        }));

      // Debug logging to see what we're getting
      console.log('Raw news data:', newsData);
      console.log('Validated news:', validatedNews);

      setNews(validatedNews);

      if (validatedNews.length === 0 && newsData.length > 0) {
        setErrors((prev) => ({ ...prev, news: 'No valid news articles found for this symbol.' }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        news: error instanceof Error ? error.message : 'Failed to fetch news',
      }));
      setNews([]);
    } finally {
      setLoading((prev) => ({ ...prev, news: false }));
    }
  };

  // Fetch all data for a symbol
  const fetchAllData = (symbol?: string) => {
    const targetSymbol = symbol || symbolInput.toUpperCase().trim();
    setCurrentSymbol(targetSymbol);
    setSearchResults([]);

    if (!targetSymbol) {
      setErrors((prev) => ({ ...prev, quote: 'Please enter a stock symbol.' }));
      return;
    }

    if (!apiKey || apiKey === 'your_finnhub_api_key_here') {
      const errorMsg = 'Please configure your Finnhub API key in the environment variables.';
      setErrors({
        quote: errorMsg,
        profile: errorMsg,
        news: errorMsg,
        search: '',
      });
      return;
    }

    // Reset errors
    setErrors({ search: '', quote: '', profile: '', news: '' });

    // Fetch all data
    updateQuote(targetSymbol);
    updateProfile(targetSymbol);
    updateNews(targetSymbol);
  };

  // Hide search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector(`.${styles.searchContainer}`);
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <section
      className={`component ${styles.stockDashboard} ${props.params?.styles || ''}`}
      id={props.params?.RenderingIdentifier}
    >
      <div className="component-content">
        <div className={styles.container}>
          <h1 className={styles.title}>Stock Dashboard</h1>

          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input
                type="text"
                value={symbolInput}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type to search for a company..."
                className={styles.symbolInput}
              />
              <button onClick={() => fetchAllData()} className={styles.searchButton}>
                Get Data
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className={styles.searchResults}>
                {searchResults.map((item) => (
                  <div
                    key={item.symbol}
                    className={styles.searchItem}
                    onClick={() => selectSymbol(item.symbol)}
                  >
                    <strong>{item.symbol}</strong>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            )}

            {loading.search && (
              <div className={styles.searchResults}>
                <div className={styles.searchItem}>Searching...</div>
              </div>
            )}

            {errors.search && (
              <div className={styles.searchResults}>
                <div className={`${styles.searchItem} ${styles.error}`}>{errors.search}</div>
              </div>
            )}
          </div>

          <div className={styles.widgetGrid}>
            {/* Quote Widget */}
            <div className={styles.widget}>
              <h2>{currentSymbol ? `Quote for ${currentSymbol}` : 'Quote'}</h2>
              <div className={styles.widgetContent}>
                {loading.quote ? (
                  <div className={styles.loader}>Loading...</div>
                ) : errors.quote ? (
                  <p className={styles.error}>{errors.quote}</p>
                ) : quote ? (
                  <>
                    <div className={styles.quotePrice}>
                      {typeof quote.c === 'number' ? quote.c.toFixed(2) : '0.00'}
                    </div>
                    <div
                      className={`${styles.quoteChange} ${(quote.d || 0) >= 0 ? styles.positive : styles.negative}`}
                    >
                      {typeof quote.d === 'number' ? quote.d.toFixed(2) : '0.00'} (
                      {typeof quote.dp === 'number' ? quote.dp.toFixed(2) : '0.00'}%)
                    </div>
                    <p className={styles.quoteDetails}>
                      <strong>High:</strong>{' '}
                      {typeof quote.h === 'number' ? quote.h.toFixed(2) : '0.00'} |{' '}
                      <strong>Low:</strong>{' '}
                      {typeof quote.l === 'number' ? quote.l.toFixed(2) : '0.00'} |{' '}
                      <strong>Open:</strong>{' '}
                      {typeof quote.o === 'number' ? quote.o.toFixed(2) : '0.00'}
                    </p>
                  </>
                ) : (
                  <div className={styles.loader}>Search for a company to begin.</div>
                )}
              </div>
            </div>

            {/* Company Profile Widget */}
            <div className={`${styles.widget} ${styles.widgetSpan2}`}>
              <h2>Company Profile</h2>
              <div className={styles.widgetContent}>
                {loading.profile ? (
                  <div className={styles.loader}>Loading...</div>
                ) : errors.profile ? (
                  <p className={styles.error}>{errors.profile}</p>
                ) : profile ? (
                  <>
                    <div className={styles.profileHeader}>
                      {profile.logo && (
                        <img src={profile.logo} alt="Logo" className={styles.profileLogo} />
                      )}
                      <div>
                        <h3>
                          {profile.name} ({profile.ticker})
                        </h3>
                        <p>{profile.finnhubIndustry}</p>
                      </div>
                    </div>
                    <div className={styles.profileDetails}>
                      <p>
                        <strong>Market Cap:</strong>{' '}
                        {typeof profile.marketCapitalization === 'number' &&
                        profile.marketCapitalization > 0
                          ? (profile.marketCapitalization / 1000).toFixed(2) + ' Billion'
                          : 'N/A'}
                      </p>
                      <p>
                        <strong>Shares Outstanding:</strong>{' '}
                        {typeof profile.shareOutstanding === 'number' &&
                        profile.shareOutstanding > 0
                          ? profile.shareOutstanding.toFixed(2) + ' Billion'
                          : 'N/A'}
                      </p>
                      <p>
                        <strong>IPO Date:</strong> {profile.ipo || 'N/A'}
                      </p>
                      {profile.weburl && (
                        <p>
                          <strong>Website:</strong>{' '}
                          <a href={profile.weburl} target="_blank" rel="noopener noreferrer">
                            {profile.weburl}
                          </a>
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className={styles.loader}>Search for a company to begin.</div>
                )}
              </div>
            </div>

            {/* News Widget */}
            <div className={`${styles.widget} ${styles.widgetSpan3}`}>
              <h2>Market News (Last 30 Days)</h2>
              <div className={styles.widgetContent}>
                {loading.news ? (
                  <div className={styles.loader}>Loading...</div>
                ) : errors.news ? (
                  <p className={styles.error}>{errors.news}</p>
                ) : news.length > 0 ? (
                  <div className={styles.newsList}>
                    {news.map((article, index) => {
                      console.log(`Article ${index}:`, article);
                      return (
                        <div key={index} className={styles.newsItem}>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: article.url === '#' ? 'gray' : '#667eea' }}
                          >
                            {article.headline}
                          </a>
                          <br />
                          <small>
                            {article.source} -{' '}
                            {new Date(article.datetime * 1000).toLocaleDateString()}
                            {article.url === '#' && <span style={{ color: 'red' }}> [No URL]</span>}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={styles.loader}>Search for a company to begin.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Default = FinnhubStockDashboard;
