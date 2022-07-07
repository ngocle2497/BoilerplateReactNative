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
  try {
    // if simulator is not booted, it will throw an error
    execSync(`xcrun simctl list devices | grep "${simulator}" | grep "Booted"`);
  } catch {
    execSync(`xcrun simctl boot "${simulator}"`);
  }
  /**
   * iPhone 8 (2292DF56-3D4D-4328-90CF-C804E8A1A7F5) (Shutdown)
   * iPhone 11 (7590DD1E-D039-4545-ADB1-586F2471D873) (Booted)
   * iPhone 11 Pro (24C004AB-A617-4168-B0F2-37FD9223A1C0) (Booted)
   */
  const deviceId = execSync("xcrun simctl list | egrep '(Booted)' ")
    .toString()
    .trim()
    .split('\n')
    .find(x => x.includes(simulator))
    .replace('(Booted)', '')
    .replace(simulator, '')
    .trim()
    .replace('(', '')
    .replace(')', '');

  execSync(
    `xcrun simctl push ${deviceId} ${envJson.BUNDLE_IDENTIFIER} notification-ios-config.apns`,
    { stdio: 'inherit' },
  );
})();
