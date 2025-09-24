import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Eye, Code, Package, FileCode, Layers } from "lucide-react";
import { componentCatalog, getAllCategories, getAllDependencies, type ComponentMetadata } from "@/components/catalog";

export default function ComponentExporter() {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [exportedCode, setExportedCode] = useState<string>("");

  const components = componentCatalog;

  const toggleComponentSelection = (componentName: string) => {
    setSelectedComponents(prev => 
      prev.includes(componentName)
        ? prev.filter(name => name !== componentName)
        : [...prev, componentName]
    );
  };

  const selectAllComponents = () => {
    setSelectedComponents(components.map(c => c.name));
  };

  const clearSelection = () => {
    setSelectedComponents([]);
  };

  const generateSitecoreComponentCode = (component: ComponentMetadata): string => {
    const fieldTypes = component.props.map(prop => {
      const fieldType = prop.sitecoreType === 'SingleLineText' || prop.sitecoreType === 'MultiLineText' ? 'Field<string>' :
                      prop.sitecoreType === 'RichText' ? 'RichTextField' :
                      prop.sitecoreType === 'Image' ? 'ImageField' :
                      prop.sitecoreType === 'GeneralLink' ? 'LinkField' :
                      prop.sitecoreType === 'Number' ? 'Field<number>' :
                      prop.sitecoreType === 'Checkbox' ? 'Field<boolean>' :
                      prop.sitecoreType === 'DateTime' ? 'Field<string>' :
                      'Field<string>';
      
      return `  ${prop.name}: ${fieldType};`;
    }).join('\n');

    const fieldRendering = component.props.map(prop => {
      const fieldName = `props.fields?.${prop.name}`;
      const className = `styles.${component.name.toLowerCase()}${prop.name}`;
      
      if (prop.sitecoreType === 'RichText') {
        return `              {${fieldName}?.value && (
                <ContentSdkRichText
                  field={${fieldName}}
                  className={${className}}
                />
              )}`;
      } else if (prop.sitecoreType === 'Image') {
        return `              {${fieldName}?.value && (
                <ContentSdkImage
                  field={${fieldName}}
                  className={${className}}
                  width={600}
                  height={400}
                />
              )}`;
      } else if (prop.sitecoreType === 'GeneralLink') {
        return `              {(${fieldName}?.value?.href || ${fieldName}?.value?.text) && (
                <ContentSdkLink
                  field={${fieldName}}
                  className={${className}}
                />
              )}`;
      } else {
        const tag = prop.name.toLowerCase().includes('title') || prop.name.toLowerCase().includes('heading') ? 'h1' : 
                   prop.name.toLowerCase().includes('subtitle') ? 'h2' : 'p';
        return `              {${fieldName}?.value && (
                <ContentSdkText
                  field={${fieldName}}
                  className={${className}}
                  tag="${tag}"
                />
              )}`;
      }
    }).join('\n\n');

    const fallbackContent = component.props.map(prop => {
      const className = `styles.${component.name.toLowerCase()}${prop.name}`;
      
      if (prop.sitecoreType === 'RichText') {
        return `              <div className={${className}}>Sample rich text content for ${prop.name}</div>`;
      } else if (prop.sitecoreType === 'Image') {
        return `              <div className={${className}}>Image placeholder for ${prop.name}</div>`;
      } else if (prop.sitecoreType === 'GeneralLink') {
        return `              <a href="#" className={${className}}>Sample ${prop.name}</a>`;
      } else {
        const tag = prop.name.toLowerCase().includes('title') || prop.name.toLowerCase().includes('heading') ? 'h1' : 
                   prop.name.toLowerCase().includes('subtitle') ? 'h2' : 'p';
        return `              <${tag} className={${className}}>Sample ${prop.name}</${tag}>`;
      }
    }).join('\n');

    return `import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from './${component.name}.module.css';

interface Fields {
${fieldTypes}
}

type ${component.name}Props = ComponentProps & {
  fields: Fields;
};

/**
 * ${component.description}
 * 
 * Sitecore Content SDK Component
 * Category: ${component.category}
 * 
 * Usage: ${component.usage}
 * 
 * Dependencies: ${component.dependencies.join(', ')}
 */
export const Default = (props: ${component.name}Props): JSX.Element => {
  if (props.fields || props.params) {
    return (
      <section
        className={\`component \${styles.${component.name.toLowerCase()}} \${styles['${component.name.toLowerCase()}--default']} \${props.params?.styles || ''}\`}
        id={props.params?.RenderingIdentifier}
        role="region"
      >
        <div className="component-content">
          <div className={styles.${component.name.toLowerCase()}Container}>
${fieldRendering}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={\`component \${styles.${component.name.toLowerCase()}} \${styles['${component.name.toLowerCase()}--default']} \${props.params?.styles || ''}\`}
      id={props.params?.RenderingIdentifier}
      role="region"
    >
      <div className="component-content">
        <div className={styles.${component.name.toLowerCase()}Container}>
${fallbackContent}
        </div>
      </div>
    </section>
  );
};

export const Dark = (props: ${component.name}Props): JSX.Element => {
  if (props.fields || props.params) {
    return (
      <section
        className={\`component \${styles.${component.name.toLowerCase()}} \${styles['${component.name.toLowerCase()}--dark']} \${props.params?.styles || ''}\`}
        id={props.params?.RenderingIdentifier}
        role="region"
      >
        <div className="component-content">
          <div className={styles.${component.name.toLowerCase()}Container}>
${fieldRendering}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={\`component \${styles.${component.name.toLowerCase()}}\`}>
      <div className="component-content">
        <span className="is-empty-hint">${component.name} - Dark</span>
      </div>
    </section>
  );
};

export const Light = (props: ${component.name}Props): JSX.Element => {
  if (props.fields || props.params) {
    return (
      <section
        className={\`component \${styles.${component.name.toLowerCase()}} \${styles['${component.name.toLowerCase()}--light']} \${props.params?.styles || ''}\`}
        id={props.params?.RenderingIdentifier}
        role="region"
      >
        <div className="component-content">
          <div className={styles.${component.name.toLowerCase()}Container}>
${fieldRendering}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={\`component \${styles.${component.name.toLowerCase()}}\`}>
      <div className="component-content">
        <span className="is-empty-hint">${component.name} - Light</span>
      </div>
    </section>
  );
};
`;
  };

  const generateSitecoreExport = () => {
    const selectedComponentsData = components.filter(c => selectedComponents.includes(c.name));
    
    // Generate Sitecore-compatible TSX files
    const sitecoreFiles = selectedComponentsData.map(component => ({
      name: component.name,
      fileName: `${component.name}.tsx`,
      sourceCode: generateSitecoreComponentCode(component)
    }));

    const componentRegistrationCode = `// Component registration for Sitecore Content SDK
// Add this to your .sitecore/component-map.ts file

import { ComponentMap, NextjsJssComponent } from '@sitecore-content-sdk/nextjs';
${selectedComponentsData.map(c => `import * as ${c.name} from '../src/components/${c.name}';`).join('\n')}

export const componentMap = new Map<string, NextjsJssComponent>([
${selectedComponentsData.map(c => `  ['${c.name}', ${c.name}]`).join(',\n')}
]);
`;

    const exportData = {
      sitecoreComponents: sitecoreFiles,
      componentRegistration: componentRegistrationCode,
      installationInstructions: {
        steps: [
          "1. Download and extract all TSX files to your Sitecore Content SDK src/components/ folder",
          "2. Install Sitecore Content SDK: npm install @sitecore-content-sdk/nextjs",
          "3. Add the component registration code to your .sitecore/component-map.ts file",
          "4. Create Sitecore template fields that match the field names in each component",
          "5. Configure rendering items in XM Cloud that match your component names",
          "6. Use XM Cloud Pages to add components to your layout and test visual editing"
        ]
      },
      metadata: {
        exportedAt: new Date().toISOString(),
        totalComponents: selectedComponents.length,
        framework: "Sitecore Content SDK for XM Cloud",
        packageVersion: "@sitecore-content-sdk/nextjs",
        registrationFile: ".sitecore/component-map.ts"
      }
    };

    setExportedCode(JSON.stringify(exportData, null, 2));
  };

  const downloadTSXFiles = () => {
    if (!exportedCode) return;
    
    try {
      const exportData = JSON.parse(exportedCode);
      const sitecoreFiles = exportData.sitecoreComponents || [];
      
      // Create and download each TSX file individually
      sitecoreFiles.forEach((file: any) => {
        const blob = new Blob([file.sourceCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.fileName;
        a.click();
        URL.revokeObjectURL(url);
      });
      
      // Also download the component registration file
      if (exportData.componentRegistration) {
        const regBlob = new Blob([exportData.componentRegistration], { type: 'text/plain' });
        const regUrl = URL.createObjectURL(regBlob);
        const regA = document.createElement('a');
        regA.href = regUrl;
        regA.download = 'component-map.ts';
        regA.click();
        URL.revokeObjectURL(regUrl);
      }
    } catch (error) {
      console.error('Error downloading TSX files:', error);
    }
  };

  const downloadExport = () => {
    const blob = new Blob([exportedCode], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sitecore-components-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportedCode);
  };

  const categoryColors = {
    Business: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    UI: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Layout: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    Form: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    Navigation: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
  };

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Component Exporter
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Export your React components to Sitecore Content SDK format. Select components, configure export settings, and generate Sitecore-compatible component definitions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Component List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Available Components</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={selectAllComponents}
                    data-testid="button-select-all"
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearSelection}
                    data-testid="button-clear-selection"
                  >
                    Clear
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {components.map((component, index) => (
                  <motion.div
                    key={component.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className={`hover-elevate cursor-pointer transition-all ${
                        selectedComponents.includes(component.name) 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : ''
                      }`}
                      onClick={() => toggleComponentSelection(component.name)}
                      data-testid={`component-card-${component.name}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-lg">{component.name}</CardTitle>
                              <Badge className={categoryColors[component.category]}>
                                {component.category}
                              </Badge>
                            </div>
                            <CardDescription className="text-sm">
                              {component.description}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => e.stopPropagation()}
                                  data-testid={`button-view-${component.name}`}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{component.name} Details</DialogTitle>
                                  <DialogDescription>
                                    Component specifications and properties
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="font-semibold mb-2">Description</h4>
                                    <p className="text-sm text-muted-foreground">{component.description}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold mb-2">Properties</h4>
                                    <div className="space-y-2">
                                      {component.props.map(prop => (
                                        <div key={prop.name} className="border rounded p-3">
                                          <div className="flex items-center gap-2 mb-1">
                                            <code className="text-sm font-mono bg-muted px-1 rounded">
                                              {prop.name}
                                            </code>
                                            <Badge variant={prop.required ? "destructive" : "secondary"} className="text-xs">
                                              {prop.required ? "Required" : "Optional"}
                                            </Badge>
                                            <code className="text-xs text-muted-foreground">{prop.type}</code>
                                          </div>
                                          <p className="text-sm text-muted-foreground">{prop.description}</p>
                                          {prop.defaultValue && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                              Default: <code>{prop.defaultValue}</code>
                                            </p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">Usage Examples</h4>
                                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                      {component.examples.map((example, idx) => (
                                        <li key={idx}>{example}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">Dependencies</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {component.dependencies.map(dep => (
                                        <Badge key={dep} variant="outline" className="text-xs">
                                          {dep}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{component.props.length} properties</span>
                          <span>{component.filePath.split('/').pop()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Export Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 z-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Export Settings
                  </CardTitle>
                  <CardDescription>
                    Generate Sitecore Content SDK compatible components
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Selected Components</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {selectedComponents.length} component{selectedComponents.length !== 1 ? 's' : ''} selected
                    </p>
                    {selectedComponents.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {selectedComponents.map(name => (
                          <Badge key={name} variant="secondary" className="text-xs">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button 
                      onClick={generateSitecoreExport} 
                      disabled={selectedComponents.length === 0}
                      className="w-full"
                      data-testid="button-generate-export"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Generate Export
                    </Button>
                    
                    {exportedCode && (
                      <>
                        <Button 
                          onClick={downloadTSXFiles}
                          className="w-full"
                          data-testid="button-download-tsx"
                        >
                          <FileCode className="h-4 w-4 mr-2" />
                          Download TSX Files
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          onClick={downloadExport}
                          className="w-full"
                          data-testid="button-download-export"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download JSON
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          onClick={copyToClipboard}
                          className="w-full"
                          data-testid="button-copy-export"
                        >
                          <FileCode className="h-4 w-4 mr-2" />
                          Copy to Clipboard
                        </Button>
                      </>
                    )}
                  </div>

                  {exportedCode && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Export Preview</h4>
                        <Textarea 
                          value={exportedCode} 
                          readOnly 
                          className="h-32 text-xs font-mono"
                          data-testid="textarea-export-preview"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}