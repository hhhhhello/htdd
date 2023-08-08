import { defineConfig } from 'dumi'
import path from 'path'

export default defineConfig({
  themeConfig: {
    name: 'htdd',
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'packages/components' },
      { type: 'utils', dir: 'packages/utils' },
      { type: 'views', dir: 'packages/views' },
    ],
  },
  alias: {
    date: path.join(__dirname, 'packages/utils/date'),
  },
})
