// import { Platform } from 'react-native';

// import { ENVConfig } from '@config/env';
// import {
//   appleAuth,
//   appleAuthAndroid,
// } from '@invertase/react-native-apple-authentication';
// import { load, save } from '@storage';
// import jwt_decode from 'jwt-decode';

// import { randomUniqueId } from '../string/index';
export {};
// import { randomUniqueId } from '../string/index';

// async function pickInfoAppleResponse({
//   appleId,
//   info = {},
// }: {
//   info?: Record<string, unknown>;
//   appleId: string;
// }) {
//   try {
//     const infoCache = await load(appleId);

//     const infoName = infoCache ? infoCache : info;
//     let userFullName = `${infoName?.familyName?.trim?.() || ''}${
//       infoName?.namePrefix || ''
//     } ${infoName?.middleName || ''} ${infoName?.givenName || ''}`?.trim();

//     if (!userFullName) {
//       userFullName = `${infoName?.firstName || ''} ${
//         infoName?.lastName || ''
//       }`.trim();
//     }

//     if (!Object.keys(infoCache || {})?.length) {
//       save(appleId, info);
//     }

//     return userFullName;
//   } catch {
//     return undefined;
//   }
// }
// type AppleResponse = {
//   nonce: string;
//   identityToken: string;
// };
// type LoginResult = {
//   success?: boolean;
//   data?: { userFullName?: string } & AppleResponse;
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

//         const userFullName = await pickInfoAppleResponse({
//           info: appleAuthRequestResponse.fullName,
//           appleId: appleAuthRequestResponse.user,
//         });

//         return {
//           success: true,
//           data: {
//             userFullName: userFullName,
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
//         const rawNonce = randomUniqueId();
//         const state = randomUniqueId();

//         // Configure the request
//         appleAuthAndroid.configure({
//           // The Service ID you registered with Apple
//           clientId: ENVConfig.CLIENT_ID_APPLE_SERVICE,

//           // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
//           // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
//           redirectUri: ENVConfig.APPLE_REDIRECT_URI,

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
//         const infoLogin = {
//           ...response,
//           ...(jwt_decode(response.id_token || '') as any),
//         };

//         const appleId = infoLogin.sub;
//         const { nonce } = infoLogin;
//         const identityToken = response.id_token || '';
//         // apple return full name one times. so save full name util push to BE successfully
//         const userFullName = await pickInfoAppleResponse({
//           info: response.user?.name,
//           appleId,
//         });
//         return {
//           success: true,
//           data: {
//             nonce,
//             identityToken,
//             userFullName,
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
