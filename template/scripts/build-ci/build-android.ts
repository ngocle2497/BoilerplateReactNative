import { execSync } from 'child_process';

(() => {
  const [envArgs, export_dir] = process.argv.slice(2);

  console.log(`envArgs: ${envArgs}`);

  envArgs.split(',').forEach(envArg => {
    console.log(`Building android for ${envArg}`);

    execSync(
      `bundle exec fastlane android aab_android --env ${envArg} export_dir:${export_dir}`,
      {
        stdio: 'inherit',
      },
    );

    execSync(
      `bundle exec fastlane android apk_android --env ${envArg} export_dir:${export_dir}`,
      {
        stdio: 'inherit',
      },
    );
  });
})();
