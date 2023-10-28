import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { mapfun } from 'mapfun';

export default {
  input: 'src/index.js',
  externals: [mapfun],
  output: [{
    file: 'dist/index.cjs',
    format: 'cjs',
    name: 'dir2tree',
  },{
    file: 'dist/index.mjs',
    format: 'es',
    name: 'dir2tree',
  }
],
  globals: {
    mapfun: 'mapfun',
  },
  plugins: [resolve(), commonjs()],
};
