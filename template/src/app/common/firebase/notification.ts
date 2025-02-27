/**
 * remove this line when use
 */
export {};
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
import { useEffect } from 'react';

import { requestNotifications } from 'react-native-permissions';

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

export interface RemoteNotification<T>
  extends ReOmit<FirebaseMessagingTypes.RemoteMessage, 'data'> {
  //  Nested data from fcm is string. carefully when use
  //  example data:{ nested:{ a: 1 }}
  //  => nested will be string
  data?: T;
}

export const requestNotificationPermission = async () => {
  return new Promise<boolean>(resolve => {
    requestNotifications(['alert', 'sound', 'badge'])
      .then(res => {
        resolve(res.status === 'granted');
      })
      .catch(() => {
        resolve(false);
      });
  });
};

export const getDeviceToken = async () => {
  return new Promise<string>(resolve => {
    messaging()
      .getToken()
      .then(resolve)
      .catch(() => {
        resolve('');
      });
  });
};

export const useInAppNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any,
) => {
  // effect
  useEffect(() => {
    const unsubscribeInApp = messaging().onMessage(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any,
    );

    return () => {
      unsubscribeInApp();
    };
  }, []);
};

export const useNotificationOpened = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any,
) => {
  // effect
  useEffect(() => {
    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any,
    );

    messaging().setBackgroundMessageHandler(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any,
    );

    messaging()
      .getInitialNotification()
      .then(res => {
        if (res) {
          callback(res as any);
        }
      });

    return () => {
      unsubscribeBackground();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
*/
