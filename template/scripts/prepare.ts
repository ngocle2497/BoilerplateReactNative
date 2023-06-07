import { loadEnvFile, setupEnv } from './common';

(() => {
  const { argv } = process;

  const [, , envPath] = argv;

  const envJson = loadEnvFile(envPath);

  setupEnv(envPath, envJson);
})();
