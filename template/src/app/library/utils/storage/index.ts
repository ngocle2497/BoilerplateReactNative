/* eslint-disable @typescript-eslint/no-explicit-any */
import { MMKV } from 'react-native-mmkv';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';

const appName = 'APP_Name';

const AppKey = '7268428d-d814-4eca-8829-3dbe0e2eaa7a';

export const AppStorage = new MMKV({
  id: `user-${appName}-storage`,
  encryptionKey: AppKey,
});

if (__DEV__) {
  initializeMMKVFlipper({ default: AppStorage });
}

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key: string) {
  try {
    return AppStorage.getString(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveString(key: string, value: string) {
  try {
    AppStorage.set(key, value);

    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export function load(key: string) {
  try {
    const almostThere = AppStorage.getString(key);

    return typeof almostThere === 'string' ? JSON.parse(almostThere) : null;
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function save(key: string, value: any) {
  try {
    AppStorage.set(key, JSON.stringify(value));

    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string) {
  try {
    AppStorage.delete(key);
  } catch {}
}

interface Storage {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
}

export const reduxPersistStorage: Storage = {
  setItem: (key, value) => {
    AppStorage.set(key, value);

    return Promise.resolve(true);
  },
  getItem: key => {
    const value = AppStorage.getString(key);

    return Promise.resolve(value);
  },
  removeItem: key => {
    AppStorage.delete(key);

    return Promise.resolve();
  },
};
