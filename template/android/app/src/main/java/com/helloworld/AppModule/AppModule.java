package com.helloworld.AppModule;


import android.content.pm.PackageInfo;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static android.provider.Settings.Secure.getString;

public class AppModule extends ReactContextBaseJavaModule {
    private static String DefaultStringReturnType = "Unknown";
    private final ReactApplicationContext reactContext;
    private final DeviceTypeResolver deviceTypeResolver;

    public AppModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        this.deviceTypeResolver = new DeviceTypeResolver(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "AppModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getVersion() {
        return _getAppVersion();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getBuildNumber() {
        return _getBuildNumber();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getAppName() {
        return _getAppName();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getDeviceId() {
        return _getDeviceId();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getDeviceType() {
        return deviceTypeResolver.getDeviceType().getValue();
    }

    private PackageInfo getPackageInfo() throws Exception {
        return getReactApplicationContext().getPackageManager().getPackageInfo(getReactApplicationContext().getPackageName(), 0);
    }

    private String _getAppVersion() {
        try {
            return getPackageInfo().versionName;
        } catch (Exception ex) {
            Log.d("Error", ex.getMessage());
            return DefaultStringReturnType;
        }
    }

    private String _getBuildNumber() {
        try {
            return Integer.toString(getPackageInfo().versionCode);
        } catch (Exception ex) {
            Log.d("Error", ex.getMessage());
            return DefaultStringReturnType;
        }
    }

    private String _getAppName() {
        try {
            return getReactApplicationContext().getApplicationInfo().loadLabel(getReactApplicationContext().getPackageManager()).toString();
        } catch (Exception ex) {
            Log.d("Error", ex.getMessage());
            return DefaultStringReturnType;
        }
    }

    private String _getDeviceId() {
        try {
            return getString(getReactApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID);
        } catch (Exception ex) {
            Log.d("Error", ex.getMessage());
            return DefaultStringReturnType;
        }
    }
}
