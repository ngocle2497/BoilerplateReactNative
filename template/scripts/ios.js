/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const { loadEnvFile } = require('./common');

(async function () {
  if (process.platform !== 'darwin') {
    console.log('This script is only for macOS');
    return;
  }
  const envJson = await loadEnvFile();
  const simulator = 'iPhone 11';
  await execSync(
    `cd ios && xcodebuild clean && cd .. && npx react-native run-ios --scheme ${envJson.APP_PLACEHOLDER_NAME}-${envJson.APP_ENV} --simulator="${simulator}"`,
    { stdio: 'inherit' },
  );
})();
