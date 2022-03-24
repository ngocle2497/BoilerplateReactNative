/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

(async function () {
  fs.readFile(path.join('./', process.argv[2]), 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // eslint-disable-next-line prefer-destructuring
    const strBundleIdentifier = data
      .slice(data.indexOf('BUNDLE_IDENTIFIER'))
      .split('\n')[0];
    const BUNDLE_IDENTIFIER = strBundleIdentifier.slice(
      strBundleIdentifier.indexOf('=') + 1,
    );

    await execSync(
      `ENVFILE=${process.argv[2]} && cd android && ./gradlew clean '-PdefaultEnvFile=${process.argv[2]}' && cd .. && npx react-native run-android --variant=${process.argv[3]} --appId=${BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit' },
    );
  });
})();
