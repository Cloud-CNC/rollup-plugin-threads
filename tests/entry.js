//Imports
import {BlobWorker, spawn, Thread} from 'threads';
import WorkerText from './worker';

const main = async () =>
{
  //Create a **BLOB WORKER**
  const worker = await spawn(BlobWorker.fromText(WorkerText));

  const res = await worker.echo('Hello World!');

  if (res == 'Worker received: Hello World!')
  {
    console.clear();
    console.log('Passing!');
  }
  else
  {
    console.clear();
    console.error(`Failing; received: ${res}`);
    process.exit(1);
  }

  //Destroy the worker
  await Thread.terminate(worker);
};
main();