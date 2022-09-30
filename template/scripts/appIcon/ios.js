/* eslint-disable @typescript-eslint/no-var-requires */
const jimp = require('jimp');

const fs = require('fs');

const { mergeArray } = require('./common');
const iosTem = require('./template/ios/Contents.json');
const dataIOS = require('./template/ios/data');

const DEFAULT_ICON_IOS = 'AppIcon';
const IOS_IMAGE_ASSETS_DIR = 'ios/RNChallengeV3/Images.xcassets';

module.exports = async config => {
  if (!fs.existsSync(`${IOS_IMAGE_ASSETS_DIR}`)) {
    await fs.mkdirSync(IOS_IMAGE_ASSETS_DIR);
  }
  // get list icon size
  const iosIconsSize = config.withIpad
    ? mergeArray(dataIOS.iPadIconsSize, dataIOS.iphoneIconsSize)
    : dataIOS.iphoneIconsSize;

  // get custom AppIcon Folder Name IOS
  const appIconFileName = `${
    config.appIconFolderName || DEFAULT_ICON_IOS
  }.appiconset`;

  // create images by list icon size
  for (const size of iosIconsSize) {
    const image = await jimp.read(config.pathImage);
    await image
      .resize(size, size)
      .quality(100)
      .write(`${IOS_IMAGE_ASSETS_DIR}/${appIconFileName}/${size}.png`);
  }

  // overwrite Contents.json
  const newImagesIos = config.withIpad
    ? [...dataIOS.iphoneIcons, ...dataIOS.iPadIcons, ...iosTem.images]
    : [...dataIOS.iphoneIcons, ...iosTem.images];
  await fs.writeFileSync(
    `./${IOS_IMAGE_ASSETS_DIR}/${appIconFileName}/Contents.json`,
    JSON.stringify({ ...iosTem, images: newImagesIos }),
  );
};
