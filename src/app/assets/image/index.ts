export const images = {
    bg_wallpaper: require('./source/bg.png'),
    default: require('./source/default.png'),
    check: require('./source/check.png')
};

export type ImageTypes = keyof typeof images;
