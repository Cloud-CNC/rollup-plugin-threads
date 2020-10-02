/**
 * @fileoverview Rollup-Plugin-Threads: ThreadsJS Rollup integration
 */

//Imports
import {Plugin, OutputChunk, OutputOptions, rollup} from 'rollup';
import type {Options} from './types';

const outputOptions: OutputOptions = {
  format: 'iife'
};

//Export
export default function (options: Options)
{
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
      if (id == 'virtual-module')
      {
        //Bundle worker
        const build = await rollup({
          input: options.file,
          plugins: options.plugins,
          output: outputOptions
        });

        //Get bundled worker code
        const bundle = await build.generate(outputOptions);
        const chunks = <OutputChunk[]>bundle.output.filter(chunk => chunk.type == 'chunk');
        const chunk = chunks.find(chunk => chunk.facadeModuleId == 'threads');

        if (chunk == null)
        {
          this.error('Did not receive worker chunks from child rollup bundle!');
        }
        else
        {
          //Format
          return `export default ${JSON.stringify(chunk.code)}`;
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