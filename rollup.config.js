import pkg from './package.json' assert { type: "json" }

import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import jsx from 'acorn-jsx'

export default {
  input:'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' }
  ],
  acornInjectPlugins: [
    jsx()
  ],
  plugins: [
    typescript({
      compilerOptions: {
        jsx: 'preserve'
      }
    }),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ]
    })
  ],
  external: []
}
