import { createStyleSheet } from '@theme';

export const primaryButtonStyleSheet = createStyleSheet(
  ({ color, textPresets }) => ({
    normal: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      borderRadius: 8,
      overflow: 'hidden',
      padding: 12,
    },
    small: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      borderRadius: 8,
      overflow: 'hidden',
      padding: 10,
    },
    extraSmall: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      borderRadius: 8,
      overflow: 'hidden',
      padding: 8,
    },
    text_normal: { ...textPresets.CTAs },
    text_small: { ...textPresets.CTASmall },
    text_extraSmall: { ...textPresets.extraSmall },
    textColor: (disabled?: boolean) => ({
      color: disabled ? color.neutral200 : color.neutral50,
    }),
  }),
);

export const secondaryButtonStyleSheet = createStyleSheet(
  ({ color, textPresets }) => ({
    normal: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      borderRadius: 8,
      overflow: 'hidden',
      padding: 12,
    },
    small: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      borderRadius: 8,
      overflow: 'hidden',
      padding: 10,
    },
    extraSmall: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      borderRadius: 8,
      overflow: 'hidden',
      padding: 8,
    },
    text_normal: { ...textPresets.CTAs },
    text_small: { ...textPresets.CTASmall },
    text_extraSmall: { ...textPresets.extraSmall },
    textColor: (disabled?: boolean) => ({
      color: disabled ? color.neutral200 : color.primary500,
    }),
  }),
);

export const outlineButtonStyleSheet = createStyleSheet(
  ({ color, textPresets }) => ({
    normal: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      padding: 12,
    },
    small: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      padding: 10,
    },
    extraSmall: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      padding: 8,
    },
    buttonColor: (disabled?: boolean) => ({
      backgroundColor: disabled ? color.neutral200 : color.neutral50,
      borderColor: disabled ? color.neutral200 : color.primary500,
    }),
    text_normal: { ...textPresets.CTAs },
    text_small: { ...textPresets.CTASmall },
    text_extraSmall: { ...textPresets.extraSmall },
  }),
);
