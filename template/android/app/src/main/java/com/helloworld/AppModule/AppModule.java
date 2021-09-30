package com.helloworld.AppModule;

import static android.provider.Settings.Secure.getString;

import android.content.pm.PackageInfo;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.AsyncTask;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationManagerCompat;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

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

    @ReactMethod
    public void clearNotification() {
        NotificationManagerCompat.from(getReactApplicationContext()).cancelAll();
    }
    
    private void onDeleteRecursive(File fileOrDirectory) {
        if (fileOrDirectory.isDirectory()) {
            for (File child : fileOrDirectory.listFiles()) {
                onDeleteRecursive(child);
            }
        }
        Log.d("CLEAR","CACHE");
        fileOrDirectory.delete();
    }

    @ReactMethod
    public void clearCache() {
        try {
            File file = new File(getReactApplicationContext().getCacheDir().getAbsolutePath());
            if (file.exists()) {
                onDeleteRecursive(file);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @ReactMethod
    public void fixRotation(final String path, final int newWidth,
                            final int newHeight, final Callback successCb,
                            final Callback failureCb) {
        new GuardedAsyncTask<Void, Void>(getReactApplicationContext()) {
            @Override
            protected void doInBackgroundGuarded(Void... voids) {
                try {
                    createResizedImageWithExceptions(path, newWidth, newHeight, successCb, failureCb);
                } catch (IOException ex) {
                    failureCb.invoke(ex.getMessage());
                }
            }
        }.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
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

    private void createResizedImageWithExceptions(String path, int newWidth, int newHeight, Callback successCb, Callback failureCb) throws IOException {
        Bitmap.CompressFormat compressFormat = Bitmap.CompressFormat.PNG;
        Uri imageUrl = Uri.parse(path);
        Bitmap image = ImageResizer.createImage(this.reactContext, imageUrl, newWidth, newHeight);
        if (image == null) {
            throw new IOException("The image failed to be resized; invalid Bitmap result.");
        }
        // Save the resulting image
        File cachePath = reactContext.getCacheDir();
        File resizedImage = ImageResizer.saveImage(image, cachePath, UUID.randomUUID().toString(), compressFormat);
        // If resizedImagePath is empty and this wasn't caught earlier, throw.
        if (resizedImage.isFile()) {
            WritableMap response = Arguments.createMap();
            response.putString("uri", Uri.fromFile(resizedImage).toString());
            response.putString("name", resizedImage.getName());
            // Invoke success
            successCb.invoke(response);
        } else {
            failureCb.invoke("Error getting resized image path");
        }
        // Clean up bitmap
        image.recycle();
    }

}
