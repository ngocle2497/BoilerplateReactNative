import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
  Block,
  CheckBox,
  Divider,
  DropDown,
  HelperText,
  Otp,
  Progress,
  RadioButton,
  Screen,
  Select,
  Spacer,
  Text,
  TextInput,
  TouchableScale,
  Wallpaper,
} from '@components';
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
    <Block block paddingTop={0} paddingHorizontal={15}>
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
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Check box</Text>
          <Spacer width={10} />
          <CheckBox onToggle={setVisible} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>OTP</Text>
          <Spacer width={10} />
          <Otp length={5} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>DropDown</Text>
          <Spacer width={10} />
          <DropDown
            data={[
              { label: 'Option1', value: 1 },
              { label: 'Option2', value: 2 },
            ]}
          />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Select</Text>
          <Spacer width={10} />
          <Select data={[{ text: 'Option1' }, { text: 'Option2' }]} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Helper text</Text>
          <Spacer width={10} />
          <Block>
            <HelperText visible={visible} msg={'Helper text'} type={'error'} />
            <HelperText visible={visible} msg={'Helper text'} type={'info'} />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Divider</Text>
          <Spacer width={10} />
          <Divider />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Progress Circle</Text>
          <Spacer width={10} />
          <Progress type={'circle'} progress={progress} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Progress Line</Text>
          <Spacer width={10} />
          <Progress type={'linear'} progress={progress} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Radio Button</Text>
          <Spacer width={10} />
          <RadioButton />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TextInput</Text>
          <Spacer width={10} />
          <Block block>
            <TextInput label={'TextInput'} />
          </Block>
        </Block>
        <Spacer height={10} />
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TouchableScale</Text>
          <Spacer width={10} />
          <TouchableScale>
            <Block padding={5} color={'#bbb'}>
              <Text>Press me!</Text>
            </Block>
          </TouchableScale>
        </Block>
      </Screen>
    </Block>
  );
};
