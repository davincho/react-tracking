const readPackage = require('read-pkg');
const writePackage = require('write-pkg');

// This file is needed to copy the new version from the generated package.json in the dist folder
// back to the original package.json
(async () => {
  const sourceFile = await readPackage({ normalize: false, cwd: 'dist' });
  const newVersion = sourceFile.version;

  const original = await readPackage({ normalize: false });

  original.version = newVersion;

  await writePackage(original);
})();
