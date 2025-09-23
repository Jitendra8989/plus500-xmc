/**
 * Component Test Helpers for Sitecore Components
 *
 * This module provides specific helper functions for testing common Sitecore component patterns
 * and validation scenarios.
 */

import {
  ComponentData,
  ComponentTestConfig,
  testComponentLayout,
} from './layout-service-test-utils';

/**
 * Standard Sitecore component test configurations
 */
export const STANDARD_COMPONENT_CONFIGS = {
  richText: (placeholderKey: string): ComponentTestConfig => ({
    componentName: 'RichText',
    placeholderKey,
    expectedFields: ['Text'],
    expectedParams: ['FieldNames'],
    dataSourcePattern: /\/sitecore\/content\/.+\/Data\/.+/,
  }),

  image: (placeholderKey: string): ComponentTestConfig => ({
    componentName: 'Image',
    placeholderKey,
    expectedFields: ['Image'],
    expectedParams: ['FieldNames'],
    dataSourcePattern: /\/sitecore\/content\/.+\/Data\/.+/,
  }),

  promo: (placeholderKey: string): ComponentTestConfig => ({
    componentName: 'Promo',
    placeholderKey,
    expectedFields: ['PromoText', 'PromoIcon'],
    expectedParams: ['FieldNames', 'GridParameters'],
    dataSourcePattern: /\/sitecore\/content\/.+\/Data\/.+/,
  }),

  container: (placeholderKey: string): ComponentTestConfig => ({
    componentName: 'Container',
    placeholderKey,
    expectedParams: ['GridParameters'],
  }),

  navigation: (placeholderKey: string): ComponentTestConfig => ({
    componentName: 'Navigation',
    placeholderKey,
    expectedParams: ['LevelFrom', 'LevelTo', 'NavigationRoot'],
    expectedFields: [],
  }),
};

/**
 * Creates a test configuration for a custom component
 */
export function createCustomComponentConfig(
  componentName: string,
  placeholderKey: string,
  options: {
    expectedFields?: string[];
    expectedParams?: string[];
    dataSourceRequired?: boolean;
    dataSourcePattern?: RegExp;
  } = {}
): ComponentTestConfig {
  const {
    expectedFields = [],
    expectedParams = [],
    dataSourceRequired = true,
    dataSourcePattern,
  } = options;

  return {
    componentName,
    placeholderKey,
    expectedFields,
    expectedParams,
    dataSourcePattern:
      dataSourcePattern || (dataSourceRequired ? /\/sitecore\/content\/.+/ : undefined),
  };
}

/**
 * Validates that a component has the expected field structure
 */
export function validateComponentFields(
  component: ComponentData,
  expectedFieldStructure: Record<string, 'string' | 'object' | 'array' | 'boolean' | 'number'>
): void {
  if (!component.fields) {
    throw new Error(`Component '${component.componentName}' has no fields`);
  }

  Object.entries(expectedFieldStructure).forEach(([fieldName, expectedType]) => {
    const field = component.fields![fieldName] as { value?: unknown };

    if (field === undefined || field === null) {
      throw new Error(
        `Field '${fieldName}' is missing from component '${component.componentName}'`
      );
    }

    // Validate field structure based on type
    switch (expectedType) {
      case 'string':
        if (!field.value || typeof field.value !== 'string') {
          throw new Error(`Field '${fieldName}' should have a string value`);
        }
        break;

      case 'object':
        if (!field.value || typeof field.value !== 'object') {
          throw new Error(`Field '${fieldName}' should have an object value`);
        }
        break;

      case 'array':
        if (!Array.isArray(field)) {
          throw new Error(`Field '${fieldName}' should be an array`);
        }
        break;

      case 'boolean':
        if (typeof field.value !== 'boolean') {
          throw new Error(`Field '${fieldName}' should have a boolean value`);
        }
        break;

      case 'number':
        if (typeof field.value !== 'number') {
          throw new Error(`Field '${fieldName}' should have a number value`);
        }
        break;
    }
  });
}

/**
 * Validates that an image field has the expected structure
 */
export function validateImageField(component: ComponentData, fieldName: string = 'Image'): void {
  if (!component.fields || !component.fields[fieldName]) {
    throw new Error(
      `Image field '${fieldName}' is missing from component '${component.componentName}'`
    );
  }

  const imageField = component.fields[fieldName] as { value?: Record<string, unknown> };

  if (!imageField.value || typeof imageField.value !== 'object') {
    throw new Error(`Image field '${fieldName}' should have an object value`);
  }

  const requiredImageProps = ['src', 'alt', 'width', 'height'];
  requiredImageProps.forEach((prop) => {
    if (!imageField.value?.[prop] && prop !== 'alt') {
      // alt can be empty
      throw new Error(`Image field '${fieldName}' is missing required property '${prop}'`);
    }
  });

  // Validate src is a valid URL
  const srcValue = imageField.value.src as string;
  if (!srcValue?.startsWith('http')) {
    throw new Error(`Image field '${fieldName}' src should be a valid URL`);
  }
}

/**
 * Validates that a link field has the expected structure
 */
export function validateLinkField(component: ComponentData, fieldName: string): void {
  if (!component.fields || !component.fields[fieldName]) {
    throw new Error(
      `Link field '${fieldName}' is missing from component '${component.componentName}'`
    );
  }

  const linkField = component.fields[fieldName] as { value?: Record<string, unknown> };

  if (!linkField.value || typeof linkField.value !== 'object') {
    throw new Error(`Link field '${fieldName}' should have an object value`);
  }

  if (!linkField.value.href) {
    throw new Error(`Link field '${fieldName}' is missing href property`);
  }
}

/**
 * Validates that a rich text field has content
 */
export function validateRichTextField(component: ComponentData, fieldName: string = 'Text'): void {
  if (!component.fields || !component.fields[fieldName]) {
    throw new Error(
      `Rich text field '${fieldName}' is missing from component '${component.componentName}'`
    );
  }

  const textField = component.fields[fieldName] as { value?: string };

  if (!textField.value || typeof textField.value !== 'string') {
    throw new Error(`Rich text field '${fieldName}' should have a string value`);
  }

  if (textField.value.trim().length === 0) {
    throw new Error(`Rich text field '${fieldName}' should not be empty`);
  }
}

/**
 * Test helper specifically for Card components
 */
export async function testCardComponent(
  endpoint: string,
  placeholderKey: string,
  options: {
    language?: string;
    routePath?: string;
    siteName?: string;
    expectedFields?: string[];
  } = {}
): Promise<ComponentData> {
  const { expectedFields = ['Title', 'Description', 'Image'] } = options;

  const config = createCustomComponentConfig('Card', placeholderKey, {
    expectedFields,
    expectedParams: ['GridParameters'],
    dataSourceRequired: true,
  });

  const component = await testComponentLayout(endpoint, config, options);

  // Additional Card-specific validations
  if (component.fields?.Image) {
    validateImageField(component, 'Image');
  }

  if (component.fields?.Title) {
    validateRichTextField(component, 'Title');
  }

  if (component.fields?.Description) {
    validateRichTextField(component, 'Description');
  }

  return component;
}

/**
 * Test helper for validating container components with nested components
 */
export async function testContainerWithComponents(
  endpoint: string,
  placeholderKey: string,
  expectedNestedComponents: string[],
  options: {
    language?: string;
    routePath?: string;
    siteName?: string;
  } = {}
): Promise<ComponentData> {
  const config = STANDARD_COMPONENT_CONFIGS.container(placeholderKey);
  const container = await testComponentLayout(endpoint, config, options);

  if (!container.placeholders) {
    throw new Error(`Container component should have nested placeholders`);
  }

  // Validate that expected nested components exist
  const nestedComponents: string[] = [];
  Object.values(container.placeholders).forEach((componentArray) => {
    componentArray.forEach((component) => {
      nestedComponents.push(component.componentName);
    });
  });

  expectedNestedComponents.forEach((expectedComponent) => {
    if (!nestedComponents.includes(expectedComponent)) {
      throw new Error(
        `Expected nested component '${expectedComponent}' not found in container. ` +
          `Found components: ${nestedComponents.join(', ')}`
      );
    }
  });

  return container;
}

/**
 * Utility to create test suites for page layouts
 */
export function createPageLayoutTestSuite(
  endpoint: string,
  pageTestConfigs: {
    routePath: string;
    expectedComponents: Array<{
      componentName: string;
      placeholderKey: string;
      customValidation?: (component: ComponentData) => void;
    }>;
  }[]
) {
  return {
    async runAllTests(options: { language?: string; siteName?: string } = {}) {
      const results: Array<{
        routePath: string;
        components: ComponentData[];
        success: boolean;
        errors: string[];
      }> = [];

      for (const pageConfig of pageTestConfigs) {
        const pageResult = {
          routePath: pageConfig.routePath,
          components: [] as ComponentData[],
          success: true,
          errors: [] as string[],
        };

        for (const componentConfig of pageConfig.expectedComponents) {
          try {
            const config = createCustomComponentConfig(
              componentConfig.componentName,
              componentConfig.placeholderKey
            );

            const component = await testComponentLayout(endpoint, config, {
              ...options,
              routePath: pageConfig.routePath,
            });

            // Run custom validation if provided
            if (componentConfig.customValidation) {
              componentConfig.customValidation(component);
            }

            pageResult.components.push(component);
          } catch (error) {
            pageResult.success = false;
            pageResult.errors.push(
              `${componentConfig.componentName} in ${componentConfig.placeholderKey}: ${
                error instanceof Error ? error.message : String(error)
              }`
            );
          }
        }

        results.push(pageResult);
      }

      return results;
    },
  };
}
