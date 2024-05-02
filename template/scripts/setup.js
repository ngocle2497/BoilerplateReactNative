/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const { getAndroidHome, getRubyVersion } = require('./common');

(function () {
  try {
    execSync('npx lefthook install', { stdio: 'inherit' });

    execSync('yarn patch-package', { stdio: 'inherit' });

    if (getAndroidHome() !== '') {
      execSync(
        `echo "sdk.dir=${getAndroidHome()}" > android/local.properties`,
        {
          stdio: 'inherit',
        },
      );
    }

    if (process.platform === 'darwin') {
      execSync('cd ios && touch tmp.xcconfig');

      if (getRubyVersion() < 276) {
        console.log(
          '                  🧐🧐🧐🧐🧐 Installing CocoaPods dependencies!! 🧐🧐🧐🧐🧐',
        );

        execSync('pod install --project-directory=ios', {
          stdio: 'inherit',
        });

        console.log('                      ✨✨✨✨✨ Pod done!!! ✨✨✨✨✨');
      } else {
        console.log(
          '                  🧐🧐🧐🧐🧐 Installing Bundle dependencies!! 🧐🧐🧐🧐🧐',
        );

        execSync('bundle install', {
          stdio: 'inherit',
        });

        console.log('bundle install Done!!✨✨✨✨✨');

        console.log(
          '                  🧐🧐🧐🧐🧐 Installing CocoaPods dependencies!! 🧐🧐🧐🧐🧐',
        );

        execSync(
          'bundle exec pod install --project-directory=ios --repo-update',
          {
            stdio: 'inherit',
          },
        );

        console.log('                      ✨✨✨✨✨ Pod done!!! ✨✨✨✨✨');
      }
    }
  } catch {}
})();
