/* eslint-disable @typescript-eslint/no-var-requires */
const runAndroid = require('./android');
const { getConfig } = require('./common');
const runIOS = require('./ios');

async function main() {
  const config = getConfig();
  runIOS(config);
  runAndroid(config);
  // console.log({ config });
}

main();
