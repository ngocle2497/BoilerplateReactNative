#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { setupEnv } = require('./common');

(() => {
  const { argv } = process;

  const [, , envPath] = argv;

  setupEnv(envPath);
})();
