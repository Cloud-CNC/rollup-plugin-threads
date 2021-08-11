/**
 * @fileoverview ThreadsJS Rollup integration
 */

//Imports
import {resolve} from 'path';
import chalk from 'chalk';
import {Plugin, OutputChunk, rollup} from 'rollup';
import {createFilter} from '@rollup/pluginutils';
import {Options} from './types';

//Export
export default function (options: Options)
{
  //Default options
  options = {
    exclude: [],
    include: ['**/worker.js', '**/worker.ts'],
    verbose: false,
    ...options
  };

  //Create the asset filter
  const filter = createFilter(options.include, options.exclude);

  //Rollup plugin
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
    async load(id): Promise<any>
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

        //Remove non-Rollup options
        delete options.exclude;
        delete options.include;
        delete options.verbose;

        //Bundle the worker
        const build = await rollup({
          ...options,
          input: file
        });

        //Get bundled worker code
        const bundle = await build.generate({
          format: 'iife',
          name: 'WorkerThread'
        });

        //Get output chunks
        const chunks = <OutputChunk[]>bundle.output.filter(chunk => chunk.type == 'chunk');

        //Too few chunks
        if (chunks == null || chunks.length == 0)
        {
          this.error('Did not receive worker chunks from child rollup bundler!');
        }
        //Too many chunks
        else if (chunks.length > 1)
        {
          this.error('Received too many worker chunks from child rollup bundler!');
        }
        //Format and return
        else
        {
          return `export default ${JSON.stringify(chunks[0]!.code)};`;
        }
      }
    }
  };

  return plugin;
}