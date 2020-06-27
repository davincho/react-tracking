import path from 'path';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import typescript from 'rollup-plugin-typescript2';

const external = require('./package.json');

const INPUT_FILE_NAME = 'index.ts';
const INPUT_FOLDER_NAME = 'src';

const OUTPUT_FILE_NAME = 'index.cjs.js';
const OUTPUT_FOLDER_NAME = 'dist';

export default {
  input: path.join(INPUT_FOLDER_NAME, INPUT_FILE_NAME),
  external: Object.keys(external.dependencies || {}),
  output: {
    file: path.join(OUTPUT_FOLDER_NAME, OUTPUT_FILE_NAME),
    format: 'cjs'
  },
  plugins: [
    del({ targets: OUTPUT_FOLDER_NAME }),
    // Needs to go as the very first plugin (expect for cleaning)
    commonjs(),
    // See https://rollupjs.org/guide/en/#rollupplugin-node-resolve
    resolve(),
    typescript(),
    // Copy package.json from root and prepare a special version of it for distribtion
    generatePackageJson({
      baseContents: (pkg) => {
        delete pkg.scripts;
        delete pkg.dependencies;
        delete pkg.devDependencies;

        // Strip output folder name from file paths
        const keys = ['main', 'module', 'types'];

        for (const key of keys) {
          pkg[key] = pkg[key].replace(`${OUTPUT_FOLDER_NAME}${path.sep}`, '');
        }

        return pkg;
      }
    })
  ]
};
