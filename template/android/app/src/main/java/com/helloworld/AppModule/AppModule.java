package com.helloworld.AppModule;


import android.app.NotificationChannel;
import android.os.AsyncTask;
import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.helloworld.AppModule.deviceInfo.DeviceInfo;
import com.helloworld.AppModule.fileHelper.FileManager;
import com.helloworld.AppModule.imageHelper.ImageResizer;
import com.helloworld.AppModule.notificationHelper.NotificationHelper;
import com.helloworld.AppModule.storage.MMKVStorage;
import java.io.IOException;

public class AppModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private DeviceInfo mDeviceInfo;
    private FileManager mFileManager;
    private ImageResizer mImageResizer;
    private NotificationHelper mNotificationHelper;
    private MMKVStorage mmkvStorage;

    public AppModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        mNotificationHelper = new NotificationHelper(reactContext);
        mDeviceInfo = new DeviceInfo(reactContext);
        mFileManager = new FileManager(reactContext);
        mImageResizer = new ImageResizer(reactContext);
         mmkvStorage = new MMKVStorage(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "AppModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getVersion() {
        return mDeviceInfo.getAppVersion();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getBuildNumber() {
        return mDeviceInfo.getBuildNumber();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getAppName() {
        return mDeviceInfo.getAppName();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getDeviceId() {
        return mDeviceInfo.getDeviceId();
    }

    @ReactMethod
    public void clearCache() {
        mFileManager.clearCache();
    }

    @ReactMethod
    public void fixRotation(final String path, final int newWidth,
                            final int newHeight, final Callback successCb,
                            final Callback failureCb) {
        new GuardedAsyncTask<Void, Void>(getReactApplicationContext()) {
            @Override
            protected void doInBackgroundGuarded(Void... voids) {
                try {
                    mImageResizer.createResizedImageWithExceptions(path, newWidth, newHeight, successCb, failureCb);
                } catch (IOException ex) {
                    failureCb.invoke(ex.getMessage());
                }
            }
        }.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }
    @ReactMethod
    public void clearNotification() {
        mNotificationHelper.clearNotification();
    }

    @ReactMethod
    public void deleteChannel(String channelId) {
        mNotificationHelper.deleteChannel(channelId);
    }

    @ReactMethod
    public void checkChannelExist(String channelId, Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = mNotificationHelper.getChannelById(channelId);
            promise.resolve(channel != null);
        }
        promise.resolve(false);
    }

    @ReactMethod
    public void createChannel(ReadableMap channelInfo, Promise promise) {
        boolean created = mNotificationHelper.createChannel(channelInfo);
        promise.resolve(created);
    }
    
    @ReactMethod
    public void mmkvSetString(String keyName, String value, String keyId, String cryptKey, Promise promise) {
        mmkvStorage.setValue(keyName, value, keyId, cryptKey);
        promise.resolve(true);
    }

    @ReactMethod
    public void mmkvSetNumber(String keyName, double value, String keyId, String cryptKey, Promise promise) {
        mmkvStorage.setValue(keyName, value, keyId, cryptKey);
        promise.resolve(true);
    }

    @ReactMethod
    public void mmkvSetBoolean(String keyName, boolean value, String keyId, String cryptKey, Promise promise) {
        mmkvStorage.setValue(keyName, value, keyId, cryptKey);
        promise.resolve(true);
    }

    @ReactMethod
    public void mmkvGetString(String keyName, String keyId, String cryptKey, Promise promise) {
        String res = mmkvStorage.getString(keyName, keyId, cryptKey);
        promise.resolve(res);
    }

    @ReactMethod
    public void mmkvGetNumber(String keyName, String keyId, String cryptKey, Promise promise) {
        double res = mmkvStorage.getDouble(keyName, keyId, cryptKey);
        promise.resolve(res);
    }

    @ReactMethod
    public void mmkvGetBoolean(String keyName, String keyId, String cryptKey, Promise promise) {
        boolean res = mmkvStorage.getSBoolean(keyName, keyId, cryptKey);
        promise.resolve(res);
    }

    @ReactMethod
    public void mmkvGetAllKeys(String keyId, String cryptKey, Promise promise) {
        String[] listKeys = mmkvStorage.getAllKeys(keyId, cryptKey);

        WritableArray promiseArray = Arguments.createArray();
        if (listKeys == null) {
            promise.resolve(promiseArray);
            return;
        }
        for (int i = 0; i < listKeys.length; i++) {
            promiseArray.pushString(listKeys[i]);
        }
        promise.resolve(promiseArray);
    }

    @ReactMethod
    public void mmkvDelete(String keyName, String keyId, String cryptKey, Promise promise) {
        mmkvStorage.delete(keyName, keyId, cryptKey);
        promise.resolve(true);
    }

    @ReactMethod
    public void mmkvClearAll(String keyId, String cryptKey, Promise promise) {
        mmkvStorage.clearAll(keyId, cryptKey);
        promise.resolve(true);
    }
}
