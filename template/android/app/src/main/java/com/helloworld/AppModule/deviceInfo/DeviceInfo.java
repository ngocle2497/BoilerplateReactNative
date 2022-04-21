package com.helloworld.AppModule.deviceInfo;

import static android.provider.Settings.Secure.getString;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.provider.Settings;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;

public class DeviceInfo {
    private static String defaultStringReturnType = "Unknown";
    private Context context;

    public DeviceInfo(ReactApplicationContext reactContext) {
        this.context = reactContext;
    }

    public PackageInfo getPackageInfo() throws Exception {
        return context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
    }

    public String getAppVersion() {
        try {
            return getPackageInfo().versionName;
        } catch (Exception ex) {
            Log.d("Error getAppVersion", ex.getMessage());
            return defaultStringReturnType;
        }
    }

    public String getBuildNumber() {
        try {
            return Integer.toString(getPackageInfo().versionCode);
        } catch (Exception ex) {
            Log.d("Error getBuildNumber", ex.getMessage());
            return defaultStringReturnType;
        }
    }

    public String getAppName() {
        try {
            return context.getApplicationInfo().loadLabel(context.getPackageManager()).toString();
        } catch (Exception ex) {
            Log.d("Error getAppName", ex.getMessage());
            return defaultStringReturnType;
        }
    }

    public String getDeviceId() {
        try {
            return getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
        } catch (Exception ex) {
            Log.d("Error getDeviceId", ex.getMessage());
            return defaultStringReturnType;
        }
    }
}
