# ThreadsJS Rollup integration
[![npm](https://img.shields.io/npm/v/rollup-plugin-threads)](https://npmjs.com/package/rollup-plugin-threads)
[![tests](https://img.shields.io/github/workflow/status/Cloud-CNC/rollup-plugin-threads/CID?label=ci/cd)](https://github.com/Cloud-CNC/rollup-plugin-threads/actions)
[![last commit](https://img.shields.io/github/last-commit/Cloud-CNC/rollup-plugin-threads)](https://github.com/Cloud-CNC/rollup-plugin-threads/commits/master)

[ThreadsJS](https://threads.js.org) integration for [Rollup](https://rollupjs.org). If you're using Webpack, you may want to check out [threads-webpack-plugin](https://github.com/cloud-cnc/threads-webpack-plugin) (Basically does the same thing as this plugin but for Webpack).

# Features
* Written in modern TypeScript
* Uses Rollup for TS compilation
* Thoroughly commented

# Usage
## Entry
```Javascript
//Imports
import {BlobWorker, spawn, Thread} from 'threads';
import WorkerText from './worker'; //May have to @ts-ignore if using TypeScript

//Create a **BLOB WORKER**
const worker = await spawn(BlobWorker.from(WorkerText));

console.log(worker.echo('Hello World!')); //Worker received: Hello World!

//Destroy the worker
Thread.terminate(worker);
```

## Worker
```Javascript
//Imports
import {expose} from 'threads';

//Worker functions
const worker = {
  echo(input)
  {
    return `Worker received: ${input}`;
  }
};

//Expose worker
expose(worker);
```

## Rollup Config
```Javascript
//Imports
import resolve from '@rollup/plugin-node-resolve';
import threads from 'rollup-plugin-threads';

//Export
export default {
  //Point at your normal file (The plugin will take care of loading the worker)
  input: 'src/index.js',
  plugins: [
    resolve(),
    threads({
      //Exclude files
      exclude: ['**/exclude-me/worker.js'],

      //Include files
      include: ['**/worker.js'],

      //Rollup external configuration (Marks as external, helpful for Node runtimes)
      external: ['events'],

      //Child bundler plugins (Not reused; must be redefined if you want the same plugins)
      plugins: [
        resolve()
      ]
    })
  ]
};
```