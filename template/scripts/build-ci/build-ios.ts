import { execSync } from 'child_process';

(() => {
  const [envArgs, export_dir] = process.argv.slice(2);

  console.log(`envArgs: ${envArgs}`);

  envArgs.split(',').forEach(envArg => {
    console.log(`Building ios for ${envArg}`);

    execSync(
      `bundle exec fastlane ios build_ipa --env ${envArg} export_dir:${export_dir}`,
      {
        stdio: 'inherit',
      },
    );
  });
})();
