/**
 * Template and Data Source Comparison Tool
 * Compare Card template structure with working components
 */

const fs = require('fs');
const path = require('path');

function readYamlFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

function extractIdFromYaml(yamlContent, fieldName = 'ID') {
  const match = yamlContent.match(new RegExp(`${fieldName}: "([^"]+)"`));
  return match ? match[1] : null;
}

function extractTemplateInfo(yamlContent) {
  const id = extractIdFromYaml(yamlContent, 'ID');
  const parent = extractIdFromYaml(yamlContent, 'Parent');
  const template = extractIdFromYaml(yamlContent, 'Template');
  const pathMatch = yamlContent.match(/Path: "?([^"\n]+)"?/);
  const path = pathMatch ? pathMatch[1] : null;

  return { id, parent, template, path };
}

function analyzeTemplate(basePath, templateName) {
  console.log(`\n=== ${templateName} Template Analysis ===`);

  const templatePath = `${basePath}/templates/plus-five-hundred/${templateName}.yml`;
  const templateContent = readYamlFile(templatePath);

  if (!templateContent) {
    console.log(`❌ Template file not found: ${templatePath}`);
    return null;
  }

  const templateInfo = extractTemplateInfo(templateContent);
  console.log(`Template ID: ${templateInfo.id}`);
  console.log(`Template Path: ${templateInfo.path}`);
  console.log(`Parent Template: ${templateInfo.parent}`);

  // Look for template sections
  const sectionsPath = `${basePath}/templates/plus-five-hundred/${templateName}`;

  if (fs.existsSync(sectionsPath)) {
    const sections = fs.readdirSync(sectionsPath).filter(file => file.endsWith('.yml'));
    console.log(`Template Sections: ${sections.join(', ')}`);

    // Analyze each section
    sections.forEach(section => {
      const sectionName = section.replace('.yml', '');
      console.log(`\n  Section: ${sectionName}`);

      const sectionPath = `${sectionsPath}/${section}`;
      const sectionContent = readYamlFile(sectionPath);

      if (sectionContent) {
        const sectionInfo = extractTemplateInfo(sectionContent);
        console.log(`    ID: ${sectionInfo.id}`);
        console.log(`    Parent: ${sectionInfo.parent}`);

        // Look for fields in this section
        const fieldsPath = `${sectionsPath}/${sectionName}`;
        if (fs.existsSync(fieldsPath)) {
          const fields = fs.readdirSync(fieldsPath).filter(file => file.endsWith('.yml'));
          console.log(`    Fields: ${fields.map(f => f.replace('.yml', '')).join(', ')}`);

          // Analyze each field
          fields.forEach(field => {
            const fieldName = field.replace('.yml', '');
            const fieldPath = `${fieldsPath}/${field}`;
            const fieldContent = readYamlFile(fieldPath);

            if (fieldContent) {
              const fieldInfo = extractTemplateInfo(fieldContent);
              const typeMatch = fieldContent.match(/Type\s+Value: "([^"]+)"/);
              const sortOrderMatch = fieldContent.match(/__Sortorder\s+Value: (\d+)/);

              console.log(`      ${fieldName}:`);
              console.log(`        ID: ${fieldInfo.id}`);
              console.log(`        Type: ${typeMatch ? typeMatch[1] : 'Unknown'}`);
              console.log(`        Sort Order: ${sortOrderMatch ? sortOrderMatch[1] : 'Unknown'}`);
            }
          });
        }
      }
    });
  } else {
    console.log('No template sections found');
  }

  return templateInfo;
}

function analyzeDataSource(basePath, dataPath, templateId) {
  console.log(`\n=== Data Source Analysis ===`);
  console.log(`Data Path: ${dataPath}`);

  const dataContent = readYamlFile(dataPath);

  if (!dataContent) {
    console.log(`❌ Data source file not found: ${dataPath}`);
    return null;
  }

  const dataInfo = extractTemplateInfo(dataContent);
  console.log(`Data ID: ${dataInfo.id}`);
  console.log(`Data Template: ${dataInfo.template}`);
  console.log(`Data Path: ${dataInfo.path}`);

  // Check template consistency
  if (templateId && dataInfo.template) {
    const normalizedTemplate = templateId.toLowerCase().replace(/[{}]/g, '');
    const normalizedData = dataInfo.template.toLowerCase().replace(/[{}]/g, '');

    if (normalizedTemplate === normalizedData) {
      console.log('✅ Template IDs match');
    } else {
      console.log('❌ Template ID mismatch:');
      console.log(`   Expected: ${templateId}`);
      console.log(`   Actual: ${dataInfo.template}`);
    }
  }

  // Analyze fields in data source
  const languageMatch = dataContent.match(/Languages:([\s\S]*?)(?=\n[A-Z]|\n$)/);
  if (languageMatch) {
    const languageSection = languageMatch[1];
    const fieldMatches = languageSection.match(/- ID: "([^"]+)"\s+Hint: ([^\n]+)\s+Value: ([^]+?)(?=\s+- ID:|$)/g);

    if (fieldMatches) {
      console.log('\nData Source Fields:');
      fieldMatches.forEach(fieldMatch => {
        const fieldIdMatch = fieldMatch.match(/- ID: "([^"]+)"/);
        const hintMatch = fieldMatch.match(/Hint: ([^\n]+)/);
        const valueMatch = fieldMatch.match(/Value: ([^]+?)$/);

        if (fieldIdMatch && hintMatch) {
          const value = valueMatch ? valueMatch[1].trim() : '';
          console.log(`  ${hintMatch[1]}: ${fieldIdMatch[1]}`);
          if (value && value.length < 100) {
            console.log(`    Value: ${value.substring(0, 100)}${value.length > 100 ? '...' : ''}`);
          }
        }
      });
    }
  }

  return dataInfo;
}

function compareWithWorkingComponent() {
  console.log('=== COMPONENT COMPARISON ===');

  const basePath = 'serialization/serialization';

  // Analyze RichText (known working component)
  console.log('\n🟢 WORKING COMPONENT: RichText');
  console.log('Looking for RichText template structure...');

  // RichText doesn't have a custom template, it uses built-in Sitecore templates
  // Let's look at RichText data source instead
  const richTextDataPath = `${basePath}/content/plus-five-hundred/plus-five-hundred/Home/Data/Text 1.yml`;
  const richTextData = readYamlFile(richTextDataPath);

  if (richTextData) {
    console.log('RichText Data Source:');
    const dataInfo = extractTemplateInfo(richTextData);
    console.log(`  Template: ${dataInfo.template}`);
    console.log(`  Path: ${dataInfo.path}`);

    // Show RichText fields
    analyzeDataSource(basePath, richTextDataPath, null);
  }

  // Analyze Promo (another working component)
  console.log('\n🟢 WORKING COMPONENT: Promo Data');
  const promoLeftDataPath = `${basePath}/content/plus-five-hundred/plus-five-hundred/Home/Data/PromoLeft.yml`;
  const promoLeftData = readYamlFile(promoLeftDataPath);

  if (promoLeftData) {
    console.log('Promo Data Source:');
    const dataInfo = extractTemplateInfo(promoLeftData);
    console.log(`  Template: ${dataInfo.template}`);
    console.log(`  Path: ${dataInfo.path}`);

    analyzeDataSource(basePath, promoLeftDataPath, null);
  }

  // Analyze Card (problematic component)
  console.log('\n🔴 PROBLEMATIC COMPONENT: Card');
  const cardTemplate = analyzeTemplate(basePath, 'Card');

  if (cardTemplate) {
    const cardDataPath = `${basePath}/content/plus-five-hundred/plus-five-hundred/Home/Data/Sample Card.yml`;
    analyzeDataSource(basePath, cardDataPath, cardTemplate.id);
  }

  // Look for pattern differences
  console.log('\n=== PATTERN ANALYSIS ===');

  // Check parent template patterns
  if (richTextData && promoLeftData) {
    const richTextTemplate = extractTemplateInfo(richTextData).template;
    const promoTemplate = extractTemplateInfo(promoLeftData).template;

    console.log('Working component template patterns:');
    console.log(`  RichText uses template: ${richTextTemplate}`);
    console.log(`  Promo uses template: ${promoTemplate}`);

    if (cardTemplate) {
      console.log(`  Card uses template: ${cardTemplate.id}`);

      // Check if Card template follows the same pattern
      const richTextParent = richTextTemplate ? richTextTemplate.substring(0, 8) : '';
      const promoParent = promoTemplate ? promoTemplate.substring(0, 8) : '';
      const cardParent = cardTemplate.id ? cardTemplate.id.substring(0, 8) : '';

      console.log('\nTemplate ID patterns:');
      console.log(`  RichText starts with: ${richTextParent}`);
      console.log(`  Promo starts with: ${promoParent}`);
      console.log(`  Card starts with: ${cardParent}`);
    }
  }
}

// Run the comparison
compareWithWorkingComponent();