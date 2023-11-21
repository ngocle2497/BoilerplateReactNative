// import { Platform } from 'react-native';

// import { APPLE_REDIRECT_URI, CLIENT_ID_APPLE_SERVICE } from '@env';
// import {
//   appleAuth,
//   appleAuthAndroid,
// } from '@invertase/react-native-apple-authentication';
export {};
// type AppleResponse = {
//   nonce?: string;
//   identityToken?: string;
// };
// type LoginResult = {
//   success?: boolean;
//   data?: AppleResponse;
// };

// export const AppleService = {
//   isSupport:
//     Platform.OS === 'android'
//       ? appleAuthAndroid.isSupported
//       : appleAuth.isSupported,
//   appleLogin: async (): Promise<LoginResult> => {
//     if (Platform.OS === 'ios') {
//       try {
//         const appleAuthRequestResponse = await appleAuth.performRequest({
//           requestedOperation: appleAuth.Operation.LOGIN,
//           requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//         });

//         return {
//           success: true,
//           data: {
//             nonce: appleAuthRequestResponse.nonce,
//             identityToken: appleAuthRequestResponse.identityToken ?? '',
//           },
//         };
//       } catch (err) {
//         console.log('IOS-APPPLE-LOGIN-ERROR', err);

//         return {
//           success: false,
//         };
//       }
//     } else {
//       try {
//         // Generate secure, random values for state and nonce
//         const rawNonce = String.prototype.randomUniqueId();

//         const state = String.prototype.randomUniqueId();

//         // Configure the request
//         appleAuthAndroid.configure({
//           // The Service ID you registered with Apple
//           clientId: CLIENT_ID_APPLE_SERVICE,

//           // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
//           // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
//           redirectUri: APPLE_REDIRECT_URI,

//           // The type of response requested - code, id_token, or both.
//           responseType: appleAuthAndroid.ResponseType.ALL,

//           // The amount of user information requested from Apple.
//           scope: appleAuthAndroid.Scope.ALL,

//           // Random nonce value that will be SHA256 hashed before sending to Apple.
//           nonce: rawNonce,

//           // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
//           state,
//         });

//         // Open the browser window for user sign in
//         const response = await appleAuthAndroid.signIn();

//         const { nonce, id_token } = response;

//         return {
//           success: true,
//           data: {
//             nonce,
//             identityToken: id_token,
//           },
//         };
//         // Send the authorization code to your backend for verification
//       } catch (err) {
//         console.log('ANDROID-APPPLE-LOGIN-ERROR', err);

//         return {
//           success: false,
//         };
//       }
//     }
//   },
// };
