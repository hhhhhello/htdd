import path from 'node:path'

import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
import terser from '@rollup/plugin-terser'
import { readFileSync } from 'fs'
import copy from 'rollup-plugin-copy'
import deletePlugin from 'rollup-plugin-delete'
import externals from 'rollup-plugin-node-externals'
import postcss from 'rollup-plugin-postcss'
import ts from 'rollup-plugin-typescript2'

const defaultExtensions = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.css',
  '.less',
]

const getOptions = (basePath) => {
  const package_ = JSON.parse(readFileSync(`${basePath}/package.json`))

  return {
    input: `${basePath}/src/index.ts`,
    output: [
      {
        dir: path.dirname(package_.main),
        format: 'cjs',
        name: package_.name,
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        dir: path.dirname(package_.module),
        format: 'esm',
        name: package_.name,
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      nodeResolve({ extensions: defaultExtensions }),
      alias({
        entries: [{ find: '@', replacement: `${basePath}/src` }],
        customResolver: nodeResolve({
          extensions: defaultExtensions,
        }),
      }),
      commonjs(),
      ts({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: [`${basePath}/src/*.ts`],
          exclude: ['.dumi/**/*', '.dumirc.ts'],
        },
      }),
      image(),
      postcss({
        modules: {
          generateScopedName: 'cm-[path][local]',
        },
        autoModules: false,
      }),
      babel({
        exclude: `${basePath}/node_modules/**`,
        babelHelpers: 'runtime',
        extensions: defaultExtensions,
      }),
      copy({
        targets: [
          {
            src: `${basePath}/src/styles`,
            dest: `${basePath}/lib`,
          },
          {
            src: `${basePath}/src/styles`,
            dest: `${basePath}/es`,
          },
        ],
      }),
      externals(),
      strip(),
      terser(),
      deletePlugin({
        targets: [`${basePath}/lib/*`, `${basePath}/es/*`],
        verbose: true,
      }),
    ],
  }
}

export default getOptions
