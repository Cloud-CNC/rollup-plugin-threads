//Imports
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import threads from '..';

//Export
export default {
  input: 'entry.js',
  plugins: [
    resolve({
      browser: false,
      preferBuiltins: true,
      mainFields: [
        'main'
      ]
    }),
    commonjs(),
    threads({
      external: [
        'child_process',
        'crypto',
        'events',
        'os',
        'path',
        'tty',
        'util'
      ],
      include: ['**/worker.js'],
      plugins: [
        resolve(),
        commonjs()
      ]
    })
  ],
  output: [
    {
      dir: 'dist',
      format: 'cjs'
    }
  ]
};