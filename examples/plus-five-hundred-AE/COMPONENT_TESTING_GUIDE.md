# Sitecore Component Testing Guide

This guide provides comprehensive documentation for testing Sitecore components using the Layout Service test utilities. These utilities help validate that components are properly rendered in their expected placeholders with correct field values and structure.

## Overview

The testing framework consists of three main files:

1. **`layout-service-test-utils.ts`** - Core utilities for fetching and validating Layout Service responses
2. **`component-test-helpers.ts`** - Specialized helpers for common component testing patterns
3. **`card-component.test.ts`** - Example test implementation

## Quick Start

### Basic Component Test

```typescript
import { testComponentLayout, createCustomComponentConfig } from '../lib/component-test-helpers';

const ENDPOINT = 'https://edge-platform.sitecorecloud.io/v1/content/api/graphql/v1?sitecoreContextId=YOUR_CONTEXT_ID';

// Test a Card component in the headless-main placeholder
const config = createCustomComponentConfig('Card', 'headless-main', {
  expectedFields: ['Title', 'Description', 'Image'],
  expectedParams: ['GridParameters']
});

const component = await testComponentLayout(ENDPOINT, config);
```

### Using Pre-built Helpers

```typescript
import { testCardComponent } from '../lib/component-test-helpers';

// Simplified Card component test
const cardComponent = await testCardComponent(
  ENDPOINT,
  'headless-main',
  {
    language: 'en',
    routePath: '/',
    siteName: 'contentsdksite'
  }
);
```

## API Reference

### Core Functions

#### `fetchLayoutService(endpoint, language?, routePath?, siteName?)`

Fetches Layout Service data from Sitecore.

**Parameters:**
- `endpoint` (string): GraphQL endpoint URL
- `language` (string, optional): Content language (default: 'en')
- `routePath` (string, optional): Page route path (default: '/')
- `siteName` (string, optional): Sitecore site name (default: 'contentsdksite')

**Returns:** `Promise<LayoutServiceResponse>`

#### `testComponentLayout(endpoint, testConfig, options?)`

Generic test function for validating component placement and structure.

**Parameters:**
- `endpoint` (string): GraphQL endpoint URL
- `testConfig` (ComponentTestConfig): Component test configuration
- `options` (object, optional): Additional options (language, routePath, siteName)

**Returns:** `Promise<ComponentData>`

#### `validateLayoutServiceResponse(response)`

Validates the basic structure of a Layout Service response.

**Throws:** Error if response structure is invalid

### Component Test Configuration

```typescript
interface ComponentTestConfig {
  componentName: string;        // Name of the component to test
  placeholderKey: string;       // Placeholder where component should exist
  expectedFields?: string[];    // Required field names
  expectedParams?: string[];    // Required parameter names
  dataSourcePattern?: RegExp;   // Pattern for data source validation
}
```

### Helper Functions

#### `createCustomComponentConfig(componentName, placeholderKey, options?)`

Creates a test configuration for custom components.

#### `validateImageField(component, fieldName?)`

Validates that an image field has proper structure (src, alt, width, height).

#### `validateRichTextField(component, fieldName?)`

Validates that a rich text field has content.

#### `validateLinkField(component, fieldName)`

Validates that a link field has proper href structure.

### Standard Component Configs

Pre-built configurations for common Sitecore components:

```typescript
import { STANDARD_COMPONENT_CONFIGS } from '../lib/component-test-helpers';

// Use standard configs
const richTextConfig = STANDARD_COMPONENT_CONFIGS.richText('headless-main');
const imageConfig = STANDARD_COMPONENT_CONFIGS.image('headless-main');
const promoConfig = STANDARD_COMPONENT_CONFIGS.promo('headless-main');
const containerConfig = STANDARD_COMPONENT_CONFIGS.container('headless-main');
const navigationConfig = STANDARD_COMPONENT_CONFIGS.navigation('headless-header');
```

## Common Testing Patterns

### 1. Basic Component Existence Test

```typescript
describe('Component Existence', () => {
  it('should find Card component in main placeholder', async () => {
    const config = createCustomComponentConfig('Card', 'headless-main');
    const component = await testComponentLayout(ENDPOINT, config);

    expect(component.componentName).toBe('Card');
    expect(component.uid).toBeDefined();
  });
});
```

### 2. Field Validation Test

```typescript
describe('Field Validation', () => {
  it('should validate Card component fields', async () => {
    const component = await testCardComponent(ENDPOINT, 'headless-main');

    // Validate specific fields
    expect(component.fields.Title.value).toBeTruthy();
    expect(component.fields.Image.value.src).toMatch(/^https?:\/\/.+/);

    // Use helper functions
    validateRichTextField(component, 'Title');
    validateImageField(component, 'Image');
  });
});
```

### 3. Data Source Validation Test

```typescript
describe('Data Source Validation', () => {
  it('should validate proper data source pattern', async () => {
    const config = createCustomComponentConfig('Card', 'headless-main', {
      dataSourcePattern: /\/sitecore\/content\/test\/contentsdksite\/Home\/Data\/.+/
    });

    const component = await testComponentLayout(ENDPOINT, config);
    expect(component.dataSource).toMatch(config.dataSourcePattern);
  });
});
```

### 4. Multiple Components Test

```typescript
describe('Multiple Components', () => {
  it('should validate multiple components on page', async () => {
    const configs = [
      createCustomComponentConfig('RichText', 'headless-main'),
      createCustomComponentConfig('Image', 'headless-main'),
      createCustomComponentConfig('Card', 'headless-main')
    ];

    const results = await testMultipleComponents(ENDPOINT, configs);
    expect(results).toHaveLength(3);
  });
});
```

### 5. Container with Nested Components Test

```typescript
describe('Container Components', () => {
  it('should validate container with nested components', async () => {
    const container = await testContainerWithComponents(
      ENDPOINT,
      'headless-main',
      ['RichText', 'Promo'] // Expected nested components
    );

    expect(container.placeholders).toBeDefined();
  });
});
```

## Advanced Usage

### Page Layout Test Suite

Create comprehensive tests for entire page layouts:

```typescript
import { createPageLayoutTestSuite } from '../lib/component-test-helpers';

const testSuite = createPageLayoutTestSuite(ENDPOINT, [
  {
    routePath: '/',
    expectedComponents: [
      { componentName: 'RichText', placeholderKey: 'headless-main' },
      { componentName: 'Image', placeholderKey: 'headless-main' },
      { componentName: 'Card', placeholderKey: 'headless-main' },
      { componentName: 'Navigation', placeholderKey: 'headless-header' }
    ]
  },
  {
    routePath: '/about',
    expectedComponents: [
      { componentName: 'RichText', placeholderKey: 'headless-main' },
      { componentName: 'Promo', placeholderKey: 'headless-main' }
    ]
  }
]);

describe('Full Site Tests', () => {
  it('should validate all pages', async () => {
    const results = await testSuite.runAllTests();

    results.forEach(pageResult => {
      expect(pageResult.success).toBe(true);
      expect(pageResult.errors).toHaveLength(0);
    });
  });
});
```

### Custom Field Validation

```typescript
describe('Custom Validation', () => {
  it('should validate custom field structure', async () => {
    const component = await testComponentLayout(ENDPOINT, config);

    // Custom validation logic
    validateComponentFields(component, {
      'Title': 'string',
      'Image': 'object',
      'IsActive': 'boolean',
      'SortOrder': 'number'
    });
  });
});
```

### Debugging Layout Service

```typescript
import { debugLayoutService } from '../lib/layout-service-test-utils';

describe('Debug Tests', () => {
  it('should debug layout service response', async () => {
    const response = await fetchLayoutService(ENDPOINT);

    // Print detailed component information
    debugLayoutService(response);
  });
});
```

## Error Handling

The testing utilities provide clear error messages for common scenarios:

- **Component not found**: "Component 'Card' not found in placeholder 'headless-main'"
- **Missing fields**: "Required field 'Title' missing from component 'Card'"
- **Invalid data source**: "Data source '/invalid/path' does not match expected pattern"
- **Invalid response**: "Invalid Layout Service response structure"

## Best Practices

### 1. Use Descriptive Test Names

```typescript
// Good
it('should validate Card component has required fields and proper data source', async () => {

// Avoid
it('should test card', async () => {
```

### 2. Group Related Tests

```typescript
describe('Card Component', () => {
  describe('Field Validation', () => {
    // Field-related tests
  });

  describe('Placement Validation', () => {
    // Placeholder-related tests
  });
});
```

### 3. Use Constants for Configuration

```typescript
const TEST_CONFIG = {
  ENDPOINT: 'https://edge-platform.sitecorecloud.io/v1/content/api/graphql/v1?sitecoreContextId=YOUR_ID',
  LANGUAGE: 'en',
  SITE_NAME: 'contentsdksite'
};
```

### 4. Handle Optional Components

```typescript
describe('Optional Components', () => {
  it('should handle missing Card component gracefully', async () => {
    const response = await fetchLayoutService(ENDPOINT);
    const cardComponents = findComponentsByName(response, 'Card');

    if (cardComponents.length > 0) {
      // Test the component if it exists
      validateRichTextField(cardComponents[0], 'Title');
    } else {
      // Log that component is not present (this is okay)
      console.log('Card component not found on this page');
    }
  });
});
```

### 5. Test Different Languages

```typescript
describe('Multilingual Support', () => {
  ['en', 'es', 'fr'].forEach(language => {
    it(`should validate Card component in ${language}`, async () => {
      const component = await testCardComponent(ENDPOINT, 'headless-main', {
        language
      });

      expect(component.fields.Title.value).toBeTruthy();
    });
  });
});
```

## Integration with Code Assistants

When using code assistants to generate components, follow this testing pattern:

1. **Generate the component** using your code assistant
2. **Add the component** to your Sitecore page
3. **Run the test** to validate placement and structure:

```typescript
// After adding Card component to home page
const cardTest = await testCardComponent(
  'https://edge-platform.sitecorecloud.io/v1/content/api/graphql/v1?sitecoreContextId=7KMLyD39rv5jUREDjj2Fwr',
  'headless-main'
);

console.log('Card component test passed:', cardTest.componentName);
```

This ensures that your generated components are properly integrated into the Sitecore layout and render correctly with all required fields and parameters.