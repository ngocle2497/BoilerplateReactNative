import { execSync } from 'child_process';

(() => {
  const [envArgs, export_dir] = process.argv.slice(2);

  console.log(`envArgs: ${envArgs}`);

  envArgs.split(',').forEach(envArg => {
    console.log(`Deploying ios for ${envArg}`);

    execSync(
      `bundle exec fastlane ios upload_to_TF --env ${envArg} export_dir:${export_dir}`,
      {
        stdio: 'inherit',
      },
    );
  });
})();
