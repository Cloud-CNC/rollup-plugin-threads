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