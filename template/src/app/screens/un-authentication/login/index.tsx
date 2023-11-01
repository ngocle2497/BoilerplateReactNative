import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { CheckBox } from '@components/check-box';
import { Text, View } from '@components/core';
import { Divider } from '@components/divider';
import { DropDown } from '@components/drop-down';
import { HelperText } from '@components/helper-text';
import { Otp } from '@components/otp';
import { Progress } from '@components/progress';
import { RadioButton } from '@components/radio-button';
import { Screen } from '@components/screen';
import { Select } from '@components/select';
import { Spacer } from '@components/spacer';
import { TextInput } from '@components/text-input';
import { TouchableScale } from '@components/touch-scale';
import { Wallpaper } from '@components/wallpaper';
import { FormLoginType } from '@model/authentication';

import { FormLogin } from './components/form-login';

export const Login = () => {
  // state
  const [visible, setVisible] = useState(false);

  const [progress] = useState(10);

  // function
  const handleSubmit = (data: FormLoginType) => {
    Alert.alert(JSON.stringify(data));
  };

  // render
  return (
    <View style={styles.root}>
      <Wallpaper />
      <LinearGradient
        style={StyleSheet.absoluteFillObject}
        colors={['rgba(255,255,255,.2)', 'rgba(255,255,255,.1)']}
      />
      <Screen
        bottomInsetColor="transparent"
        scroll
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>
        <FormLogin onSubmit={handleSubmit} />
        <View style={styles.rowItem}>
          <Text>Check box</Text>
          <Spacer width={10} />
          <CheckBox onToggle={setVisible} />
        </View>
        <View style={styles.rowItem}>
          <Text>OTP</Text>
          <Spacer width={10} />
          <Otp length={5} />
        </View>
        <View style={styles.rowItem}>
          <Text>DropDown</Text>
          <Spacer width={10} />
          <DropDown
            data={[
              { label: 'Option1', value: 1 },
              { label: 'Option2', value: 2 },
            ]}
          />
        </View>
        <View style={styles.rowItem}>
          <Text>Select</Text>
          <Spacer width={10} />
          <Select data={[{ text: 'Option1' }, { text: 'Option2' }]} />
        </View>
        <View style={styles.rowItem}>
          <Text>Helper text</Text>
          <Spacer width={10} />
          <View>
            <HelperText visible={visible} msg={'Helper text'} type={'error'} />
            <HelperText visible={visible} msg={'Helper text'} type={'info'} />
          </View>
        </View>
        <View style={styles.rowItem}>
          <Text>Divider</Text>
          <Spacer width={10} />
          <Divider />
        </View>
        <View style={styles.rowItem}>
          <Text>Progress Circle</Text>
          <Spacer width={10} />
          <Progress type={'circle'} progress={progress} />
        </View>
        <View style={styles.rowItem}>
          <Text>Progress Line</Text>
          <Spacer width={10} />
          <Progress type={'linear'} progress={progress} />
        </View>
        <View style={styles.rowItem}>
          <Text>Radio Button</Text>
          <Spacer width={10} />
          <RadioButton />
        </View>
        <View style={styles.rowItem}>
          <Text>TextInput</Text>
          <Spacer width={10} />
          <View style={styles.fill}>
            <TextInput label={'TextInput'} />
          </View>
        </View>
        <Spacer height={10} />
        <View style={styles.rowItem}>
          <Text>TouchableScale</Text>
          <Spacer width={10} />
          <TouchableScale>
            <View style={styles.buttonScale}>
              <Text>Press me!</Text>
            </View>
          </TouchableScale>
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonScale: {
    padding: 5,
    backgroundColor: '#bbb',
  },
  root: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 15,
  },
  fill: {
    flex: 1,
  },
  rowItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
});
