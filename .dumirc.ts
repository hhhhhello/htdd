import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'htdd',
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'packages/components' },
      { type: 'utils', dir: 'packages/utils' },
      { type: 'views', dir: 'packages/views' }
    ],
  },
});
