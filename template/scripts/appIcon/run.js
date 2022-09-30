/* eslint-disable @typescript-eslint/no-var-requires */
const { getConfig } = require('./common');
const runIOS = require('./ios');

async function main() {
  const config = getConfig();
  runIOS(config);
  console.log({ config });
}

main();
