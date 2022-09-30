/* eslint-disable @typescript-eslint/no-var-requires */
const sharp = require('sharp');

const { iconSourceSet } = require('./template/android/data');

const RES_ANDROID_DIR = './android/app/src/main/res';
const IC_LAUNCHER = 'ic_launcher';

const genMipmapIcon = async ({
  coverSize,
  iconSize,
  borderRadius,
  sourceIcon,
  destIcon,
  padding,
}) => {
  const svgImage = `
  <svg>
  <rect x="0" y="0" width="${iconSize}" height="${iconSize}" rx="${borderRadius}" ry="${borderRadius}"/>
  </svg>
  `;
  const rect = Buffer.from(svgImage);
  const { data: rectImage } = await sharp(rect).toBuffer({
    resolveWithObject: true,
  });
  const { data: iconData } = await sharp(sourceIcon)
    .resize(iconSize, iconSize)
    .composite([{ input: rectImage, blend: 'dest-in' }])
    .toBuffer({ resolveWithObject: true });

  await sharp({
    create: {
      width: coverSize,
      height: coverSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: iconData,
        top: padding,
        left: padding,
      },
    ])
    .toFile(RES_ANDROID_DIR + destIcon);
};

module.exports = async config => {
  const { pathImage } = config;
  for (const [key, icon] of Object.entries(iconSourceSet)) {
    await genMipmapIcon({
      coverSize: icon.coverSize,
      borderRadius: icon.iconCircleRadius,
      iconSize: icon.iconCircleSize,
      padding: icon.paddingCircle,
      sourceIcon: pathImage,
      destIcon: `/${key}/${IC_LAUNCHER}_round.png`,
    });
    await genMipmapIcon({
      coverSize: icon.forceGroundCoverSize,
      borderRadius: 0,
      iconSize: icon.forceGroundIconSize,
      padding: icon.paddingForceGround,
      sourceIcon: pathImage,
      destIcon: `/${key}/${IC_LAUNCHER}_foreground.png`,
    });
    await genMipmapIcon({
      coverSize: icon.coverSize,
      borderRadius: icon.iconSquareRadius,
      iconSize: icon.iconSquareSize,
      padding: icon.paddingSquare,
      sourceIcon: pathImage,
      destIcon: `/${key}/${IC_LAUNCHER}.png`,
    });
  }
};
