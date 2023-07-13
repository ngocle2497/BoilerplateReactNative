import { setupEnv } from './common';

(() => {
  const { argv } = process;

  const [, , envPath] = argv;

  setupEnv(envPath);
})();
