/**
 * Debug Layout Service Response
 * Check what site names are available and the response structure
 */

const LAYOUT_SERVICE_ENDPOINT = 'https://edge-platform.sitecorecloud.io/v1/content/api/graphql/v1?sitecoreContextId=7KMLyD39rv5jUREDjj2Fwr';

async function testSiteNames() {
  const siteNames = ['plus-five-hundred', 'contentsdksite', 'plus500', 'plusfivehundred'];

  for (const siteName of siteNames) {
    console.log(`\n🔍 Testing site name: "${siteName}"`);

    const query = `
      query LayoutService($language: String!) {
        layout(language: $language, routePath: "/", site: "${siteName}") {
          item {
            rendered
          }
        }
      }
    `;

    try {
      const response = await fetch(LAYOUT_SERVICE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { language: 'en' }
        })
      });

      const data = await response.json();

      if (data.errors) {
        console.log(`❌ GraphQL errors:`, data.errors.map(e => e.message));
      } else if (data.data?.layout?.item?.rendered) {
        console.log(`✅ Valid response received`);
        console.log(`   Site context:`, data.data.layout.item.rendered.sitecore?.context?.site?.name);
        console.log(`   Route name:`, data.data.layout.item.rendered.sitecore?.route?.name);
      } else if (data.data?.layout === null) {
        console.log(`⚠️  Layout returned null - site may not exist or route not found`);
      } else {
        console.log(`⚠️  Unexpected response structure:`, Object.keys(data.data || {}));
      }
    } catch (error) {
      console.log(`❌ Request failed:`, error.message);
    }
  }
}

// Also test the original query without site parameter
async function testWithoutSite() {
  console.log(`\n🔍 Testing without site parameter:`);

  const query = `
    query LayoutService($language: String!) {
      layout(language: $language, routePath: "/") {
        item {
          rendered
        }
      }
    }
  `;

  try {
    const response = await fetch(LAYOUT_SERVICE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { language: 'en' }
      })
    });

    const data = await response.json();

    if (data.errors) {
      console.log(`❌ GraphQL errors:`, data.errors.map(e => e.message));
    } else if (data.data?.layout?.item?.rendered) {
      console.log(`✅ Valid response received`);
      console.log(`   Site context:`, data.data.layout.item.rendered.sitecore?.context?.site?.name);
      console.log(`   Route name:`, data.data.layout.item.rendered.sitecore?.route?.name);

      // Show all placeholders
      const placeholders = data.data.layout.item.rendered.sitecore?.route?.placeholders;
      if (placeholders) {
        console.log(`   Placeholders:`, Object.keys(placeholders));
      }
    } else {
      console.log(`⚠️  Unexpected response:`, data);
    }
  } catch (error) {
    console.log(`❌ Request failed:`, error.message);
  }
}

async function runDebug() {
  console.log('=== Layout Service Site Name Debug ===');

  await testSiteNames();
  await testWithoutSite();
}

runDebug();