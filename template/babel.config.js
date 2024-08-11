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
          '@listener': './src/app/common/redux/listener.ts',
          '@model': './src/app/model',
          '@navigation': './src/app/navigation',
          '@networking': './src/app/library/networking',
          '@redux-action-type': './src/app/redux/action-type',
          '@redux-selector': './src/app/redux/selector',
          '@redux-slice': './src/app/redux/action-slice',
          '@rn-core': './src/app/library/components/core',
          '@screens': './src/app/screens',
          '@storage': './src/app/library/utils/storage',
          '@store': './src/app/redux/store',
          '@theme': './src/app/themes',
          '@utils': './src/app/library/utils',
          '@validate': './src/app/common/zod-validate',
        },
        root: ['./'],
      },
    ],
  ],
  presets: ['module:@react-native/babel-preset'],
};
