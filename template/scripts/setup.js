// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

(async function () {
  await execSync('yarn patch-package', { stdio: 'inherit' });
  await execSync('npx react-native link', { stdio: 'inherit' });
  console.log('Link Done!!✨✨✨✨✨');
  if (process.platform === 'darwin') {
    await execSync('cd ios && touch tmp.xcconfig');
    console.log(
      '                  🧐🧐🧐🧐🧐 Starting pod install!! 🧐🧐🧐🧐🧐',
    );
    await execSync('cd ios && pod install', { stdio: 'inherit' });
    console.log('                      ✨✨✨✨✨ Pod done!!! ✨✨✨✨✨');
  }
})();
