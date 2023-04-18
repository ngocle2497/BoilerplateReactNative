## Welcome to the Boilerplate React Native

:fireworks: Clean and minimalist React Native template for a quick start with TypeScript and so much more components.

## Current version: 0.71.6

## :star: Features

- Elegant usage directly within the RN-Boiler Cli
- Fastlane (App center included)
- Lefthook
- Boot Splash
- Blur Hash
- Declare String, Number, Array
- Consistent with the default React Native template
- Minimal additional dependencies
- Lots of built-in components
- Multiple schema ios(Dev/Prod as default)
- Multiple productFlavors android (dev/prod as default)

## Base config (Now u can config on env)

- Change App name ``` APP_DISPLAY_NAME ``` on ``` env/(.dev/.prod) ```
- Change App id ``` BUNDLE_IDENTIFIER ``` on ``` env/(.dev/.prod) ```
- Change App version ``` VERSION_NAME ``` on ``` env/(.dev/.prod) ```
- Change App build number ``` VERSION_CODE ``` on ``` env/(.dev/.prod) ```
- Change App URL ``` API_URL ``` on ``` env/(.dev/.prod) ```

### Gen app icon and Change app icon by env

Build with: [rn-ml](https://github.com/MasonLe2497/cli-tools)

- Update app icon file from appicon folder
- Run: ``` yarn app-icon ``` or ``` yarn app-icon:dev ```
  - Android: auto change flavor script
  - IOS: Change ASSETCATALOG_COMPILER_APPICON_NAME to your respective App Icon Assets (in respective env file)

## :arrow_forward: Usage

```sh
npx rn-boiler MyApp
```

Args command:

- skip install deps:

```sh
--skipInstall
```

- skip init git:

```sh
--skipGit
```

<h3>Preview</h3>
<img src="./preview.gif">

## Library

- [react-navigation-v6](https://reactnavigation.org)
- [axios](https://axios-http.com)
- [react-hook-form](https://www.react-hook-form.com)
- [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)
- [zod](https://github.com/colinhacks/zod)
- [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash)
- [react-native-reanimated-v2](https://github.com/software-mansion/react-native-reanimated#readme)
- [redux](http://redux.js.org)
- [redux-listener-middleware](https://redux-toolkit.js.org/api/createListenerMiddleware)
- [expo-image](https://docs.expo.dev/versions/latest/sdk/image/)
- [react-fast-compare](https://github.com/FormidableLabs/react-fast-compare)

    ... and more

## :bookmark: License

This project is [MIT](LICENSE) licensed.
