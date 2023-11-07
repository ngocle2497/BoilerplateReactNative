import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

import { getEnvJsonFromPath } from './common';

const run = (props: {
  platform: NodeJS.Platform;
  buildType: string;
  envPath: string;
}) => {
  const envJson = getEnvJsonFromPath(props.envPath);

  // uninstall android app with adb
  const devicesString = execSync('adb devices').toString().trim();

  const variant = envJson.public.FLAVOR + props.buildType;

  if (devicesString.split('\n').length > 1) {
    try {
      execSync(`adb uninstall ${envJson.public.BUNDLE_IDENTIFIER}`);
    } catch {
      console.log('Old App not found');
    }
  }

  if (props.platform === 'darwin') {
    execSync(
      `npx react-native run-android --mode=${variant} --appId=${envJson.public.BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit' },
    );
  } else if (props.platform === 'win32') {
    execSync(
      `npx react-native run-android --mode=${variant} --appId=${envJson.public.BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit', shell: 'cmd.exe' },
    );
  }
};

const getHashCommand = ({
  keyStorePath,
  keyStorePass,
  alias,
}: {
  keyStorePath: string;
  keyStorePass: string;
  alias: string;
}) => {
  return `keytool -exportcert -alias ${alias} -keystore ${keyStorePath} -storepass ${keyStorePass} | openssl sha1 -binary | openssl base64`;
};

const getHash = () => {
  console.log('🔑🔑🔑🔑🔑🔑🔑 Key hash for debug 🔑🔑🔑🔑🔑🔑🔑');

  execSync(
    getHashCommand({
      keyStorePath: 'android/app/debug.keystore',
      keyStorePass: 'android',
      alias: 'androiddebugkey',
    }),
    { stdio: 'inherit' },
  );

  console.log('');

  readdirSync('env').forEach(r => {
    const envJson = getEnvJsonFromPath(join('env', r));

    console.log('🔑🔑🔑🔑🔑🔑🔑 Key hash for env => ', r, '🔑🔑🔑🔑🔑🔑🔑');

    execSync(
      getHashCommand({
        keyStorePath: `fastlane/release-keystore/${envJson.public.ANDROID_KEY_STORE_FILE}`,
        keyStorePass: envJson.public.ANDROID_KEY_STORE_KEY_PASSWORD,
        alias: envJson.public.ANDROID_KEY_STORE_KEY_ALIAS,
      }),
      { stdio: 'inherit' },
    );

    console.log('');
  });
};

const getReportCommand = ({
  alias,
  keyStorePass,
  keyStorePath,
}: {
  keyStorePath: string;
  keyStorePass: string;
  alias: string;
}) => {
  return `keytool -list -v -keystore ${keyStorePath} -alias ${alias} -storepass ${keyStorePass} -keypass ${keyStorePass}`;
};

const signingReport = () => {
  console.log('🔑🔑🔑🔑🔑🔑🔑 Signing report for debug🔑🔑🔑🔑🔑🔑🔑');

  execSync(
    getReportCommand({
      alias: 'androiddebugkey',
      keyStorePath: 'android/app/debug.keystore',
      keyStorePass: 'android',
    }),
    {
      stdio: 'inherit',
    },
  );

  readdirSync('env').forEach(r => {
    const envJson = getEnvJsonFromPath(join('env', r));

    console.log(
      '🔑🔑🔑🔑🔑🔑🔑 Signing report for env => ',
      r,
      '🔑🔑🔑🔑🔑🔑🔑',
    );

    execSync(
      getReportCommand({
        alias: `${envJson.public.ANDROID_KEY_STORE_KEY_ALIAS}`,
        keyStorePath: `fastlane/release-keystore/${envJson.public.ANDROID_KEY_STORE_FILE}`,
        keyStorePass: `${envJson.public.ANDROID_KEY_STORE_KEY_PASSWORD}`,
      }),
      {
        stdio: 'inherit',
      },
    );

    console.log('');
  });
};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (query: string) =>
  new Promise(resolve => {
    rl.question(query, resolve);
  });

const genKeyStore = async () => {
  const keyName = await prompt("What's your keystore name?: ");

  rl.close();

  const keyStorePath = `fastlane/release-keystore/${keyName}.keystore`;

  const exist = existsSync(keyStorePath);

  if (exist) {
    console.log('A keystore already exists. Please make another one');

    genKeyStore();

    return;
  }

  execSync(
    `keytool -genkeypair -v -storetype PKCS12 -keystore ${keyStorePath} -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`,
    { stdio: 'inherit' },
  );
};

(() => {
  const { argv, platform } = process;

  const actualArgv = argv.slice(2);

  const [nameFunc, envPath, buildType] = actualArgv;

  switch (nameFunc) {
    case 'run':
      run({ platform, buildType, envPath });

      break;
    case 'hash':
      getHash();

      break;
    case 'report':
      signingReport();

      break;
    case 'keystore':
      genKeyStore();

      break;

    default:
      break;
  }
})();

export {};
