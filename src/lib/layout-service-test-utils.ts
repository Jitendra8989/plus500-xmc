/**
 * Layout Service Test Utilities for Sitecore Components
 *
 * This utility provides generic testing functions for validating Sitecore Layout Service responses
 * and ensuring components are properly rendered in their expected placeholders.
 */

export interface LayoutServiceResponse {
  data: {
    layout: {
      item: {
        rendered: {
          sitecore: {
            context: {
              pageEditing: boolean;
              site: {
                name: string;
              };
              pageState: string;
              editMode: string;
              language: string;
              itemPath: string;
            };
            route: {
              name: string;
              displayName: string;
              fields: Record<string, unknown>;
              databaseName: string;
              deviceId: string;
              itemId: string;
              itemLanguage: string;
              itemVersion: number;
              layoutId: string;
              templateId: string;
              templateName: string;
              placeholders: Record<string, ComponentData[]>;
            };
          };
        };
      };
    };
  };
}

export interface ComponentData {
  uid: string;
  componentName: string;
  dataSource: string;
  params: Record<string, unknown>;
  fields?: Record<string, unknown>;
  placeholders?: Record<string, ComponentData[]>;
}

export interface ComponentTestConfig {
  componentName: string;
  placeholderKey: string;
  expectedFields?: string[];
  expectedParams?: string[];
  dataSourcePattern?: RegExp;
}

/**
 * Fetches Layout Service data from Sitecore
 */
export async function fetchLayoutService(
  endpoint: string,
  language: string = 'en',
  routePath: string = '/',
  siteName: string = 'contentsdksite'
): Promise<LayoutServiceResponse> {
  const query = `
    query LayoutService($language: String!) {
      layout(language: $language, routePath: "${routePath}", site: "${siteName}") {
        item {
          rendered
        }
      }
    }
  `;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { language },
    }),
  });

  if (!response.ok) {
    throw new Error(`Layout Service request failed: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Validates the basic structure of a Layout Service response
 */
export function validateLayoutServiceResponse(response: LayoutServiceResponse): void {
  if (!response.data?.layout?.item?.rendered?.sitecore) {
    throw new Error('Invalid Layout Service response structure');
  }

  const { context, route } = response.data.layout.item.rendered.sitecore;

  if (!context || !route) {
    throw new Error('Missing context or route in Layout Service response');
  }

  if (!route.placeholders) {
    throw new Error('No placeholders found in Layout Service response');
  }
}

/**
 * Finds all components of a specific type in the Layout Service response
 */
export function findComponentsByName(
  response: LayoutServiceResponse,
  componentName: string
): ComponentData[] {
  const components: ComponentData[] = [];
  const placeholders = response.data.layout.item.rendered.sitecore.route.placeholders;

  function searchPlaceholders(placeholderData: Record<string, ComponentData[]>) {
    Object.values(placeholderData).forEach((componentArray) => {
      componentArray.forEach((component) => {
        if (component.componentName === componentName) {
          components.push(component);
        }

        // Recursively search nested placeholders
        if (component.placeholders) {
          searchPlaceholders(component.placeholders);
        }
      });
    });
  }

  searchPlaceholders(placeholders);
  return components;
}

/**
 * Finds components in a specific placeholder
 */
export function findComponentsInPlaceholder(
  response: LayoutServiceResponse,
  placeholderKey: string
): ComponentData[] {
  const placeholders = response.data.layout.item.rendered.sitecore.route.placeholders;
  return placeholders[placeholderKey] || [];
}

/**
 * Validates that a component exists in the expected placeholder with required fields
 */
export function validateComponentInPlaceholder(
  response: LayoutServiceResponse,
  config: ComponentTestConfig
): ComponentData {
  const componentsInPlaceholder = findComponentsInPlaceholder(response, config.placeholderKey);

  const component = componentsInPlaceholder.find((c) => c.componentName === config.componentName);

  if (!component) {
    throw new Error(
      `Component '${config.componentName}' not found in placeholder '${config.placeholderKey}'. ` +
        `Available components: ${componentsInPlaceholder.map((c) => c.componentName).join(', ')}`
    );
  }

  // Validate expected fields
  if (config.expectedFields) {
    config.expectedFields.forEach((fieldName) => {
      if (!component.fields || !component.fields[fieldName]) {
        throw new Error(
          `Required field '${fieldName}' missing from component '${config.componentName}'`
        );
      }
    });
  }

  // Validate expected params
  if (config.expectedParams) {
    config.expectedParams.forEach((paramName) => {
      if (!component.params || component.params[paramName] === undefined) {
        throw new Error(
          `Required param '${paramName}' missing from component '${config.componentName}'`
        );
      }
    });
  }

  // Validate data source pattern
  if (config.dataSourcePattern && !config.dataSourcePattern.test(component.dataSource)) {
    throw new Error(
      `Data source '${component.dataSource}' does not match expected pattern ${config.dataSourcePattern}`
    );
  }

  return component;
}

/**
 * Generic test function for validating component placement and structure
 */
export async function testComponentLayout(
  endpoint: string,
  testConfig: ComponentTestConfig,
  options: {
    language?: string;
    routePath?: string;
    siteName?: string;
  } = {}
): Promise<ComponentData> {
  const { language = 'en', routePath = '/', siteName = 'contentsdksite' } = options;

  // Fetch Layout Service data
  const response = await fetchLayoutService(endpoint, language, routePath, siteName);

  // Validate response structure
  validateLayoutServiceResponse(response);

  // Validate component placement and structure
  return validateComponentInPlaceholder(response, testConfig);
}

/**
 * Test helper for validating multiple components at once
 */
export async function testMultipleComponents(
  endpoint: string,
  testConfigs: ComponentTestConfig[],
  options: {
    language?: string;
    routePath?: string;
    siteName?: string;
  } = {}
): Promise<ComponentData[]> {
  const results: ComponentData[] = [];

  for (const config of testConfigs) {
    const component = await testComponentLayout(endpoint, config, options);
    results.push(component);
  }

  return results;
}

/**
 * Utility to pretty print Layout Service response for debugging
 */
export function debugLayoutService(response: LayoutServiceResponse): void {
  const placeholders = response.data.layout.item.rendered.sitecore.route.placeholders;

  console.log('Layout Service Debug:');
  console.log('===================');

  Object.entries(placeholders).forEach(([placeholderKey, components]) => {
    console.log(`\nPlaceholder: ${placeholderKey}`);
    console.log('Components:');

    components.forEach((component, index) => {
      console.log(`  ${index + 1}. ${component.componentName} (uid: ${component.uid})`);
      if (component.dataSource) {
        console.log(`     Data Source: ${component.dataSource}`);
      }
      if (component.fields) {
        console.log(`     Fields: ${Object.keys(component.fields).join(', ')}`);
      }
      if (component.placeholders) {
        console.log(`     Nested Placeholders: ${Object.keys(component.placeholders).join(', ')}`);
      }
    });
  });
}
