import { Platform, StyleSheet } from 'react-native';
import RNSInfo from 'react-native-sensitive-info';

const appName = "APP_Name"
const storeName = Platform.select({ ios: 'keyChain', android: 'sharePreferences' })
const dateCreateApp = new Date(2020, 10, 10, 0, 0, 0, 0)
const AppKey = String(dateCreateApp) + appName + storeName

const optionRNSensitive: RNSInfo.RNSensitiveInfoOptions = {
  sharedPreferencesName: AppKey,
  keychainService: AppKey
}

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string, option?: RNSInfo.RNSensitiveInfoOptions) {
  try {
    return await RNSInfo.getItem(key, StyleSheet.flatten([optionRNSensitive, option]));
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
export async function saveString(key: string, value: string, option?: RNSInfo.RNSensitiveInfoOptions) {
  try {
    await RNSInfo.setItem(key, value, StyleSheet.flatten([optionRNSensitive, option]));
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
export async function load(key: string, option?: RNSInfo.RNSensitiveInfoOptions) {
  try {
    const almostThere = await RNSInfo.getItem(key, StyleSheet.flatten([optionRNSensitive, option]));
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
export async function save(key: string, value: any, option?: RNSInfo.RNSensitiveInfoOptions) {
  try {
    await RNSInfo.setItem(key, JSON.stringify(value), StyleSheet.flatten([optionRNSensitive, option]));
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
export async function remove(key: string, option?: RNSInfo.RNSensitiveInfoOptions) {
  try {
    await RNSInfo.deleteItem(key, StyleSheet.flatten([optionRNSensitive, option]));
  } catch { }
}
const createSensitiveStorage = (paramOption: RNSInfo.RNSensitiveInfoOptions = {}) => {
  const options = StyleSheet.flatten([optionRNSensitive, paramOption])
  // react-native-sensitive-info returns different a different structure on iOS
  // than it does on Android.
  //
  // iOS:
  // [
  //   [
  //     { service: 'app', key: 'foo', value: 'bar' },
  //     { service: 'app', key: 'baz', value: 'quux' }
  //   ]
  // ]
  //
  // Android:
  // {
  //   foo: 'bar',
  //   baz: 'quux'
  // }
  //
  // See https://github.com/mCodex/react-native-sensitive-info/issues/8
  //
  // `extractKeys` adapts for the different structure to return the list of
  // keys.
  const extractKeys = Platform.select({
    ios: (items: any) => items[0].map((item: any) => item.key),
    android: Object.keys
  });

  const noop = (...args: any[]) => null;

  return {
    async getItem(key: string, callback = noop) {
      try {
        // getItem() returns `null` on Android and `undefined` on iOS;
        // explicitly return `null` here as `undefined` causes an exception
        // upstream.
        let result: null | string | undefined = await RNSInfo.getItem(key, options);

        if (typeof result === "undefined") {
          result = null;
        }

        callback(null, result);

        return result;
      } catch (error) {
        callback(error);
        throw error;
      }
    },

    async setItem(key: string, value: string, callback = noop) {
      try {
        await RNSInfo.setItem(key, value, options);
        callback(null);
      } catch (error) {
        callback(error);
        throw error;
      }
    },

    async removeItem(key: string, callback = noop) {
      try {
        await RNSInfo.deleteItem(key, options);
        callback(null);
      } catch (error) {
        callback(error);
        throw error;
      }
    },

    async getAllKeys(callback = noop) {
      try {
        const values = await RNSInfo.getAllItems(options);
        const result = extractKeys(values);
        callback(null, result);
        return result;
      } catch (error) {
        callback(error);
        throw error;
      }
    }
  };
}
export const reduxPersistStorage = createSensitiveStorage({
  keychainService: AppKey,
  sharedPreferencesName: AppKey
});