// dimensions
// colors
export const ON_COLOR = '#34C759';

export const ON_TRACK_COLOR = 'rgba(52, 199, 89, 0.4)';

export const OFF_TRACK_COLOR = 'rgba(0, 0, 0, 0.3)';

export const OFF_COLOR = '#e6e6e6';

export const BORDER_OFF_COLOR = 'rgba(0, 0, 0, 0.05)';

export const SHADOW_COLOR = 'rgba(0, 0, 0, 0.3)';

// ios
export const TRACK_WIDTH_IOS = 32;

export const THUMB_SIZE_IOS = 20;

export const PADDING_IOS = 1;

export const TRACK_HEIGHT_IOS = THUMB_SIZE_IOS + PADDING_IOS * 2;

export const OFF_POSITION_IOS = PADDING_IOS;

export const ON_POSITION_IOS = TRACK_WIDTH_IOS - THUMB_SIZE_IOS - PADDING_IOS;

export const BORDER_RADIUS_IOS = (THUMB_SIZE_IOS * 3) / 4;

// android
export const TRACK_WIDTH_ANDROID = 28;

export const TRACK_HEIGHT_ANDROID = 16;

export const THUMB_SIZE_ANDROID = 20;

export const OFF_POSITION_ANDROID = -THUMB_SIZE_ANDROID / 3;

export const ON_POSITION_ANDROID =
  TRACK_WIDTH_ANDROID - THUMB_SIZE_ANDROID * 0.75;

export const BORDER_RADIUS_ANDROID = (THUMB_SIZE_ANDROID * 3) / 4;
