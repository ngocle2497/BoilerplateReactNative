package com.helloworld.AppModule;

import static android.provider.Settings.System.getString;

import android.app.NotificationChannel;
import android.os.AsyncTask;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;

import java.io.IOException;

@ReactModule(name = AppModuleModule.NAME)
public class AppModule extends ReactContextBaseJavaModule {
  public static final String NAME = "AppModule";
  private final FileManager mFileManager;
  private final NotificationHelper mNotificationHelper;

  public AppModuleModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mFileManager = new FileManager(reactContext);
    mNotificationHelper = new NotificationHelper(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getDeviceId() {
    try {
      return getString(getReactApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID);
    } catch (Exception ex) {
      Log.d("Error getDeviceId", ex.getMessage());
      return "Unknown";
    }
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
  public void clearCache() {
    mFileManager.clearCache();
  }

  @ReactMethod
  public void fixImageRotation(final String path,  final Callback successCb,
                          final Callback failureCb) {
    new GuardedAsyncTask<Void, Void>(getReactApplicationContext()) {
      @Override
      protected void doInBackgroundGuarded(Void... voids) {
        try {
          mFileManager.createResizedImageWithExceptions(path,  successCb, failureCb);
        } catch (IOException ex) {
          failureCb.invoke(ex.getMessage());
        }
      }
    }.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
  }

  @ReactMethod
  public void setBadges(Double count) {
    // IOS only
  }

  @ReactMethod
  public void setIQKeyboardOption(ReadableMap channelInfo) {
    // IOS only
  }
}
