/**
 * remove this line when use
 */
export {};
// /* eslint-disable @typescript-eslint/ban-types */
// import {Platform} from 'react-native';
// import {
//   PERMISSIONS,
//   Permission,
//   request,
//   check,
//   RESULTS,
// } from 'react-native-permissions';

// type Result = 'unavailable' | 'denied' | 'blocked' | 'granted' | 'limited';

// export async function useCameraPermission() {
//   const status = await request(
//     Platform.select({
//       android: PERMISSIONS.ANDROID.CAMERA,
//       ios: PERMISSIONS.IOS.CAMERA,
//     }),
//   );
//   return status;
// }
// export async function useMediaPermission() {
//   const statusRead = await request(
//     Platform.select({
//       android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
//       ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
//     }),
//   );
//   const statusWrite = await request(
//     Platform.select({
//       android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
//       ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
//     }),
//   );
//   return {statusRead, statusWrite};
// }
// export async function useLocationPermission() {
//   const status = await request(
//     Platform.select({
//       android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//     }),
//   );
//   return status;
// }
// export function checkPermission(
//   permission: Permission,
//   onUnAvailable?: Function,
//   onDenied?: Function,
//   onGranted?: Function,
//   onBlocked?: Function,
// ) {
//   check(permission).then((result: Result) => {
//     switch (result) {
//       case RESULTS.UNAVAILABLE:
//         /*
//        This feature is not available (on this device / in this context)
//        */
//         onUnAvailable && onUnAvailable();
//         break;
//       case RESULTS.DENIED:
//         /*
//        The permission has not been requested / is denied but requestable
//        */
//         onDenied && onDenied();
//         break;
//       case RESULTS.GRANTED:
//         /*
//       The permission is granted
//        */
//         onGranted && onGranted();
//         break;
//       case RESULTS.BLOCKED:
//         /*
//       The permission is denied and not requestable anymore
//        */
//         onBlocked && onBlocked();
//         break;
//     }
//   });
// }
