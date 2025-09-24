/**
 * This Layout is needed for Starter Kit.
 */
import React, { type JSX, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Placeholder, Page, Field, DesignLibrary, ImageField } from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'components/content-sdk/SitecoreStyles';
import { Figtree, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider/theme-provider.dev';
import { VideoProvider } from './contexts/VideoContext';

const heading = Figtree({
  weight: ['400', '500'],
  variable: '--font-heading',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const body = Figtree({
  weight: ['400', '500'],
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
interface LayoutProps {
  page: Page;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  metadataTitle?: Field;
  metadataKeywords?: Field;
  pageTitle?: Field;
  metadataDescription?: Field;
  pageSummary?: Field;
  ogTitle?: Field;
  ogDescription?: Field;
  ogImage?: ImageField;
  thumbnailImage?: ImageField;
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const router = useRouter();

  // Early return if no page data
  if (!page) {
    return <div>Loading...</div>;
  }

  const { layout, mode } = page;

  // Handle missing layout or sitecore data
  if (!layout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1>Page Not Found</h1>
          <p>This page may not exist in the current language.</p>
        </div>
      </div>
    );
  }

  const route = layout?.sitecore?.route;
  const fields = route?.fields as RouteFields;

  // RTL detection based on Sitecore context language
  const rtlLocales = ['ar', 'ar-ae', 'ar-sa', 'he', 'fa', 'ur'];

  // Primary source: Sitecore context language, fallback to Next.js router
  const sitecoreLanguage = layout?.sitecore?.context?.language;
  const currentLocale = sitecoreLanguage || router.locale || 'en';

  const isRTL = rtlLocales.some(locale => currentLocale.toLowerCase().includes(locale.toLowerCase()));
  const direction = isRTL ? 'rtl' : 'ltr';

  // Debug logging with error handling
  if (typeof window !== 'undefined' && console && console.log) {
    try {
      console.log('RTL Detection:', {
        sitecoreLanguage,
        routerLocale: router?.locale,
        currentLocale,
        isRTL,
        direction,
        isEditing: mode?.isEditing,
        hasLayout: !!layout,
        hasSitecore: !!layout?.sitecore,
        hasContext: !!layout?.sitecore?.context
      });
    } catch (error) {
      // Silent fail for debug logging
    }
  }

  // Inject RTL CSS custom properties and HTML attributes
  useEffect(() => {
    if (typeof window !== 'undefined' && document?.documentElement) {
      try {
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('dir', direction);
        htmlElement.setAttribute('lang', currentLocale);
        htmlElement.style.setProperty('--direction', direction);
        htmlElement.style.setProperty('--text-align', isRTL ? 'right' : 'left');
        htmlElement.style.setProperty('--text-align-opposite', isRTL ? 'left' : 'right');
      } catch (error) {
        console.warn('Failed to set RTL attributes:', error);
      }
    }
  }, [direction, currentLocale, isRTL]);

  const mainClassPageEditing = mode?.isEditing ? 'editing-mode' : 'prod-mode';
  const rtlClass = isRTL ? 'rtl-layout' : 'ltr-layout';
  const classNamesMain = `${mainClassPageEditing} ${rtlClass} ${body.variable} ${heading.variable} ${inter.variable} main-layout`;

  const metaTitle =
    fields?.Title?.value?.toString() || fields?.pageTitle?.value?.toString() || 'Page';
  const metaDescription =
    fields?.metadataDescription?.value?.toString() || fields?.pageSummary?.value?.toString() || '';
  const metaKeywords = fields?.metadataKeywords?.value?.toString() || '';
  const ogTitle =
    fields?.ogTitle?.value?.toString() ||
    fields?.metadataTitle?.value?.toString() ||
    fields?.pageTitle?.value?.toString() ||
    'Page';
  const ogImage = fields?.ogImage?.value?.src || fields?.thumbnailImage?.value?.src;
  const ogDescription =
    fields?.ogDescription?.value?.toString() ||
    fields?.metadataDescription?.value?.toString() ||
    fields?.pageSummary?.value?.toString() ||
    '';
  return (
    <>
      <Scripts />
      {layout && <SitecoreStyles layoutData={layout} />}
      <Head>
        <html lang={currentLocale} dir={direction} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://edge-platform.sitecorecloud.io" />
        <title>{metaTitle}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <link rel="icon" href="/favicon.ico" />
        {ogTitle && <meta property="og:title" content={ogTitle} />}
        {ogDescription && <meta property="og:description " content={ogDescription} />}
        {ogImage && <meta property="og:image " content={ogImage} />}
      </Head>
      <VideoProvider>
        {/* root placeholder for the app, which we add components to using route data */}
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <div className={`min-h-screen flex flex-col font-sans antialiased bg-background text-foreground ${classNamesMain}`} dir={direction}>
            {mode?.isDesignLibrary ? (
              <DesignLibrary />
            ) : (
              <>
                <header>
                  <div id="header">
                    {route ? (
                      <Placeholder name="headless-header" rendering={route} />
                    ) : (
                      <div className="container mx-auto px-6 py-4">
                        <div className="text-2xl font-bold text-primary">Plus500</div>
                      </div>
                    )}
                  </div>
                </header>
                <main className="flex-1">
                  <div id="content">
                    {route ? (
                      <Placeholder name="headless-main" rendering={route} />
                    ) : (
                      <div className="container mx-auto px-6 py-16 text-center">
                        <h1 className="text-4xl font-bold mb-4">Page Not Available</h1>
                        <p className="text-muted-foreground mb-8">
                          This page is not available in the current language.
                        </p>
                        <a
                          href="/"
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                          Go to Home
                        </a>
                      </div>
                    )}
                  </div>
                </main>
                <footer>
                  <div id="footer">
                    {route && <Placeholder name="headless-footer" rendering={route} />}
                  </div>
                </footer>
              </>
            )}
          </div>
        </ThemeProvider>
      </VideoProvider>
    </>
  );
};

export default Layout;
