/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const { loadEnvFile, setupEnv } = require('./common');

(async function () {
  const { argv, platform } = process;
  await setupEnv(argv[2]);
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
      `npx react-native run-android --variant=${argv[3]} --appId=${envJson.BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit' },
    );
  } else if (platform === 'win32') {
    execSync(
      `npx react-native run-android --variant=${argv[3]} --appId=${envJson.BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit', shell: 'cmd.exe' },
    );
  }
})();
