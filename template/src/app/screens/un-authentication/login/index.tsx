import React, { useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  ViewProps,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { OutlineButton } from '@components/button/outline-button';
import { PrimaryButton } from '@components/button/primary-button';
import { SecondaryButton } from '@components/button/secondary-button';
import { Checkbox } from '@components/checkbox';
import { Divider } from '@components/divider';
import { RadioButton } from '@components/radio-button';
import { Screen } from '@components/screen';
import { Tabs } from '@components/tabs';
import { AnimatedView, Text, View } from '@rn-core';
import {
  Canvas,
  Circle,
  Image,
  ImageShader,
  makeImageFromView,
  SkImage,
} from '@shopify/react-native-skia';
import { createStyleSheet, useStyles } from '@theme';
import { darkTheme } from '@theme/dark';
import { lightTheme } from '@theme/light';
import { save } from '@utils/storage';

const wait = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

export const Login = () => {
  // state
  const { width, height } = useWindowDimensions();

  const r = useSharedValue(0);

  const opacity = useSharedValue(0);

  const image1 = useSharedValue<SkImage | null>(null);

  const image2 = useSharedValue<SkImage | null>(null);

  const rootRef = useRef<View>(null);

  const { styles, theme } = useStyles(styleSheet);

  // func
  const updateStatusBar = (prevType: string) => {
    console.log({ prevType });

    StatusBar.setBarStyle(
      prevType !== 'dark' ? 'light-content' : 'dark-content',
    );
  };

  const handleChangeTheme = async () => {
    opacity.value = 1;

    const overlay1 = await makeImageFromView(rootRef);

    image1.value = overlay1;

    await wait(100);

    save('APP_THEME', theme.type === 'dark' ? lightTheme : darkTheme);

    await wait(200);

    const overlay2 = await makeImageFromView(rootRef);

    image2.value = overlay2;

    await wait(100);

    r.value = withTiming(height * 1.1, { duration: 1000 }, f => {
      if (f) {
        runOnJS(updateStatusBar)(theme.type);

        opacity.value = 0;

        r.value = 0;

        image2.value = null;

        image1.value = null;
      }
    });
  };

  // props
  const canvasProps = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: opacity.value === 1 ? 'auto' : 'none',
  }));

  const canvasStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // render
  return (
    <>
      <View ref={rootRef} style={styles.root}>
        <LinearGradient
          style={StyleSheet.absoluteFillObject}
          colors={['rgba(255,255,255,.2)', 'rgba(255,255,255,.1)']}
        />
        <Screen
          bottomInsetColor="transparent"
          scroll
          statusBarStyle="dark-content"
          style={{ paddingVertical: 0, paddingHorizontal: 10 }}
          backgroundColor={'transparent'}>
          <View style={styles.rowItem}>
            <Text style={styles.text}>Divider</Text>
            <Divider />
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.text}>Radio Button</Text>
            <RadioButton initialValue={true} disabled />
            <RadioButton />
          </View>
          <View style={styles.colItem}>
            <Text style={styles.text}>Tabs</Text>
            <Tabs
              tabs={[
                { key: '1', title: 'tabs:tab1' },
                { key: '2', title: 'tabs:tab2' },
                { key: '3', title: 'tabs:tab3' },
                { key: '4', title: 'tabs:tab4' },
              ]}
            />
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.text}>Checkbox</Text>
            <Checkbox initialValue={true} disabled />
            <Checkbox />
          </View>
          <View style={styles.colItem}>
            <Text style={styles.text}>Primary Button</Text>
            <PrimaryButton
              onPress={handleChangeTheme}
              text="Button change theme"
            />
            <PrimaryButton disabled text="Button" />
            <PrimaryButton leftIcon="chevron_left" text="Button" />
            <PrimaryButton disabled leftIcon="chevron_left" text="Button" />
            <PrimaryButton rightIcon="chevron_left" text="Button" />
            <PrimaryButton disabled rightIcon="chevron_left" text="Button" />
          </View>
          <View style={styles.colItem}>
            <Text style={styles.text}>Secondary Button</Text>
            <SecondaryButton text="Button" />
            <SecondaryButton disabled text="Button" />
            <SecondaryButton leftIcon="chevron_left" text="Button" />
            <SecondaryButton disabled leftIcon="chevron_left" text="Button" />
            <SecondaryButton rightIcon="chevron_left" text="Button" />
            <SecondaryButton disabled rightIcon="chevron_left" text="Button" />
          </View>
          <View style={styles.colItem}>
            <Text style={styles.text}>Outline Button</Text>
            <OutlineButton text="Button" />
            <OutlineButton disabled text="Button" />
            <OutlineButton leftIcon="chevron_left" text="Button" />
            <OutlineButton disabled leftIcon="chevron_left" text="Button" />
            <OutlineButton rightIcon="chevron_left" text="Button" />
            <OutlineButton disabled rightIcon="chevron_left" text="Button" />
          </View>
        </Screen>
      </View>
      <AnimatedView
        style={[StyleSheet.absoluteFillObject, canvasStyle]}
        animatedProps={canvasProps}>
        <Canvas style={[StyleSheet.absoluteFillObject]}>
          <Image width={width} height={height} image={image1} />

          <Circle c={{ x: width / 2, y: height }} r={r}>
            <ImageShader
              key={String.prototype.randomUniqueId()}
              width={width}
              height={height}
              image={image2}
              fit={'cover'}
            />
          </Circle>
        </Canvas>
      </AnimatedView>
    </>
  );
};

const styleSheet = createStyleSheet(theme => ({
  text: {
    ...theme.textPresets.label,
    color: theme.color.neutral500,
  },
  root: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 15,
    backgroundColor: theme.color.background,
  },
  rowItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    columnGap: 8,
  },
  colItem: {
    paddingVertical: 15,
    rowGap: 8,
    alignItems: 'flex-start',
  },
}));
