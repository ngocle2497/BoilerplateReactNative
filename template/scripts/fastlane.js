/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const { setupEnv } = require('./common');

(async function () {
  const { argv } = process;
  const [, , lane, envPath, fastlaneEnv, platform] = argv;
  await setupEnv(envPath);
  if (platform === 'ios' || !platform) {
    execSync(`bundle exec fastlane ios ${lane} --env ${fastlaneEnv} `, {
      stdio: 'inherit',
    });
  }
  if (platform === 'android' || !platform) {
    execSync(`bundle exec fastlane android ${lane} --env ${fastlaneEnv}`, {
      stdio: 'inherit',
    });
  }
})();
