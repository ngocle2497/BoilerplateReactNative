package com.helloworld.AppModule;

import android.content.ContentResolver;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.net.Uri;
import android.provider.MediaStore;

import com.facebook.react.bridge.ReactApplicationContext;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class ImageResizer {
    private final static String SCHEME_CONTENT = "content";
    private final static String SCHEME_FILE = "file";

    public static Bitmap createImage(ReactApplicationContext context, Uri imageUri, int newWidth, int newHeight) throws IOException {
        Bitmap sourceImage = null;
        String imageUriScheme = imageUri.getScheme();
        if (imageUriScheme == null ||
                imageUriScheme.equalsIgnoreCase(SCHEME_FILE) ||
                imageUriScheme.equalsIgnoreCase(SCHEME_CONTENT)
        ) {
            sourceImage = ImageResizer.loadBitmapFromFile(context, imageUri, newWidth, newHeight);
        }
        if (sourceImage == null) {
            throw new IOException("Unable to load source image from path");
        }
        // Rotate if necessary. Rotate first because we will otherwise
        // get wrong dimensions if we want the new dimensions to be after rotation.
        // NOTE: This will "fix" the image using it's exif info if it is rotated as well.
        Bitmap rotatedImage;
        int orientation = getOrientation(context, imageUri);

        rotatedImage = ImageResizer.rotateImage(sourceImage, orientation);

        if (rotatedImage == null) {
            throw new IOException("Unable to rotate image. Most likely due to not enough memory.");
        }


        if (rotatedImage != sourceImage) {
            sourceImage.recycle();
        }

        return rotatedImage;
    }

    /**
     * Rotate the specified bitmap with the given angle, in degrees.
     */
    public static Bitmap rotateImage(Bitmap source, float angle) {
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

    /**
     * Get orientation by reading Image metadata
     */
    public static int getOrientation(ReactApplicationContext context, Uri uri) {
        try {
            File file = getFileFromUri(context, uri);
            if (file.exists()) {
                ExifInterface ei = new ExifInterface(file.getAbsolutePath());
                return getOrientation(ei);
            }
        } catch (Exception ignored) {
        }

        return 0;
    }

    /**
     * Convert metadata to degrees
     */
    public static int getOrientation(ExifInterface exif) {
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

    private static File getFileFromUri(ReactApplicationContext context, Uri uri) {

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

    private static Bitmap loadBitmapFromFile(ReactApplicationContext reactContext, Uri imageUri, int newWidth, int newHeight) throws IOException {
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        loadBitmap(reactContext, imageUri, options);

        // Set a sample size according to the image size to lower memory usage.
        options.inSampleSize = calculateInSampleSize(options, newWidth, newHeight);
        options.inJustDecodeBounds = false;
        //System.out.println(options.inSampleSize);
        return loadBitmap(reactContext, imageUri, options);
    }

    private static int calculateInSampleSize(BitmapFactory.Options options, int newWidth, int newHeight) {
        final int height = options.outHeight;
        final int width = options.outWidth;

        int inSampleSize = 1;

        if (height > newWidth || width > newHeight) {
            final int halfHeight = height / 2;
            final int halfWidth = width / 2;

            // Calculate the largest inSampleSize value that is a power of 2 and keeps both
            // height and width larger than the requested height and width.
            while ((halfHeight / inSampleSize) >= newHeight && (halfWidth / inSampleSize) >= newWidth) {
                inSampleSize *= 2;
            }
        }

        return inSampleSize;
    }

    private static Bitmap loadBitmap(ReactApplicationContext reactContext, Uri imageUri, BitmapFactory.Options options) throws IOException {
        Bitmap sourceImage = null;
        String imageUriScheme = imageUri.getScheme();
        if (imageUriScheme == null || !imageUriScheme.equalsIgnoreCase(SCHEME_CONTENT)) {
            try {
                sourceImage = BitmapFactory.decodeFile(imageUri.getPath(), options);
            } catch (Exception e) {
                e.printStackTrace();
                throw new IOException("Error decoding image file");
            }
        } else {
            ContentResolver cr = reactContext.getContentResolver();
            InputStream input = cr.openInputStream(imageUri);
            if (input != null) {
                sourceImage = BitmapFactory.decodeStream(input, null, options);
                input.close();
            }
        }
        return sourceImage;
    }

    public static File saveImage(Bitmap bitmap, File saveDirectory, String fileName, Bitmap.CompressFormat compressFormat) throws IOException {
        if (bitmap == null) {
            throw new IOException("The bitmap couldn't be resized");
        }

        File newFile = new File(saveDirectory, fileName + "." + compressFormat.name());
        if (!newFile.createNewFile()) {
            throw new IOException("The file already exists");
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        bitmap.compress(compressFormat,100,outputStream);
        byte[] bitmapData = outputStream.toByteArray();

        outputStream.flush();
        outputStream.close();

        FileOutputStream fos = new FileOutputStream(newFile);
        fos.write(bitmapData);
        fos.flush();
        fos.close();

        return newFile;
    }
}
