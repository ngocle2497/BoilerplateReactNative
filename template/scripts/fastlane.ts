import { execSync } from 'child_process';

import { loadEnvFile, setupEnv } from './common';

(function () {
  const { argv } = process;

  const [, , lane, envPath, fastlaneEnv, platform] = argv;

  const envJson = loadEnvFile(envPath);

  setupEnv(envPath, envJson);

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
