import { execSync } from 'child_process';

import { loadEnvFile, setupEnv } from './common';

(function () {
  const { argv } = process;

  const [, , buildType, envPath, fastlaneEnv] = argv;

  const envJson = loadEnvFile(envPath);

  setupEnv(envPath, envJson);

  switch (buildType) {
    case 'google_internal_test_flight':
      execSync(
        `bundle exec fastlane android google_internal --env ${fastlaneEnv}`,
        {
          stdio: 'inherit',
        },
      );

      execSync(
        `bundle exec fastlane ios test_flight_build --env ${fastlaneEnv}`,
        {
          stdio: 'inherit',
        },
      );

      break;

    default:
      break;
  }
})();
