const pkg = require('./package');

module.exports = {
  repositoryUrl: pkg.repository,
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        pkgRoot: './dist'
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'node ./copy-version.js'
      }
    ],
    [
      '@semantic-release/github',
      {
        assets: [{ path: 'dist/**' }]
      }
    ],
    '@semantic-release/git'
  ]
};
