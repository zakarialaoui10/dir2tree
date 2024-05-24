import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { mapfun } from 'mapfun';
// remove mapfun 

export default {
  input: 'src/index.js',
  externals: [mapfun],
  output: [{
    file: 'dist/index.cjs',
    format: 'cjs',
  },{
    file: 'dist/index.mjs',
    format: 'es',
  }
],
  globals: {
    mapfun: 'mapfun',
  },
  plugins: [resolve(), commonjs()],
};
