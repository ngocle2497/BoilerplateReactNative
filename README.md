## Welcome to the Boilerplate React Native

> How to build

- Install react native
  https://reactnative.dev/docs/getting-started
- Create new project
  `npx react-native init <yourProjectName> --template react-native-template-typescript`
- Copy all file to your project without `package.json` and `preview.gif` files
- Modify your `package.json` :
    + Replace your `script` tag by my `script` tag
    + Append my `dependencies` tag to your `dependencies` tag 
    + Replace your `devDependencies` by my `devDependencies` tag
- Install package
  `npm install` or
  `yarn` or `yarn yarn-ios`(ios) (recommended)
- Run your app
  `npx react-native run-android/ios` or `yarn android/ios `or `npm run android/ios`
- <h2>Notes</h2>
  This boilerplate uses libraries [react-native-reanimated v2](https://docs.swmansion.com/react-native-reanimated/docs) and [react-native-gesture-handle](https://github.com/software-mansion/react-native-gesture-handler). Please follow their installation instructions.
- <h3>Preview</h3>
<img src="./preview.gif">