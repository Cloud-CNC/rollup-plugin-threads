/**
 * @fileoverview Rollup Build Config
 */

//Imports
import typescript from 'rollup-plugin-typescript2';

//Export
export default {
  external: [
    '@rollup/pluginutils',
    'path',
    'rollup'
  ],
  input: 'src/index.ts',
  plugins: [
    typescript()
  ],
  output: [
    {
      dir: 'dist/cjs',
      exports: 'default',
      format: 'cjs'
    },
    {
      dir: 'dist/es',
      format: 'es'
    }
  ]
};