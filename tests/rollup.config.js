//Imports
import {resolve as resolvePath} from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import threads from '..';

/**
 * Warning handler
 * @param {import('rollup').RollupWarning} warning 
 * @param {import('rollup').WarningHandler} warn 
 */
const onwarn = (warning, warn) =>
{
  //Hide ThreadsJS warnings
  if (warning.code != 'EVAL' && warning.code != 'THIS_IS_UNDEFINED')
  {
    warn(warning);
  }
};

/**
 * Test config
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: resolvePath(__dirname, 'index.js'),
  plugins: [
    resolve(),
    commonjs(),
    threads({
      plugins: [
        resolve(),
        commonjs()
      ],
      external: [
        'events',
        'os',
        'path',
        'tty',
        'util'
      ],
      onwarn
    })
  ],
  output: [
    {
      dir: resolvePath(__dirname, 'dist'),
      format: 'cjs'
    }
  ],
  external: [
    'child_process',
    'events',
    'os',
    'path',
    'tty',
    'util'
  ],
  onwarn
};