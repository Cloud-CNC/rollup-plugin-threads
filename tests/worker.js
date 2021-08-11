//Imports
import {expose} from 'threads';

//Expose the worker
expose(input =>
{
  return `Worker received: ${input}`;
});