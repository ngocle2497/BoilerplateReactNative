import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

import { loadEnvFile, setupEnv } from './common';

const run = (props: {
  platform: NodeJS.Platform;
  variant: string;
  envPath: string;
}) => {
  const envJson = loadEnvFile(props.envPath);

  setupEnv(props.envPath, envJson);

  // uninstall android app with adb
  const devicesString = execSync('adb devices').toString().trim();

  if (devicesString.split('\n').length > 1) {
    try {
      execSync(`adb uninstall ${envJson.BUNDLE_IDENTIFIER}`);
    } catch {
      console.log('Old App not found');
    }
  }

  if (props.platform === 'darwin') {
    execSync(
      `npx react-native run-android --mode=${props.variant} --appId=${envJson.BUNDLE_IDENTIFIER}`,
      { stdio: 'inherit' },
    );
  } else if (props.platform === 'win32') {
    execSync(
      `npx react-native run-android --mode=${props.variant} --appId=${envJson.BUNDLE_IDENTIFIER}`,
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
  return `keytool -exportcert -alias ${alias} -keystore android/app/${keyStorePath} -storepass ${keyStorePass} | openssl sha1 -binary | openssl base64`;
};

const getHash = () => {
  console.log('🔑🔑🔑🔑🔑🔑🔑 Key hash for debug 🔑🔑🔑🔑🔑🔑🔑');

  execSync(
    getHashCommand({
      keyStorePath: 'debug.keystore',
      keyStorePass: 'android',
      alias: 'androiddebugkey',
    }),
    { stdio: 'inherit' },
  );

  console.log('');

  readdirSync('env').forEach(r => {
    const envJson = loadEnvFile(join('env', r));

    console.log('🔑🔑🔑🔑🔑🔑🔑 Key hash for env => ', r, '🔑🔑🔑🔑🔑🔑🔑');

    execSync(
      getHashCommand({
        keyStorePath: `release-keystore/${envJson.ANDROID_KEY_STORE_FILE}`,
        keyStorePass: envJson.ANDROID_KEY_STORE_KEY_PASSWORD,
        alias: envJson.ANDROID_KEY_STORE_KEY_ALIAS,
      }),
      { stdio: 'inherit' },
    );

    console.log('');
  });
};

const signingReport = () => {
  readdirSync('env').forEach(r => {
    console.log(
      '🔑🔑🔑🔑🔑🔑🔑 Signing report for env => ',
      r,
      '🔑🔑🔑🔑🔑🔑🔑',
    );

    execSync(
      `cd android && ./gradlew :app:signingReport -PdefaultEnvFile=env/${r}`,
      { stdio: 'inherit' },
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

  const keyStorePath = `android/app/release-keystore/${keyName}.keystore`;

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

  const [nameFunc, envPath, variant] = actualArgv;

  switch (nameFunc) {
    case 'run':
      run({ platform, variant, envPath });

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
