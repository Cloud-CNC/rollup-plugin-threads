//Imports
import {expose} from 'threads/worker';

//Expose the worker
expose(input =>
{
  return `Worker received: ${input}`;
});