import { EditingConfigMiddleware } from '@sitecore-content-sdk/nextjs/editing';
import { NextApiRequest, NextApiResponse } from 'next';
import components from '.sitecore/component-map';
import metadata from '.sitecore/metadata.json';

/**
 * This Next.js API route is used by Sitecore Editor in XM Cloud
 * to determine feature compatibility and configuration.
 */

// Site name mapping to handle XM Cloud site resolution issues
const siteNameMapping: Record<string, string> = {
  contentsdksite: 'plus-five-hundred-US',
  'plus-five-hundred': 'plus-five-hundred-US', // Default fallback
  // Add other mappings as needed
  'plus-five-hundred-us': 'plus-five-hundred-US',
  'plus-five-hundred-ae': 'plus-five-hundred-AE',
  'plus-five-hundred-ro': 'plus-five-hundred-RO',
};

// Custom handler that maps site names before processing
const customHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('\n=== EDITING CONFIG REQUEST DEBUG ===');
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  console.log('Request Query:', JSON.stringify(req.query, null, 2));
  console.log('Request Headers (relevant):', {
    host: req.headers.host,
    referer: req.headers.referer,
    'user-agent': req.headers['user-agent']?.substring(0, 50) + '...',
    cookie: req.headers.cookie?.substring(0, 100) + '...',
  });

  // Check if we need to map the site name
  const originalSite = req.query.sc_site as string;
  console.log('Original site from query:', originalSite);

  if (originalSite && siteNameMapping[originalSite]) {
    const mappedSite = siteNameMapping[originalSite];
    console.log(`[Config Site Mapping] Mapping "${originalSite}" → "${mappedSite}"`);

    // Modify the query object directly on the existing request
    req.query = {
      ...req.query,
      sc_site: mappedSite,
    };

    // Update the URL if it exists
    if (req.url) {
      const oldUrl = req.url;
      req.url = req.url.replace(`sc_site=${originalSite}`, `sc_site=${mappedSite}`);
      console.log('Config URL updated:', oldUrl, '→', req.url);
    }

    console.log('Final config query after mapping:', JSON.stringify(req.query, null, 2));
  } else if (originalSite) {
    console.log(`[Config Site Mapping] No mapping found for site: "${originalSite}"`);
    console.log('Available mappings:', Object.keys(siteNameMapping));
  } else {
    console.log('[Config Site Mapping] No sc_site parameter found in query');
  }

  console.log('=== CALLING EDITING CONFIG MIDDLEWARE ===\n');

  try {
    // Call the original handler with the (potentially modified) request
    const result = await new EditingConfigMiddleware({
      components,
      metadata,
    }).getHandler()(req, res);
    console.log('[Editing Config] Middleware completed successfully');
    return result;
  } catch (error) {
    console.error('[Editing Config] Middleware error:', error);
    throw error;
  }
};

export default customHandler;
