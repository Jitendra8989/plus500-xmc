import { useEffect, JSX } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import sites from '.sitecore/sites.json';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import {
  SitecoreProvider,
  ComponentPropsContext,
  SitecorePageProps,
  StaticPath,
} from '@sitecore-content-sdk/nextjs';
// We won't use extractPath as we need custom logic.
import { handleEditorFastRefresh } from '@sitecore-content-sdk/nextjs/utils';
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import client from 'lib/sitecore-client';
import components from '.sitecore/component-map';
import scConfig from 'sitecore.config';

/**
 * Resolves the site context from a URL path array.
 * @param {string[]} path - The path array from Next.js context (e.g., ['en-us', 'about-us']).
 * @returns {{ siteName: string | null; language: string | null; itemPath: string | null }}
 */
const resolveSiteContext = (path: string[] = []) => {
  // Get configuration from environment variables
  const defaultSite = process.env.NEXT_PUBLIC_DEFAULT_SITE || 'plus-five-hundred-US';
  const defaultRegion = process.env.NEXT_PUBLIC_DEFAULT_REGION || 'us';
  const defaultLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en';

  const availableLanguages = (process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES || 'ar,en,cn,ro').split(
    ','
  );
  const availableRegions = (process.env.NEXT_PUBLIC_AVAILABLE_REGIONS || 'us,ae,ro').split(',');

  // Parse language mappings from environment
  const languageMappingsEnv =
    process.env.NEXT_PUBLIC_LANGUAGE_MAPPINGS || 'ar=ar-AE,ro=ro-RO,en=en,cn=cn';
  const languageMappings: { [key: string]: string } = {};

  languageMappingsEnv.split(',').forEach((mapping) => {
    const [fromLang, toLang] = mapping.split('=');
    if (fromLang && toLang) {
      languageMappings[fromLang.trim()] = toLang.trim();
    }
  });

  // Dynamically build site map from sites.json
  const siteMap: { [key: string]: { siteName: string; language: string } } = {};

  sites.forEach((site) => {
    if (site.name.includes('-')) {
      const region = site.name.split('-').pop()?.toLowerCase();
      if (region && availableRegions.includes(region)) {
        siteMap[region] = {
          siteName: site.name,
          language: site.language,
        };
      }
    }
  });

  // Add default fallback from env
  siteMap[defaultRegion] = siteMap[defaultRegion] || {
    siteName: defaultSite,
    language: defaultLanguage,
  };

  // Generate valid prefixes dynamically from env config
  const validPrefixes: string[] = [];
  availableRegions.forEach((region) => {
    availableLanguages.forEach((lang) => {
      validPrefixes.push(`${lang}-${region}`);
    });
  });

  // Handle Sitecore multisite middleware rewrite - skip _site_ prefix
  let actualPath = path;
  if (path.length > 0 && path[0].startsWith('_site_')) {
    actualPath = path.slice(1); // Remove the _site_ prefix
  }

  // Handle the root path. Default to configured primary site/language.
  if (actualPath.length === 0 || !actualPath[0]) {
    return {
      siteName: defaultSite,
      language: defaultLanguage,
      itemPath: '/',
    };
  }

  const firstSegment = actualPath[0];
  const normalizedSegment = firstSegment.toLowerCase();

  // Check for language-region prefix (e.g., 'ar-ae', 'en-us')
  if (validPrefixes.includes(normalizedSegment)) {
    const [lang, region] = normalizedSegment.split('-');
    const siteConfig = siteMap[region];

    if (!siteConfig) {
      return { siteName: null, language: null, itemPath: null };
    }

    const remainingPath = actualPath.slice(1);
    const itemPath = '/' + remainingPath.join('/');

    // Apply language mappings from environment config
    const mappedLanguage = languageMappings[lang];
    const language = mappedLanguage || lang;

    return {
      siteName: siteConfig.siteName,
      language,
      itemPath,
    };
  }

  // Check for single-segment patterns (language-only or region-only)
  if (availableLanguages.includes(normalizedSegment)) {
    const remainingPath = actualPath.slice(1);
    const itemPath = '/' + remainingPath.join('/');

    // Use default region with specified language
    const mappedLanguage = languageMappings[normalizedSegment];
    const language = mappedLanguage || normalizedSegment;

    return {
      siteName: defaultSite,
      language,
      itemPath,
    };
  }

  if (Object.keys(siteMap).includes(normalizedSegment)) {
    const remainingPath = actualPath.slice(1);
    const itemPath = '/' + remainingPath.join('/');
    const siteConfig = siteMap[normalizedSegment];

    return {
      siteName: siteConfig.siteName,
      language: siteConfig.language,
      itemPath,
    };
  }

  // Fallback: treat as content path on default site
  return {
    siteName: defaultSite,
    language: defaultLanguage,
    itemPath: `/${actualPath.join('/')}`,
  };
};

const SitecorePage = ({ page, notFound, componentProps }: SitecorePageProps): JSX.Element => {
  useEffect(() => {
    // Since Sitecore Editor does not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  if (notFound || !page) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  return (
    <ComponentPropsContext value={componentProps || {}}>
      <SitecoreProvider componentMap={components} api={scConfig.api} page={page}>
        <Layout page={page} />
      </SitecoreProvider>
    </ComponentPropsContext>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  let paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';

  if (process.env.NODE_ENV !== 'development' && scConfig.generateStaticPaths) {
    try {
      // Generate paths for each language/region combination.
      const siteConfigs = [
        { siteName: 'plus-five-hundred-US', prefixes: ['en-us', 'cn-us'] },
        { siteName: 'plus-five-hundred-AE', prefixes: ['ar-ae', 'en-ae', 'cn-ae'] },
        { siteName: 'plus-five-hundred-RO', prefixes: ['ro-ro', 'en-ro', 'cn-ro'] },
      ];

      const pathPromises = siteConfigs.map(async (config) => {
        // Fetch all paths for a single site
        const sitePaths = await client.getPagePaths([config.siteName], context?.locales || []);

        // For each path, create all its prefixed variations
        const prefixedPaths = config.prefixes.flatMap((prefix) =>
          sitePaths.map((sitePath) => {
            const originalPath = (sitePath.params.path as string[]).filter((p) => p); // Remove empty segments
            return {
              params: {
                path: [prefix, ...originalPath],
              },
            };
          })
        );
        return prefixedPaths;
      });

      const allPaths = await Promise.all(pathPromises);
      paths = allPaths.flat();
    } catch (error) {
      console.log('Error occurred while fetching static paths');
      console.log(error);
    }

    fallback = process.env.EXPORT_MODE ? false : fallback;
  }

  return {
    paths,
    fallback,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pathArray = context.params?.path as string[] | undefined;
  const { siteName, language, itemPath } = resolveSiteContext(pathArray);

  if (!siteName || !language || itemPath === null) {
    return {
      notFound: true,
    };
  }

  let props = {};
  let page;

  if (context.preview && isDesignLibraryPreviewData(context.previewData)) {
    page = await client.getDesignLibraryData(context.previewData);
  } else {
    page = context.preview
      ? await client.getPreview(context.previewData)
      : await client.getPage(itemPath, { site: siteName, locale: language });
  }

  if (page) {
    props = {
      page,
      dictionary: await client.getDictionary({
        site: page.siteName,
        locale: page.locale,
      }),
      componentProps: await client.getComponentData(page.layout, context, components),
    };
  }

  return {
    props,
    revalidate: 5, // In seconds
    notFound: !page,
  };
};

export default SitecorePage;
