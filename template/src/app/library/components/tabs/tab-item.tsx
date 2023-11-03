import React from 'react';

import { useAnimatedStyle } from 'react-native-reanimated';

import { DefaultButton } from '@components/button/default-button';
import { useTranslation } from '@hooks';
import { AnimatedText, AnimatedView, View } from '@rn-core';
import { createStyleSheet, useStyles } from '@theme';

import { TabItemProps } from './type';

export const TabItem = ({ tab, index, selectedIndex }: TabItemProps) => {
  // state
  const { styles, theme } = useStyles(styleSheet);

  const t = useTranslation();

  // func
  const handlePress = () => {
    if (selectedIndex.value === index) {
      return;
    }

    selectedIndex.value = index;
  };

  // style
  const underlineStyle = useAnimatedStyle(() => ({
    opacity: selectedIndex.value === index ? 1 : 0,
  }));

  const textStyle = useAnimatedStyle(() => ({
    color:
      selectedIndex.value === index
        ? theme.color.neutral500
        : theme.color.neutral300,
  }));

  // render
  return (
    <View style={styles.container}>
      <DefaultButton onPress={handlePress}>
        <View style={styles.button}>
          <AnimatedText style={[theme.textPresets.CTAs, textStyle]}>
            {t(tab.title)}
          </AnimatedText>
        </View>
      </DefaultButton>
      <AnimatedView pointerEvents="none" style={styles.underlineOverlay} />
      <AnimatedView
        pointerEvents="none"
        style={[styles.underline, underlineStyle]}
      />
    </View>
  );
};

const styleSheet = createStyleSheet(theme => ({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.color.primary500,
    zIndex: 99,
  },
  underlineOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.color.primary50,
    zIndex: 9,
  },
}));
