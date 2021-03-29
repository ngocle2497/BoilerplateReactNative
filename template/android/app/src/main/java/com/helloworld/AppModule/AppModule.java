package com.helloworld.AppModule;

import android.bluetooth.BluetoothAdapter;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.os.Handler;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import static android.provider.Settings.Secure.getString;

public class AppModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static String DefaultStringReturnType = "Unknown";
    final static String BT_STATUS_EVENT = "onUpdateBluetoothStatus";
    final static String BT_STATUS_PARAM = "status";
    final static String BT_STATUS_ON = "on";
    final static String BT_STATUS_OFF = "off";
    private BluetoothAdapter btAdapter;
    private final ReactApplicationContext reactContext;
    private final DeviceTypeResolver deviceTypeResolver;

    public AppModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        this.deviceTypeResolver = new DeviceTypeResolver(reactContext);
        reactContext.addLifecycleEventListener(this);
        btAdapter = BluetoothAdapter.getDefaultAdapter();
        registerBroadcastReceiver();
    }
    private final BroadcastReceiver receiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();
            WritableMap params = Arguments.createMap();
            if (action != null && action.equals(BluetoothAdapter.ACTION_STATE_CHANGED)) {
                final int state = intent.getIntExtra(BluetoothAdapter.EXTRA_STATE,
                        BluetoothAdapter.ERROR);
                switch (state) {
                    case BluetoothAdapter.STATE_OFF:
                        params.putString(BT_STATUS_PARAM, BT_STATUS_OFF);
                        sendEvent(reactContext, BT_STATUS_EVENT, params);
                        break;
                    case BluetoothAdapter.STATE_ON:
                        params.putString(BT_STATUS_PARAM, BT_STATUS_ON);
                        sendEvent(reactContext, BT_STATUS_EVENT, params);
                        break;
                }
            }
        }
    };
    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    private void registerBroadcastReceiver() {
        IntentFilter filter = new IntentFilter(BluetoothAdapter.ACTION_STATE_CHANGED);
        reactContext.registerReceiver(receiver, filter);
    }


    @NonNull
    @Override
    public String getName() {
        return "AppModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean getBluetoothState() {
        boolean isEnabled = false;
        if (btAdapter != null) {
            isEnabled = btAdapter.isEnabled();
        }
       return isEnabled;
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

    @Override
    public void onHostResume() {
        registerBroadcastReceiver();
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                String enabled = btAdapter != null && btAdapter.isEnabled() ? BT_STATUS_ON : BT_STATUS_OFF;
                params.putString(BT_STATUS_PARAM, enabled);
                sendEvent(reactContext, BT_STATUS_EVENT, params);

            }
        }, 10);
    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        reactContext.unregisterReceiver(receiver);
    }
}
