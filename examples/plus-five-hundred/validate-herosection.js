/**
 * HeroSection Component Layout Service Validation
 */

const fs = require('fs');

// Load environment variables
function loadEnvFile() {
  const envPath = '.env';
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      envVars[key] = value;
    }
  });
  return envVars;
}

const env = loadEnvFile();
const LAYOUT_SERVICE_ENDPOINT = `https://edge-platform.sitecorecloud.io/v1/content/api/graphql/v1?sitecoreContextId=${env.SITECORE_EDGE_CONTEXT_ID}`;
const SITE_NAME = env.SITECORE_SITE_NAME;

async function fetchLayoutService() {
  const query = `
    query LayoutService($language: String!) {
      layout(language: $language, routePath: "/", site: "${SITE_NAME}") {
        item {
          rendered
        }
      }
    }
  `;

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

  return await response.json();
}

function analyzeHeroSection(response) {
  console.log('=== HeroSection Component Analysis ===\n');

  const placeholders = response.data.layout.item.rendered.sitecore.route.placeholders;

  // Find HeroSection component
  let heroSection = null;
  let foundIn = '';

  Object.entries(placeholders).forEach(([placeholderKey, components]) => {
    components.forEach(component => {
      if (component.componentName === 'HeroSection') {
        heroSection = component;
        foundIn = placeholderKey;
      }
    });
  });

  if (!heroSection) {
    console.log('❌ HeroSection component not found in Layout Service response');
    return;
  }

  console.log('✅ HeroSection Component Found!');
  console.log(`📍 Placeholder: ${foundIn}`);
  console.log(`🆔 UID: ${heroSection.uid}`);
  console.log(`📁 Data Source: ${heroSection.dataSource || 'No data source'}`);

  // Analyze parameters
  if (heroSection.params && Object.keys(heroSection.params).length > 0) {
    console.log('\n⚙️ Parameters:');
    Object.entries(heroSection.params).forEach(([key, value]) => {
      console.log(`   ${key}: ${value}`);
    });
  } else {
    console.log('\n⚙️ Parameters: None');
  }

  // Analyze fields
  if (heroSection.fields && Object.keys(heroSection.fields).length > 0) {
    console.log('\n🏷️ Fields:');
    Object.entries(heroSection.fields).forEach(([fieldName, fieldData]) => {
      console.log(`   ${fieldName}:`);
      if (fieldData && fieldData.value) {
        const value = typeof fieldData.value === 'string'
          ? fieldData.value.substring(0, 200) + (fieldData.value.length > 200 ? '...' : '')
          : JSON.stringify(fieldData.value, null, 2);
        console.log(`     Value: ${value}`);
      } else {
        console.log(`     Value: No value found`);
      }
    });
  } else {
    console.log('\n🏷️ Fields: None');
  }

  // Check for nested placeholders
  if (heroSection.placeholders && Object.keys(heroSection.placeholders).length > 0) {
    console.log('\n🎯 Nested Placeholders:');
    Object.entries(heroSection.placeholders).forEach(([placeholderKey, nestedComponents]) => {
      console.log(`   ${placeholderKey}: ${nestedComponents.length} component(s)`);
      nestedComponents.forEach((comp, index) => {
        console.log(`     ${index + 1}. ${comp.componentName} (${comp.uid})`);
      });
    });
  } else {
    console.log('\n🎯 Nested Placeholders: None');
  }

  return heroSection;
}

async function validateHeroSection() {
  try {
    console.log('🔍 Fetching Layout Service data...');
    console.log(`Site: ${SITE_NAME}`);
    console.log(`Endpoint: ${LAYOUT_SERVICE_ENDPOINT}`);

    const response = await fetchLayoutService();

    if (response.errors) {
      console.log('❌ GraphQL errors:', response.errors);
      return;
    }

    if (!response.data?.layout) {
      console.log('❌ No layout data in response');
      return;
    }

    console.log('✅ Layout Service response received successfully\n');

    // Analyze HeroSection specifically
    const heroSection = analyzeHeroSection(response);

    // Show full component structure for debugging
    if (heroSection) {
      console.log('\n=== Full HeroSection Component Structure ===');
      console.log(JSON.stringify(heroSection, null, 2));
    }

    // Compare with other components for context
    console.log('\n=== All Components Summary ===');
    const allComponents = [];
    const placeholders = response.data.layout.item.rendered.sitecore.route.placeholders;

    Object.entries(placeholders).forEach(([placeholderKey, components]) => {
      components.forEach(component => {
        allComponents.push({
          name: component.componentName,
          placeholder: placeholderKey,
          hasDataSource: !!component.dataSource,
          hasFields: !!(component.fields && Object.keys(component.fields).length > 0),
          hasParams: !!(component.params && Object.keys(component.params).length > 0)
        });
      });
    });

    allComponents.forEach((comp, index) => {
      const highlight = comp.name === 'HeroSection' ? '👈 THIS IS OUR COMPONENT' : '';
      console.log(`${index + 1}. ${comp.name} ${highlight}`);
      console.log(`   Placeholder: ${comp.placeholder}`);
      console.log(`   Has Data Source: ${comp.hasDataSource ? '✅' : '❌'}`);
      console.log(`   Has Fields: ${comp.hasFields ? '✅' : '❌'}`);
      console.log(`   Has Params: ${comp.hasParams ? '✅' : '❌'}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the validation
validateHeroSection();