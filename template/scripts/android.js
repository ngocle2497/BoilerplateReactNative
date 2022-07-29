/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const { loadEnvFile } = require('./common');

(async function () {
  const { argv, platform } = process;
  const envJson = await loadEnvFile();
  // uninstall android app with adb
  const devicesString = execSync('adb devices').toString().trim();
  if (devicesString.split('\n').length > 1) {
    try {
      execSync(`adb uninstall ${envJson.BUNDLE_IDENTIFIER}`);
    } catch {
      console.log('Old App not found');
    }
  }
  if (platform === 'darwin') {
    execSync(
      `ENVFILE=${argv[2]} && cd android && ./gradlew clean '-PdefaultEnvFile=${argv[2]}' && cd .. && npx react-native run-android --variant=${argv[3]} --appId=${envJson.BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit' },
    );
  } else if (platform === 'win32') {
    execSync(
      `SET ENVFILE=${argv[2]} && cd android && gradlew clean -PdefaultEnvFile=${argv[2]} && cd .. && npx react-native run-android --variant=${argv[3]} --appId=${envJson.BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit', shell: 'cmd.exe' },
    );
  }
})();
