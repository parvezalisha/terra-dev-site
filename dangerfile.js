// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars, object-curly-newline
import { danger, warn, fail, message } from 'danger';

const newChangelog = danger.git.created_files.filter((filePath) => {
  const srcFilePattern = /CHANGELOG.md/i;
  return srcFilePattern.test(filePath);
});

const modifiedChangelog = danger.git.modified_files.filter((filePath) => {
  const srcFilePattern = /CHANGELOG.md/i;
  return srcFilePattern.test(filePath);
});

const modifiedSrcFiles = danger.git.modified_files.filter((filePath) => {
  const srcFilePattern = /\/src/i;
  return srcFilePattern.test(filePath);
});

const modifiedConfigFiles = danger.git.modified_files.filter((filePath) => {
  const configFilePattern = /\/src/i;
  return configFilePattern.test(filePath);
});

const modifiedGenerateConfigScriptFiles = danger.git.modified_files.filter((filePath) => {
  const srcFilePattern = /\/scripts\/generate-app-config/i;
  return srcFilePattern.test(filePath);
});

const hasCHANGELOGChanges = modifiedChangelog.length > 0 || newChangelog.length > 0;
const hasModifiedSrcFiles = modifiedSrcFiles.length > 0;
const hasModifiedConfigFiles = modifiedConfigFiles.length > 0;
const hasModifiedGenerateConfigScriptFiles = modifiedGenerateConfigScriptFiles.length > 0;

// Fail if there are src code changes without a CHANGELOG update
if ((hasModifiedSrcFiles || hasModifiedConfigFiles || hasModifiedGenerateConfigScriptFiles) && !hasCHANGELOGChanges) {
  fail('Please include a CHANGELOG entry with this PR.');
}

// Warn when there is a big PR
const bigPRThreshold = 1000;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(':exclamation: Big PR. Consider breaking this into smaller PRs if applicaple');
}
