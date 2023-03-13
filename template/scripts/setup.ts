import { execSync } from 'child_process';

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
      '                  🧐🧐🧐🧐🧐 Starting bundle install!! 🧐🧐🧐🧐🧐',
    );

    execSync('bundle install', {
      stdio: 'inherit',
    });

    console.log('bundle install Done!!✨✨✨✨✨');

    console.log(
      '                  🧐🧐🧐🧐🧐 Starting pod install!! 🧐🧐🧐🧐🧐',
    );

    execSync('bundle exec pod install --project-directory=ios --verbose', {
      stdio: 'inherit',
    });

    console.log('                      ✨✨✨✨✨ Pod done!!! ✨✨✨✨✨');
  }
})();
