import {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
const {AppModule} = NativeModules;
export const getVersion = () => {
  return AppModule.getVersion();
};
export const getDeviceType = () => {
  return AppModule.getDeviceType();
};
export const getAppName = () => {
  return AppModule.getAppName();
};
export const getDeviceId = () => {
  return AppModule.getDeviceId();
};
export const getBuildNumber = () => {
  return AppModule.getBuildNumber();
};
export const useBlueToothState = () => {
  const [status, setStatus] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const bluetoothEvent = new NativeEventEmitter(AppModule);
    const subscription = bluetoothEvent.addListener(
      'onUpdateBluetoothStatus',
      state => {
        setStatus(Platform.OS === 'ios' ? state : state.status === 'on');
      },
    );
    return () => {
      bluetoothEvent.removeSubscription(subscription);
    };
  }, []);
  useEffect(() => {
    setStatus(AppModule.getBluetoothState());
  }, []);
  return status;
};
