/**
 * This Layout is needed for Starter Kit.
 */
import React, { JSX, useEffect } from 'react';
import Head from 'next/head';
import { Placeholder, Field, DesignLibrary, Page } from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'src/components/content-sdk/SitecoreStyles';
import { applyRTLDirection } from 'src/lib/rtl-utils';

interface LayoutProps {
  page: Page;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const fields = route?.fields as RouteFields;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';

  // Get current language from Sitecore context
  const currentLanguage = layout?.sitecore?.context?.language || 'en';

  // Apply RTL direction based on language
  useEffect(() => {
    applyRTLDirection(currentLanguage);
  }, [currentLanguage]);

  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles/rtl.css" />
        <link rel="stylesheet" href="/styles/rich-text-content.css" />
        <link rel="stylesheet" href="/styles/project-brief.css" />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        {mode.isDesignLibrary ? (
          <DesignLibrary />
        ) : (
          <>
            <header>
              <div id="header">
                {route && <Placeholder name="headless-header" rendering={route} />}
              </div>
            </header>
            <main>
              <div id="content">
                {route && <Placeholder name="headless-main" rendering={route} />}
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
    </>
  );
};

export default Layout;
