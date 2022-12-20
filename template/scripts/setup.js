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
  console.log(
    '                  🧶🧶🧶🧶🧶 Link font Android done!! 🧶🧶🧶🧶🧶',
  );
  if (process.platform === 'darwin') {
    execSync('cd ios && touch tmp.xcconfig');
    console.log(
      '                  ⌛️⌛️⌛️⌛️⌛️ Starting bundle install!! ⏳⏳⏳⏳⏳',
    );
    execSync('bundle install', {
      stdio: 'inherit',
    });
    console.log(
      '                  💯💯💯💯💯 Bundle install done!! 💯💯💯💯💯',
    );
    console.log(
      '                  ⌛️⌛️⌛️⌛️⌛️ Starting pod install!! ⏳⏳⏳⏳⏳',
    );
    execSync('bundle exec pod install --project-directory=ios', {
      stdio: 'inherit',
    });
    console.log('                      🥙🥙🥙🥙🥙 Pod done!!! 🥙🥙🥙🥙🥙');
  }
})();
