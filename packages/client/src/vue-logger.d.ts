/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Augment the typings of Vue.js
 */
import Vue = require('vue');

// eslint-disable-next-line import/first
import * as VueLogger from 'vuejs-logger';

export interface Log {
  debug(...args: any[]): void;

  info(...args: any[]): void;

  warn(...args: any[]): void;

  error(...args: any[]): void;

  fatal(...args: any[]): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $log: Log;
  }
}

export default VueLogger;
