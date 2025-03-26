module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@animated': './src/app/common/animated',
          '@app-emitter': './src/app/common/emitter',
          '@app-firebase': './src/app/common/firebase',
          '@assets': './assets',
          '@common': './src/app/common',
          '@components': './src/app/library/components',
          '@env': './env-config',
          '@hooks': './src/app/common/hooks',
          '@model': './src/app/model',
          '@navigation': './src/app/navigation',
          '@networking': './src/app/library/networking',
          '@rn-core': './src/app/library/components/core',
          '@screens': './src/app/screens',
          '@services': './src/app/services',
          '@storage': './src/app/library/utils/storage',
          '@theme': './src/app/themes',
          '@utils': './src/app/library/utils',
          '@validate': './src/app/common/zod-validate',
          '@zustand': './src/app/zustand',
        },
        root: ['./'],
      },
    ],
  ],
  presets: ['babel-preset-expo'],
};
