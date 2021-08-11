//Imports
import chalk from 'chalk';
import {BlobWorker, spawn, Thread} from 'threads';
import WorkerText from './worker';

const main = async () =>
{
  //Create a blob worker
  const worker = await spawn(BlobWorker.fromText(WorkerText));

  //Echo some text
  const res = await worker('Hello World!');

  //Verify the text
  if (res == 'Worker received: Hello World!')
  {
    console.log(chalk.green('Passing!'));
  }
  else
  {
    console.error(chalk.red(`Failing; received: ${res}`));
    process.exit(1);
  }

  //Destroy the worker
  await Thread.terminate(worker);
};
main();