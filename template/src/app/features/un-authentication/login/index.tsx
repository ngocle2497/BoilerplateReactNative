import React, { memo, useRef, useState } from 'react';
import { Alert } from 'react-native';

import isEqual from 'react-fast-compare';

import { dispatch } from '@common';
import {
  ActionSheet,
  Block,
  Button,
  CheckBox,
  Divider,
  DropDown,
  HelperText,
  LightBox,
  Otp,
  Progress,
  RadioButton,
  Screen,
  Select,
  Slider,
  Spacer,
  Switch,
  Text,
  TextField,
  TouchableScale,
  Wallpaper,
} from '@components';
import { useAnimatedState } from '@hooks';
import { FormLoginType } from '@model/authentication';
import { appActions } from '@redux-slice';

import { FormLogin } from './components/form-login';

const LoginComponent = () => {
  // state
  const _refAction = useRef<ActionSheet>();
  const [visible, setVisible] = useAnimatedState<boolean>(false);
  const [progress] = useState(10);
  const [sliderProgress, setSliderProgress] = useState<number>(0);
  const [sliderRangeProgress, setSliderRangeProgress] = useState<{
    lower: number;
    upper: number;
  }>({ lower: 0, upper: 0 });

  // function
  const onSubmit = (data: FormLoginType) => {
    dispatch(appActions.setAppTheme('dark'));
    Alert.alert(JSON.stringify(data));
  };

  const _onShowAction = async () => {
    _refAction.current?.show();
  };

  // render
  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      <Wallpaper />

      <Screen
        bottomInsetColor="transparent"
        scroll
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>
        <FormLogin onSubmit={onSubmit} />
        <Block block height={150}>
          <LightBox
            source={{
              uri: 'https://images.unsplash.com/photo-1650704098443-241484a53bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
            }}
          />
        </Block>

        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Action Sheet</Text>
          <Spacer width={10} />
          <Button onPress={_onShowAction}>
            <Text>Show Action</Text>
          </Button>
          <ActionSheet
            ref={_refAction}
            title={'Select'}
            option={[{ text: 'Option1' }, { text: 'Option2' }]}
          />
        </Block>
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
          <Text>Slider Linear</Text>
          <Spacer width={10} />
          <Block block>
            <Text>{sliderProgress}</Text>
            <Slider type={'linear'} onChangeLinear={setSliderProgress} />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Slider Range</Text>
          <Spacer width={10} />
          <Block block>
            <Text>
              {sliderRangeProgress.lower} - {sliderRangeProgress.upper}
            </Text>
            <Spacer height={20} />
            <Slider
              type={'range'}
              onChangeRange={setSliderRangeProgress}
              initialRange={[0, 50]}
            />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TextField Flat</Text>
          <Spacer width={10} />
          <Block block>
            <TextField label={'Flat'} typeInput={'flat'} />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TextField Outline</Text>
          <Spacer width={10} />
          <Block block>
            <TextField typeInput={'outline'} label={'Outline'} />
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
        <Spacer height={10} />
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Switch IOS</Text>
          <Spacer width={10} />
          <Switch />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Switch Android</Text>
          <Spacer width={10} />
          <Switch type={'android'} />
        </Block>
      </Screen>
    </Block>
  );
};
export const Login = memo(LoginComponent, isEqual);
