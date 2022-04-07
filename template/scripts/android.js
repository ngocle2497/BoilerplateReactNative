/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const { loadEnvFile } = require('./common');

(async function () {
  const { argv, platform } = process;
  const envJson = await loadEnvFile();
  if (platform === 'darwin') {
    await execSync(
      `ENVFILE=${argv[2]} && cd android && ./gradlew clean -PdefaultEnvFile=${argv[2]} && cd .. && npx react-native run-android --variant=${argv[3]} --appId=${envJson.BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit' },
    );
  } else if (platform === 'win32') {
    await execSync(
      `SET ENVFILE=${argv[2]} && cd android && gradlew clean -PdefaultEnvFile=${argv[2]} && cd .. && npx react-native run-android --variant=${argv[3]} --appId=${envJson.BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit', shell: 'cmd.exe' },
    );
  }
})();
