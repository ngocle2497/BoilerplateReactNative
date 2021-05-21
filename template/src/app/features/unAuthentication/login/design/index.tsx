import {
  ActionSheet,
  ActionSheetRef,
  Block,
  Button,
  CheckBox,
  Divider,
  DropDown,
  FAB,
  HelperText,
  LightBox,
  ModalAppMode,
  ModalAppModeRef,
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
  Wallpaper
} from '@components';
import { FormLoginType } from '@model/login';
import React, { memo, useCallback, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Alert } from 'react-native';
import { FormLogin } from './components/FormLogin';


const LoginComponent = () => {
  // state
  const _modalMode = useRef<ModalAppModeRef>();
  const _refAction = useRef<ActionSheetRef>();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedRadio, setSelectedRadio] = useState<boolean>(false);
  const [progress] = useState(10);
  const [sliderProgress, setSliderProgress] = useState<number>(0);
  const [sliderRangeProgress, setSliderRangeProgress] = useState<{
    lower: number;
    upper: number;
  }>({lower: 0, upper: 0});

  // function
  const onSubmit = useCallback((data: FormLoginType) => {
    Alert.alert(JSON.stringify(data));
  }, []);

  const _onShowAction = useCallback(() => {
    if (_refAction.current) {
      _refAction.current.show();
    }
  }, []);

  // render
  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      <Wallpaper />
      <ModalAppMode ref={_modalMode} />

      <Screen
        style={{paddingVertical: 0, paddingHorizontal: 10}}
        scroll={true}
        backgroundColor={'transparent'}>
        <FormLogin onSubmit={onSubmit} />
        <Block width={150} height={150}>
          <LightBox source={{uri: 'https://picsum.photos/id/11/400/400'}} />
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
            option={[{text: 'Option1'}, {text: 'Option2'}]}
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
              {label: 'Option1', value: 1},
              {label: 'Option2', value: 2},
            ]}
          />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Select</Text>
          <Spacer width={10} />
          <Select data={[{text: 'Option1'}, {text: 'Option2'}]} />
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
          <RadioButton value={selectedRadio} onToggle={setSelectedRadio} />
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
          <TextField label={'Flat'} typeInput={'flat'} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TextField Outline</Text>
          <Spacer width={10} />
          <TextField typeInput={'outline'} label={'Outline'} />
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
      <FAB
        label="Float"
        type={'group'}
        actions={[
          {icon: 'app_dev', label: 'Icon1'},
          {icon: 'app_prod', label: 'Icon2'},
          {icon: 'app_test', label: 'Icon3'},
        ]}
      />
    </Block>
  );
};
export const Login = memo(LoginComponent, isEqual);
