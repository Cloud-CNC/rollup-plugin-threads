/**
 * @fileoverview Rollup-Plugin-Threads: ThreadsJS Rollup integration
 */

//Imports
import {createFilter} from '@rollup/pluginutils';
import {Plugin, OutputChunk, rollup} from 'rollup';
import {resolve} from 'path';
import chalk from 'chalk';
import type {Options} from './types';

//Export
export default function (options: Partial<Options>)
{
  //Default options
  options = {
    exclude: [],
    include: ['**/worker.js', '**/worker.ts'],
    verbose: false,
    plugins: [],
    ...options
  };

  const filter = createFilter(options.include, options.exclude);

  const plugin: Plugin = {
    name: 'threads',
    resolveId(source)
    {
      if (source == 'virtual-module')
      {
        return 'virtual-module';
      }
      else
      {
        return null;
      }
    },
    async load(id)
    {
      if (filter(id))
      {
        //Get file name
        const file = resolve(id);

        //Verbose logging
        if (options.verbose)
        {
          console.log(`[${chalk.bold('Threads Plugin 📦')}] Bundling worker at ${chalk.bold.green(file)}`);
        }

        //Bundle worker
        const build = await rollup({
          input: file,
          external: options.external,
          plugins: options.plugins
        });

        //Get bundled worker code
        const bundle = await build.generate({format: 'iife'});

        const chunks = <OutputChunk[]>bundle.output.filter(chunk => chunk.type == 'chunk');

        if (chunks == null)
        {
          this.error('Did not receive worker chunks from child rollup bundler!');
        }
        else if (chunks.length > 1)
        {
          this.error('Received too many worker chunks from child rollup bundler!');
        }
        else
        {
          //Format
          return `export default ${JSON.stringify(chunks[0].code)}`;
        }
      }
      else
      {
        return null;
      }
    }
  };

  return plugin;
}