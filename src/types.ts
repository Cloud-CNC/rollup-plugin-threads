/**
 * @fileoverview Typescript Types
 */

//Imports
import type {Plugin} from 'rollup';

export interface Options
{
  /**
   * Name of the worker file
   */
  file: string,

  /**
   * List of Rollup plugins to run against the worker
   */
  plugins: Plugin[]
}