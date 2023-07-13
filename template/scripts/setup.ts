import { execSync } from 'child_process';

(function () {
  execSync('yarn patch-package', { stdio: 'inherit' });

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

    execSync('bundle exec pod install --project-directory=ios --repo-update', {
      stdio: 'inherit',
    });

    console.log('                      ✨✨✨✨✨ Pod done!!! ✨✨✨✨✨');
  }
})();
