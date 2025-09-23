import { EditingRenderMiddleware } from '@sitecore-content-sdk/nextjs/editing';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * This Next.js API route is used to handle GET requests from Sitecore Editor.
 * This route should match the `serverSideRenderingEngineEndpointUrl` in your Sitecore configuration,
 * which is set to "http://<rendering_host>/api/editing/render" by default (see the settings item under /sitecore/content/<your/site/path>/Settings/Site Grouping).
 *
 * The `EditingRenderMiddleware` will
 *  1. Extract data about the route we need to render from the Sitecore Editor GET request
 *  2. Enable Next.js Preview Mode, passing the route data as preview data
 *  3. Redirect the request to the route, passing along the Preview Mode cookies.
 *     This allows retrieval of the editing data in preview context (via an `EditingDataService`) - see `SitecorePagePropsFactory`
 *  4. The redirected request will render the page with editing markup in place
 */

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
    responseLimit: false,
  },
};

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
  console.log('\n=== EDITING RENDER REQUEST DEBUG ===');
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
    console.log(`[Site Mapping] Mapping "${originalSite}" → "${mappedSite}"`);

    // Modify the query object directly on the existing request
    req.query = {
      ...req.query,
      sc_site: mappedSite,
    };

    // Update the URL if it exists
    if (req.url) {
      const oldUrl = req.url;
      req.url = req.url.replace(`sc_site=${originalSite}`, `sc_site=${mappedSite}`);
      console.log('URL updated:', oldUrl, '→', req.url);
    }

    console.log('Final query after mapping:', JSON.stringify(req.query, null, 2));
  } else if (originalSite) {
    console.log(`[Site Mapping] No mapping found for site: "${originalSite}"`);
    console.log('Available mappings:', Object.keys(siteNameMapping));
  } else {
    console.log('[Site Mapping] No sc_site parameter found in query');
  }

  console.log('=== CALLING EDITING RENDER MIDDLEWARE ===\n');

  try {
    // Call the original handler with the (potentially modified) request
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await new EditingRenderMiddleware().getHandler()(req as any, res);
    console.log('[Editing Render] Middleware completed successfully');
    return result;
  } catch (error) {
    console.error('[Editing Render] Middleware error:', error);
    throw error;
  }
};

export default customHandler;
