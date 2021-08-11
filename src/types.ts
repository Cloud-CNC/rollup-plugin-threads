/**
 * @fileoverview Typescript Types
 */

//Imports
import {FilterPattern} from '@rollup/pluginutils';
import {RollupOptions} from 'rollup';

/**
 * Plugin options
 */
export type Options = RollupOptions & {
  /**
   * Files to exclude
   */
  exclude?: FilterPattern;

  /**
   * Files to include
   */
  include?: FilterPattern;

  /**
   * Wether or not to enable verbose logging
   */
  verbose?: boolean;
};