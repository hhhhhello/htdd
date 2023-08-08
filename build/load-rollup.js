import * as rollup from 'rollup'

import getOptions from './rollup.config.js'

async function build() {
  const basePath = process.cwd()
  const options = getOptions(basePath)
  const bundle = await rollup.rollup(options)
  await Promise.all(options.output.map(bundle.write))
}

build()
