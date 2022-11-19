package com.helloworld.AppModule;;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

public class FileManager {
  private static final String SCHEME_CONTENT = "content";
  private static final String SCHEME_FILE = "file";
  private final Context context;

  public FileManager(ReactApplicationContext reactContext) {
    this.context = reactContext;
  }

  private void onDeleteRecursive(File fileOrDirectory) {
    if (fileOrDirectory.isDirectory()) {
      for (File child : fileOrDirectory.listFiles()) {
        onDeleteRecursive(child);
      }
    }
    boolean result = fileOrDirectory.delete();
    Log.d("Result Delete", String.valueOf(result));
  }

  public void clearCache() {
    try {
      File file = new File(context.getCacheDir().getAbsolutePath());
      if (file.exists()) {
        onDeleteRecursive(file);
      }
    } catch (Exception ex) {
      ex.printStackTrace();
    }
  }

  public void createResizedImageWithExceptions(String path, Callback
    successCb, Callback failureCb) throws IOException {
    Bitmap.CompressFormat compressFormat = Bitmap.CompressFormat.PNG;
    Uri imageUrl = Uri.parse(path);
    Bitmap image = createImage(imageUrl);
    // Save the resulting image
    File cachePath = this.context.getCacheDir();
    File resizedImage = saveImage(image, cachePath, UUID.randomUUID().toString(), compressFormat);
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

  private static File saveImage(Bitmap bitmap, File saveDirectory, String fileName,
                                Bitmap.CompressFormat compressFormat)
    throws IOException {
    if (bitmap == null) {
      throw new IOException("The bitmap couldn't be resized");
    }

    File newFile = new File(saveDirectory, fileName + "." + compressFormat.name());
    if (!newFile.createNewFile()) {
      throw new IOException("The file already exists");
    }

    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    bitmap.compress(compressFormat, 1, outputStream);
    byte[] bitmapData = outputStream.toByteArray();

    outputStream.flush();
    outputStream.close();

    FileOutputStream fos = new FileOutputStream(newFile);
    fos.write(bitmapData);
    fos.flush();
    fos.close();

    return newFile;
  }

  private Bitmap createImage(Uri imageUri) throws IOException {
    Bitmap sourceImage = null;
    String imageUriScheme = imageUri.getScheme();
    if (imageUriScheme == null ||
      imageUriScheme.equalsIgnoreCase(SCHEME_FILE) ||
      imageUriScheme.equalsIgnoreCase(SCHEME_CONTENT)
    ) {
      sourceImage = loadBitmap(imageUri);
    }
    if (sourceImage == null) {
      throw new IOException("Unable to load source image from path");
    }
    // Rotate if necessary. Rotate first because we will otherwise
    // get wrong dimensions if we want the new dimensions to be after rotation.
    // NOTE: This will "fix" the image using it's exif info if it is rotated as well.
    Bitmap rotatedImage;
    int orientation = getOrientation(context, imageUri);

    rotatedImage = rotateImage(sourceImage, orientation);

    if (rotatedImage == null) {
      throw new IOException("Unable to rotate image. Most likely due to not enough memory.");
    }

    if (rotatedImage != sourceImage) {
      sourceImage.recycle();
    }

    return rotatedImage;
  }

  private static Bitmap rotateImage(Bitmap source, float angle) {
    Bitmap retVal;

    Matrix matrix = new Matrix();
    matrix.postRotate(angle);
    try {
      retVal = Bitmap.createBitmap(source, 0, 0, source.getWidth(), source.getHeight(), matrix, true);
    } catch (OutOfMemoryError e) {
      return null;
    }
    return retVal;
  }

  private static int getOrientation(Context context, Uri uri) {
    try {
      // ExifInterface(InputStream) only exists since Android N (r24)
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        InputStream input = context.getContentResolver().openInputStream(uri);
        ExifInterface ei = new ExifInterface(input);
        return getOrientation(ei);
      }
      File file = getFileFromUri(context, uri);
      if (file.exists()) {
        ExifInterface ei = new ExifInterface(file.getAbsolutePath());
        return getOrientation(ei);
      }
    } catch (Exception ignored) {
    }

    return 0;
  }

  private static File getFileFromUri(Context context, Uri uri) {
    // first try by direct path
    File file = new File(uri.getPath());
    if (file.exists()) {
      return file;
    }
    // try reading real path from content resolver (gallery images)
    Cursor cursor = null;
    try {
      String[] proj = {MediaStore.Images.Media.DATA};
      cursor = context.getContentResolver().query(uri, proj, null, null, null);
      int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
      cursor.moveToFirst();
      String realPath = cursor.getString(column_index);
      file = new File(realPath);
    } catch (Exception ignored) {
    } finally {
      if (cursor != null) {
        cursor.close();
      }
    }

    return file;
  }

  private static int getOrientation(ExifInterface exif) {
    int orientation = exif.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);
    switch (orientation) {
      case ExifInterface.ORIENTATION_ROTATE_90:
        return 90;
      case ExifInterface.ORIENTATION_ROTATE_180:
        return 180;
      case ExifInterface.ORIENTATION_ROTATE_270:
        return 270;
      default:
        return 0;
    }
  }

  private Bitmap loadBitmap(Uri imageUri) throws IOException {
    Bitmap sourceImage = null;
    String imageUriScheme = imageUri.getScheme();
    if (imageUriScheme == null || !imageUriScheme.equalsIgnoreCase(SCHEME_CONTENT)) {
      try {
        sourceImage = BitmapFactory.decodeFile(imageUri.getPath());
      } catch (Exception e) {
        e.printStackTrace();
        throw new IOException("Error decoding image file");
      }
    } else {
      ContentResolver cr = this.context.getContentResolver();
      InputStream input = cr.openInputStream(imageUri);
      if (input != null) {
        sourceImage = BitmapFactory.decodeStream(input);
        input.close();
      }
    }
    return sourceImage;
  }
}
