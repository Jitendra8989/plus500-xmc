import config from './sitecore.config';
import { defineCliConfig } from '@sitecore-content-sdk/nextjs/config-cli';
import { generateSites, generateMetadata, extractFiles } from '@sitecore-content-sdk/nextjs/tools';

export default defineCliConfig({
  build: {
    commands: [
      generateMetadata(),
      generateSites({
        scConfig: config,
      }),
      extractFiles({
        scConfig: config,
      }),
    ],
  },
  componentMap: {
    paths: ['src/components'],
    // Exclude content-sdk auxillary components and problematic files
    exclude: [
      'src/components/content-sdk/*',
      '**/index.ts',
      '**/index.tsx',
      '**/*.module.css.d.ts',
      '**/*.module.scss.d.ts',
      '**/header copy/**'
    ],
  },
});
