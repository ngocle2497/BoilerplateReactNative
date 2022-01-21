/**
 * remove this line when use
 */
export {};
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';

// import {onCheckType} from '../method';
// export async function getDatabase<T = any>(ref: string): Promise<Array<T>> {
//   return await database()
//     .ref(ref)
//     .once('value')
//     .then(snap => {
//       return snap.val();
//     })
//     .catch(() => {
//       return [];
//     });
// }
// export function onListenDataChange(
//   ref: string,
//   onChange: (data: Array<any>) => void,
// ) {
//   database()
//     .ref(ref)
//     .on('value', (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
//       if (onCheckType(onChange, 'function')) {
//         onChange(snapshot.val());
//       }
//     });
// }
