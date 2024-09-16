/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
const { mergeConfig } = require('@react-native/metro-config');

const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
