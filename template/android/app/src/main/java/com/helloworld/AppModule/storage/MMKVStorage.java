package com.helloworld.AppModule.storage;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.tencent.mmkv.MMKV;

public class MMKVStorage {
    private Context context;

    public MMKVStorage(ReactApplicationContext reactContext) {
        this.context = reactContext;
        MMKV.initialize(context);
    }

    private MMKV getMMKVbyKey(String keyId, String cryptKey) {
        if (keyId != null && !keyId.isEmpty() && cryptKey != null && !cryptKey.isEmpty()) {
            return MMKV.mmkvWithID(keyId, MMKV.SINGLE_PROCESS_MODE, cryptKey);
        }
        return MMKV.defaultMMKV();
    }

    public void setValue(String keyName, String value, String keyId, String cryptKey) {
        getMMKVbyKey(keyId, cryptKey).encode(keyName, value);
    }

    public void setValue(String keyName, boolean value, String keyId, String cryptKey) {
        getMMKVbyKey(keyId, cryptKey).encode(keyName, value);
    }

    public void setValue(String keyName, double value, String keyId, String cryptKey) {
        getMMKVbyKey(keyId, cryptKey).encode(keyName, value);
    }

    public String getString(String keyName, String keyId, String cryptKey) {
        return getMMKVbyKey(keyId, cryptKey).decodeString(keyName);
    }

    public double getDouble(String keyName, String keyId, String cryptKey) {
        return getMMKVbyKey(keyId, cryptKey).decodeDouble(keyName);
    }

    public boolean getSBoolean(String keyName, String keyId, String cryptKey) {
        return getMMKVbyKey(keyId, cryptKey).decodeBool(keyName);
    }

    public void delete(String keyName, String keyId, String cryptKey) {
        getMMKVbyKey(keyId, cryptKey).removeValueForKey(keyName);
    }

    public String[] getAllKeys(String keyId, String cryptKey) {
        return getMMKVbyKey(keyId, cryptKey).allKeys();
    }

    public void clearAll(String keyId, String cryptKey) {
        getMMKVbyKey(keyId, cryptKey).clearAll();
    }
}
