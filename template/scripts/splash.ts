import { execSync } from 'child_process';
import { readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';

(function () {
  const { argv } = process;

  const actualArgv = argv.slice(2);

  const IOS_FOLDER_NAME = 'IRess';

  const [path, bgColor, width, flavor, iosName] = actualArgv;

  // translate old BootSplash.storyboard to new one
  const oldBootSplashPath = resolve(
    'ios',
    IOS_FOLDER_NAME,
    'BootSplash.storyboard',
  );

  const newBootSplashPath = resolve(
    'ios',
    IOS_FOLDER_NAME,
    'Splash',
    `${iosName}.storyboard`,
  );

  // translate old BootSplashLogo.imageset to new one
  const oldBootSplashLogoPath = resolve(
    'ios',
    IOS_FOLDER_NAME,
    'Images.xcassets',
    'BootSplashLogo.imageset',
  );

  const newBootSplashLogoPath = resolve(
    'ios',
    IOS_FOLDER_NAME,
    'Images.xcassets',
    `${iosName}Logo.imageset`,
  );

  // remove old .imageset if exist
  rmSync(newBootSplashLogoPath, { recursive: true, force: true });

  execSync(
    `yarn react-native generate-bootsplash ${path} --background=${bgColor} --platforms=android,ios --logo-width=${width}  --assets-output=assets --flavor=${flavor}`,
    { stdio: 'inherit' },
  );

  // update BootSplashLogo image on BootSplash.storyboard
  const bootSplashFile = readFileSync(oldBootSplashPath, 'utf8');

  writeFileSync(
    oldBootSplashPath,
    bootSplashFile
      .replace('BootSplashLogo', `${iosName}Logo`)
      .replace('BootSplashLogo', `${iosName}Logo`),
    'utf8',
  );

  execSync(`mv -f ${oldBootSplashPath} ${newBootSplashPath}`);

  execSync(`mv -f ${oldBootSplashLogoPath} ${newBootSplashLogoPath}`);
})();
