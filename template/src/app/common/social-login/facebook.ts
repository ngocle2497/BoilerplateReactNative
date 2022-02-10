// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
//   Settings,
// } from 'react-native-fbsdk-next';
export {};
// const init = () => {
//   Settings.initializeSDK();
// };

// type LoginResult = {success: boolean; token?: string};
// const login = () => {
//   return new Promise<LoginResult>(rs => {
//     LoginManager.logInWithPermissions(['public_profile', 'email']).then(
//       result => {
//         if (result.isCancelled) {
//           rs({success: false});
//         } else {
//           AccessToken.getCurrentAccessToken()
//             .then(data => {
//               if (data && data.accessToken) {
//                 rs({success: true, token: data.accessToken});
//               } else {
//                 rs({success: false});
//               }
//             })
//             .catch(err => {
//               console.log('FACEBOOK-LOGIN-ERROR', err);
//               rs({success: false});
//             });
//         }
//       },
//     );
//   });
// };

// const logout = async () => {
//   try {
//     const data = await AccessToken.getCurrentAccessToken();
//     if (data?.accessToken) {
//       const logoutGraph = new GraphRequest(
//         'me/permissions/',
//         {
//           accessToken: data?.accessToken,
//           httpMethod: 'DELETE',
//         },
//         error => {
//           if (error) {
//             console.log('Error fetching data: ' + error.toString());
//           } else {
//             LoginManager.logOut();
//           }
//         },
//       );
//       new GraphRequestManager().addRequest(logoutGraph).start();
//     } else {
//       LoginManager.logOut();
//     }
//   } catch (err) {
//     console.log('FACEBOOK-LOGOUT-ERROR', err);
//   }
// };

// export const FacebookService = {
//   init,
//   login,
//   logout,
// };
