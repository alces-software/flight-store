import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: 'bundle.es.js',
      format: 'es',
    },
    {
      file: 'bundle.cjs.js',
      format: 'cjs',
    },
    {
      file: 'bundle.umd.js',
      format: 'umd',
      name: 'flight-store-lib',
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
};
