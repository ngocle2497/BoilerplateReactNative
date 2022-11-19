package com.helloworld.AppModule;;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;

import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

public class NotificationHelper {
  private final Context context;
  private static final long DEFAULT_VIBRATION = 300L;

  public NotificationHelper(ReactApplicationContext context) {
    this.context = context;
  }

  public void clearNotification() {
    NotificationManagerCompat.from(context).cancelAll();
  }

  public NotificationChannel getChannelById(String channelId) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
      return null;
    }
    NotificationManager manager = notificationManager();
    if (manager == null) {
      return null;
    }
    return manager.getNotificationChannel(channelId);
  }

  public void deleteChannel(String channelId) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O)
      return;
    NotificationManager manager = notificationManager();
    if (manager == null) {
      return;
    }
    manager.deleteNotificationChannel(channelId);
  }

  public boolean createChannel(ReadableMap channelInfo) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O)
      return false;

    String channelId = channelInfo.getString("channelId");
    String channelName = channelInfo.getString("channelName");
    String channelDescription = channelInfo.hasKey("channelDescription") ? channelInfo.getString("channelDescription") : "";
    boolean playSound = !channelInfo.hasKey("playSound") || channelInfo.getBoolean("playSound");
    String soundName = channelInfo.hasKey("soundName") ? channelInfo.getString("soundName") : "default";
    int importance = channelInfo.hasKey("importance") ? channelInfo.getInt("importance") : 4;
    boolean vibrate = channelInfo.hasKey("vibrate") && channelInfo.getBoolean("vibrate");
    long[] vibratePattern = vibrate ? new long[]{0, DEFAULT_VIBRATION} : null;

    NotificationManager manager = notificationManager();

    Uri soundUri = playSound ? getSoundUri(soundName) : null;

    return checkOrCreateChannel(manager, channelId, channelName, channelDescription, soundUri, importance, vibratePattern);
  }

  private boolean checkOrCreateChannel(NotificationManager manager, String channelId,
                                       String channelName, String channelDescription,
                                       Uri soundUri, int importance, long[] vibratePattern) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O)
      return false;
    if (manager == null)
      return false;

    NotificationChannel channel = manager.getNotificationChannel(channelId);

    if (
      channel == null && channelName != null && channelDescription != null ||
        channel != null &&
          (
            channelName != null && !channelName.equals(channel.getName()) ||
              channelDescription != null && !channelDescription.equals(channel.getDescription())
          )
    ) {
      // If channel doesn't exist create a new one.
      // If channel name or description is updated then update the existing channel.
      channel = new NotificationChannel(channelId, channelName, importance);

      channel.setDescription(channelDescription);
      channel.enableLights(true);
      channel.enableVibration(vibratePattern != null);
      channel.setVibrationPattern(vibratePattern);

      if (soundUri != null) {
        AudioAttributes audioAttributes = new AudioAttributes.Builder()
          .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
          .setUsage(AudioAttributes.USAGE_NOTIFICATION)
          .build();

        channel.setSound(soundUri, audioAttributes);
      } else {
        channel.setSound(null, null);
      }

      manager.createNotificationChannel(channel);

      return true;
    }

    return false;
  }

  private Uri getSoundUri(String soundName) {
    if (soundName == null || "default".equalsIgnoreCase(soundName)) {
      return RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
    } else {

      // sound name can be full filename, or just the resource name.
      // So the strings 'my_sound.mp3' AND 'my_sound' are accepted
      // The reason is to make the iOS and android javascript interfaces compatible

      int resId;
      if (context.getResources().getIdentifier(soundName, "raw", context.getPackageName()) != 0) {
        resId = context.getResources().getIdentifier(soundName, "raw", context.getPackageName());
      } else {
        soundName = soundName.substring(0, soundName.lastIndexOf('.'));
        resId = context.getResources().getIdentifier(soundName, "raw", context.getPackageName());
      }

      return Uri.parse("android.resource://" + context.getPackageName() + "/" + resId);
    }
  }

  private NotificationManager notificationManager() {
    return (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
  }
}
