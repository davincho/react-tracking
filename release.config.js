const pkg = require('./package');

module.exports = {
  repositoryUrl: pkg.repository,
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git'
  ]
};
