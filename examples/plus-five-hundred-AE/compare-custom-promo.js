/**
 * Comprehensive comparison between CustomPromo (working) and Card (problematic) components
 */

const fs = require('fs');
const path = require('path');

function readYamlFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    return null;
  }
}

function analyzeComponent(componentName, basePath, isReference = false) {
  console.log(`\n=== ${componentName} Component Analysis ${isReference ? '(Reference Project)' : '(Our Project)'} ===`);

  const pathPrefix = isReference ? 'ReferenceProject-Serializations/TODO/serialization' : 'serialization/serialization';

  // 1. Rendering Configuration
  const renderingPath = isReference
    ? `${pathPrefix}/renderings/test/${componentName}.yml`
    : `${pathPrefix}/renderings/plus-five-hundred/${componentName}.yml`;

  console.log(`\n1. RENDERING CONFIGURATION:`);
  console.log(`   Path: ${renderingPath}`);

  const renderingContent = readYamlFile(renderingPath);
  if (renderingContent) {
    console.log('   ✅ Rendering file found');

    // Extract key information
    const renderingId = renderingContent.match(/ID: "([^"]+)"/)?.[1];
    const componentNameValue = renderingContent.match(/ComponentName\s+Value: "([^"]+)"/)?.[1] ||
                              renderingContent.match(/componentName\s+Value: ([^\n]+)/)?.[1];
    const datasourceTemplate = renderingContent.match(/Datasource Template\s+Value: "?([^"\n]+)"?/)?.[1];
    const datasourceLocation = renderingContent.match(/Datasource Location\s+Value: "?([^"\n]+)"?/)?.[1];

    console.log(`   Rendering ID: ${renderingId}`);
    console.log(`   Component Name: ${componentNameValue}`);
    console.log(`   Datasource Template: ${datasourceTemplate}`);
    console.log(`   Datasource Location: ${datasourceLocation}`);
  } else {
    console.log('   ❌ Rendering file not found');
  }

  // 2. Template Configuration
  console.log(`\n2. TEMPLATE CONFIGURATION:`);
  const templatePath = isReference
    ? `${pathPrefix}/templates/test/${componentName}.yml`
    : `${pathPrefix}/templates/plus-five-hundred/${componentName}.yml`;

  console.log(`   Path: ${templatePath}`);

  const templateContent = readYamlFile(templatePath);
  if (templateContent) {
    console.log('   ✅ Template file found');

    const templateId = templateContent.match(/ID: "([^"]+)"/)?.[1];
    const parentTemplate = templateContent.match(/Parent: "([^"]+)"/)?.[1];
    const templateType = templateContent.match(/Template: "([^"]+)"/)?.[1];

    console.log(`   Template ID: ${templateId}`);
    console.log(`   Parent Template: ${parentTemplate}`);
    console.log(`   Template Type: ${templateType}`);

    // Check for template sections
    const sectionPath = isReference
      ? `${pathPrefix}/templates/test/${componentName}`
      : `${pathPrefix}/templates/plus-five-hundred/${componentName}`;

    if (fs.existsSync(sectionPath)) {
      const sections = fs.readdirSync(sectionPath).filter(f => f.endsWith('.yml'));
      console.log(`   Template Sections: ${sections.join(', ')}`);

      // Analyze fields in sections
      sections.forEach(section => {
        const sectionName = section.replace('.yml', '');
        const fieldPath = `${sectionPath}/${sectionName}`;

        if (fs.existsSync(fieldPath)) {
          const fields = fs.readdirSync(fieldPath).filter(f => f.endsWith('.yml'));
          console.log(`     ${sectionName} Fields: ${fields.map(f => f.replace('.yml', '')).join(', ')}`);
        }
      });
    }
  } else {
    console.log('   ❌ Template file not found');
  }

  // 3. Data Source Analysis
  console.log(`\n3. DATA SOURCE ANALYSIS:`);

  const dataSourcePatterns = isReference ? [
    `${pathPrefix}/content/contentsdksite/Home/Data/${componentName} Hero.yml`,
    `${pathPrefix}/content/test/contentsdksite/Home/Data/${componentName} Hero.yml`,
    `${pathPrefix}/content/contentsdksite/Home/Data/Custom Promo Hero.yml`
  ] : [
    `${pathPrefix}/content/plus-five-hundred/plus-five-hundred/Home/Data/Sample ${componentName}.yml`
  ];

  let dataSourceContent = null;
  let dataSourcePath = '';

  for (const pattern of dataSourcePatterns) {
    if (fs.existsSync(pattern)) {
      dataSourceContent = readYamlFile(pattern);
      dataSourcePath = pattern;
      break;
    }
  }

  if (dataSourceContent) {
    console.log(`   ✅ Data source found: ${dataSourcePath}`);

    const dataId = dataSourceContent.match(/ID: "([^"]+)"/)?.[1];
    const dataTemplate = dataSourceContent.match(/Template: "([^"]+)"/)?.[1];
    const dataPath = dataSourceContent.match(/Path: "([^"]+)"/)?.[1];
    const hasBranchId = dataSourceContent.includes('BranchID:');
    const hasSharedFields = dataSourceContent.includes('SharedFields:');

    console.log(`   Data ID: ${dataId}`);
    console.log(`   Data Template: ${dataTemplate}`);
    console.log(`   Data Path: ${dataPath}`);
    console.log(`   Has BranchID: ${hasBranchId ? '✅' : '❌'}`);
    console.log(`   Has SharedFields: ${hasSharedFields ? '✅' : '❌'}`);

    // Analyze fields
    console.log(`\n   DATA FIELDS:`);
    const languageMatch = dataSourceContent.match(/Languages:([\s\S]*?)(?=\n[A-Z]|\n$|$)/);
    if (languageMatch) {
      const languageSection = languageMatch[1];
      const fieldMatches = languageSection.match(/- ID: "([^"]+)"\s+Hint: ([^\n]+)/g);

      if (fieldMatches) {
        fieldMatches.forEach(fieldMatch => {
          const fieldId = fieldMatch.match(/ID: "([^"]+)"/)?.[1];
          const hint = fieldMatch.match(/Hint: ([^\n]+)/)?.[1];
          console.log(`     ${hint}: ${fieldId}`);
        });
      }
    }
  } else {
    console.log('   ❌ Data source not found');
    console.log(`   Searched paths: ${dataSourcePatterns.join(', ')}`);
  }

  return {
    renderingContent,
    templateContent,
    dataSourceContent,
    paths: {
      rendering: renderingPath,
      template: templatePath,
      dataSource: dataSourcePath
    }
  };
}

function compareComponents() {
  console.log('=== COMPREHENSIVE COMPONENT COMPARISON ===');

  // Analyze CustomPromo from reference project
  const customPromo = analyzeComponent('Custom Promo', '', true);

  // Analyze Card from our project
  const card = analyzeComponent('Card', '', false);

  console.log(`\n=== KEY DIFFERENCES ANALYSIS ===`);

  // Compare template structures
  console.log(`\n1. TEMPLATE STRUCTURE:`);
  if (customPromo.templateContent && card.templateContent) {
    const customPromoParent = customPromo.templateContent.match(/Parent: "([^"]+)"/)?.[1];
    const cardParent = card.templateContent.match(/Parent: "([^"]+)"/)?.[1];

    console.log(`   CustomPromo Parent: ${customPromoParent}`);
    console.log(`   Card Parent: ${cardParent}`);
    console.log(`   Parents Match: ${customPromoParent === cardParent ? '✅' : '❌'}`);
  }

  // Compare data source structures
  console.log(`\n2. DATA SOURCE STRUCTURE:`);
  if (customPromo.dataSourceContent && card.dataSourceContent) {
    const customPromoBranch = customPromo.dataSourceContent.includes('BranchID:');
    const cardBranch = card.dataSourceContent.includes('BranchID:');

    const customPromoShared = customPromo.dataSourceContent.includes('SharedFields:');
    const cardShared = card.dataSourceContent.includes('SharedFields:');

    console.log(`   CustomPromo has BranchID: ${customPromoBranch ? '✅' : '❌'}`);
    console.log(`   Card has BranchID: ${cardBranch ? '✅' : '❌'}`);
    console.log(`   CustomPromo has SharedFields: ${customPromoShared ? '✅' : '❌'}`);
    console.log(`   Card has SharedFields: ${cardShared ? '✅' : '❌'}`);
  }

  // Compare rendering configurations
  console.log(`\n3. RENDERING CONFIGURATION:`);
  if (customPromo.renderingContent && card.renderingContent) {
    const customPromoDS = customPromo.renderingContent.match(/Datasource Template\s+Value: "?([^"\n]+)"?/)?.[1];
    const cardDS = card.renderingContent.match(/Datasource Template\s+Value: "?([^"\n]+)"?/)?.[1];

    console.log(`   CustomPromo Datasource Template: ${customPromoDS}`);
    console.log(`   Card Datasource Template: ${cardDS}`);

    const customPromoLoc = customPromo.renderingContent.match(/Datasource Location\s+Value: "?([^"\n]+)"?/)?.[1];
    const cardLoc = card.renderingContent.match(/Datasource Location\s+Value: "?([^"\n]+)"?/)?.[1];

    console.log(`   CustomPromo Datasource Location: ${customPromoLoc}`);
    console.log(`   Card Datasource Location: ${cardLoc}`);
  }

  console.log(`\n4. RECOMMENDATIONS:`);
  console.log(`   Based on this comparison, consider:`);

  if (customPromo.templateContent && card.templateContent) {
    const customPromoParent = customPromo.templateContent.match(/Parent: "([^"]+)"/)?.[1];
    const cardParent = card.templateContent.match(/Parent: "([^"]+)"/)?.[1];

    if (customPromoParent !== cardParent) {
      console.log(`   1. Change Card template parent to match CustomPromo: ${customPromoParent}`);
    }
  }

  if (customPromo.dataSourceContent && card.dataSourceContent) {
    const customPromoBranch = customPromo.dataSourceContent.includes('BranchID:');
    const cardBranch = card.dataSourceContent.includes('BranchID:');

    if (customPromoBranch && !cardBranch) {
      console.log(`   2. Add BranchID to Card data source`);
    }

    const customPromoShared = customPromo.dataSourceContent.includes('SharedFields:');
    const cardShared = card.dataSourceContent.includes('SharedFields:');

    if (customPromoShared && !cardShared) {
      console.log(`   3. Add SharedFields section to Card data source`);
    }
  }

  console.log(`\n=== COMPARISON COMPLETE ===`);
}

// Run the comparison
compareComponents();