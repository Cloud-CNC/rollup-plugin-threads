/**
 * @fileoverview Typescript Types
 */

//Imports
import type {ExternalOption, Plugin} from 'rollup';
import type {FilterPattern} from '@rollup/pluginutils';

export interface Options
{
  /**
   * Files to exclude
   */
  exclude?: FilterPattern,

  /**
   * Files to include
   */
  include?: FilterPattern,

  /**
   * Rollup child bundler externals
   */
  external: ExternalOption,

  /**
   * Rollup child bundler plugins
   */
  plugins?: Plugin[]
}