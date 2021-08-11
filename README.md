# ThreadsJS Rollup integration
[![npm](https://img.shields.io/npm/v/rollup-plugin-threads)](https://npmjs.com/package/rollup-plugin-threads)
[![CI/CD](https://img.shields.io/github/workflow/status/Cloud-CNC/rollup-plugin-threads/CID?label=ci/cd)](https://github.com/Cloud-CNC/rollup-plugin-threads/actions)

[ThreadsJS](https://threads.js.org) integration for [Rollup](https://rollupjs.org).
If you're using Webpack, you may want to check out [threads-webpack-plugin](https://github.com/cloud-cnc/threads-webpack-plugin)
(Basically does the same thing as this plugin but for Webpack).

# Features
* Fully tested
* Very flexible
* Written in modern TypeScript
* Thoroughly commented

# FAQ
## How does it work?
This plugin simply takes any ThreadJS workers and executes a second Rollup
bundler upon them (Without you having to manually invoke Rollup again or have
multiple config files). This also allows embedding 3rd party dependencies inside
workers with ease (Since dependencies are not natively shared between the host
program and its workers).

## Isn't this plugin inefficient?
Yes - running an entirely separate bundler on some of your source code is
unavoidably a bit inefficient. If you're using named imports and have tree-
shaking enabled, the duplicated code is minimal.

# Usage

## Host
```javascript
//Imports
import {BlobWorker, spawn, Thread} from 'threads';
import WorkerText from './worker';

//Create a blob worker
const worker = await spawn(BlobWorker.fromText(WorkerText));

//Echo some text
console.log(await worker('Hello World!')); //Worker received: Hello World!

//Destroy the worker
await Thread.terminate(worker);
```

## Worker
```javascript
//Imports
import {expose} from 'threads';

//Expose the worker
expose((input: string) =>
{
  return `Worker received: ${input}`;
});

//Export (TypeScript only; replaced by bundled worker code)
export default '';
```

## Rollup Config
```javascript
//Imports
import threads from 'rollup-plugin-threads';

//Export
export default {
  //Point at the host program entry
  input: 'src/index.js',
  plugins: [
    //Other host Rollup plugins here
    threads({
      //Exclude worker files
      exclude: ['**/exclude-me/worker.js'],

      //Include worker files
      include: ['**/worker.js'],

      //Enable verbose logging (Simply prints what the child-bundler is bundling)
      verbose: true,

      //Other thread Rollup options here (eg: plugins)
    })
  ]
};
```
