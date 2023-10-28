import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { mapfun } from 'mapfun';
import fs from 'fs';
import path from 'path';

export default {
  input: 'src/index.js',
  external: [mapfun,fs,path],
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'dir2tree',
  },
  globals: {
    mapfun: 'mapfun',
    fs: '_fs',
    path: '_path',
  },
  plugins: [resolve(), commonjs()],
};
