/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const { getEnvJsonFromPath } = require('./common');

(() => {
  const { argv } = process;

  const actualArgv = argv.slice(2);

  const [envPath] = actualArgv;

  const envJson = getEnvJsonFromPath(envPath);

  execSync(`npx expo start --appId ${envJson.public.BUNDLE_IDENTIFIER} --clear`, {
    stdio: 'inherit',
  });
})();
