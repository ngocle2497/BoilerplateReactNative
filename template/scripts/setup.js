// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

(function () {
  execSync('yarn patch-package', { stdio: 'inherit' });
  execSync('mkdir -p android/app/src/main/assets', {
    stdio: 'inherit',
  });
  execSync('cp -r src/app/assets/fonts android/app/src/main/assets', {
    stdio: 'inherit',
  });
  console.log('Link font Android Done!!✨✨✨✨✨');
  if (process.platform === 'darwin') {
    execSync('cd ios && touch tmp.xcconfig');
    console.log(
      '                  🧐🧐🧐🧐🧐 Starting pod install!! 🧐🧐🧐🧐🧐',
    );
    execSync('cd ios && pod install', { stdio: 'inherit' });
    console.log('                      ✨✨✨✨✨ Pod done!!! ✨✨✨✨✨');
  }
})();
