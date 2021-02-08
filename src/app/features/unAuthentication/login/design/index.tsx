import React, {useRef, memo, useState, useEffect, useCallback} from 'react';
import isEqual from 'react-fast-compare';
import {
  Wallpaper,
  Screen,
  ModalAppMode,
  ModalAppModeRef,
  Block,
  ActionSheet,
  CheckBox,
  DropDown,
  HelperText,
  Progress,
  RadioButton,
  Slider,
  TextField,
  TouchableScale,
  Text,
  Switch,
  SizeBox,
  Divider,
  Otp,
  Select,
  Button,
  ActionSheetRef,
  FAB,
  LightBox,
  ReModifyView,
  Presence,
} from '@components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {usePresence} from '@library/components/Presence/usePresence';
import {Pressable} from 'react-native';

type LoginProps = StackScreenProps<RootStackParamList, APP_SCREEN.LOGIN>;

const Anima = () => {
  return (
    <ReModifyView
      transition={{
        type: 'timing',
        translateX: {type: 'spring', mass: 1},
        translateY: {type: 'spring', mass: 1, delay: 150},
        opacity: {type: 'timing', duration: 1000},
      }}
      exit={{
        translateX: 0,
        translateY: 0,
        opacity: 0,
      }}
      from={{translateX: 0, translateY: 0, opacity: 0}}
      animate={{
        translateX: [{value: 50, type: 'spring', mass: 1}, 150],
        translateY: [{value: 50, type: 'decay', velocity: 50}, 150],
        opacity: 1,
      }}>
      <Block width={150} height={150} borderRadius={5} color={'#9b59b6'} />
    </ReModifyView>
  );
};

const LoginComponent = ({}: LoginProps) => {
  const _modalMode = useRef<ModalAppModeRef>();

  const _refAction = useRef<ActionSheetRef>();
  const [visible, setVisible] = useState<boolean>(true);
  const [selectedRadio, setSelectedRadio] = useState<boolean>(false);
  const [progress] = useState(10);
  const [sliderProgress, setSliderProgress] = useState<number>(0);
  const [sliderRangeProgress, setSliderRangeProgress] = useState<{
    lower: number;
    upper: number;
  }>({lower: 0, upper: 0});
  const _onShowAction = useCallback(() => {
    if (_refAction.current) {
      _refAction.current.show();
    }
  }, []);

  useEffect(() => {
    // showLoadingAnim();
    // const id = setInterval(() => {
    //   setVisible((v) => !v);
    //   showSnack({
    //     msg: 'Message',
    //     type: ['error', 'info', 'success', 'warn'][
    //       Math.floor(Math.random() * 3)
    //     ],
    //   });
    //   setProgress(Math.floor(Math.random() * 100));
    // }, 1000);
    // return () => clearInterval(id);
  }, []);
  return (
    <Block block color={'#ffffff'} paddingTop={0} paddingHorizontal={15}>
      <ModalAppMode ref={_modalMode} />

      <Screen scroll={true} backgroundColor={'#ffffff'}>
        <Pressable onPress={() => setVisible((v) => !v)}>
          <Block middle justifyContent={'center'}>
            <Text>Change</Text>
          </Block>
        </Pressable>
        <Presence exitBeforeEnter>
          {visible && (
            <ReModifyView
              key={1}
              transition={{
                type: 'timing',
                translateX: {type: 'spring', mass: 1},
                translateY: {type: 'spring', mass: 1, delay: 150},
                opacity: {type: 'timing', duration: 1000},
              }}
              exit={{
                translateX: 0,
                translateY: 0,
                opacity: 0,
              }}
              from={{translateX: 0, translateY: 0, opacity: 0}}
              animate={{
                translateX: [{value: 50, type: 'spring', mass: 1}, 150],
                translateY: [{value: 50, type: 'decay', velocity: 50}, 150],
                opacity: 1,
              }}>
              <Block
                width={150}
                height={150}
                borderRadius={5}
                color={'#9b59b6'}
              />
            </ReModifyView>
          )}
          {!visible && (
            <ReModifyView
              key={2}
              transition={{
                type: 'timing',
                translateX: {type: 'spring', mass: 1},
                translateY: {type: 'spring', mass: 1, delay: 150},
                opacity: {type: 'timing', duration: 1000},
              }}
              exit={{
                translateX: 0,
                translateY: 0,
                opacity: 0,
              }}
              from={{translateX: 0, translateY: 0, opacity: 0}}
              animate={{
                translateX: [{value: 20, type: 'spring', mass: 1}, 80],
                translateY: [{value: 50, type: 'decay', velocity: 50}, 0],
                opacity: 1,
              }}>
              <Block
                width={150}
                height={150}
                borderRadius={5}
                color={'#9b59b6'}
              />
            </ReModifyView>
          )}
        </Presence>
        {/* <Block width={150} height={150}>
          <LightBox source={{uri: 'https://picsum.photos/id/11/400/400'}} />
        </Block>
        <Text>{visible ? 'true' : 'false'}</Text>
        <AnimatePresence>{visible && <Anima />}</AnimatePresence>

        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Action Sheet</Text>
          <SizeBox width={10} />
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
          <SizeBox width={10} />
          <CheckBox onToggle={setVisible} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>OTP</Text>
          <SizeBox width={10} />
          <Otp length={5} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>DropDown</Text>
          <SizeBox width={10} />
          <DropDown
            data={[
              {label: 'Option1', value: 1},
              {label: 'Option2', value: 2},
            ]}
          />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Select</Text>
          <SizeBox width={10} />
          <Select data={[{text: 'Option1'}, {text: 'Option2'}]} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Helper text</Text>
          <SizeBox width={10} />
          <Block>
            <HelperText visible={visible} msg={'Helper text'} type={'error'} />
            <HelperText visible={visible} msg={'Helper text'} type={'info'} />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Divider</Text>
          <SizeBox width={10} />
          <Divider />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Progress Circle</Text>
          <SizeBox width={10} />
          <Progress type={'circle'} progress={progress} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Progress Line</Text>
          <SizeBox width={10} />
          <Progress type={'linear'} progress={progress} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Radio Button</Text>
          <SizeBox width={10} />
          <RadioButton value={selectedRadio} onToggle={setSelectedRadio} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Slider Linear</Text>
          <SizeBox width={10} />
          <Block block>
            <Text>{sliderProgress}</Text>
            <Slider type={'linear'} onChangeLinear={setSliderProgress} />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Slider Range</Text>
          <SizeBox width={10} />
          <Block block>
            <Text>
              {sliderRangeProgress.lower} {sliderRangeProgress.upper}
            </Text>
            <SizeBox height={20} />
            <Slider
              type={'range'}
              onChangeRange={setSliderRangeProgress}
              initialRange={[0, 50]}
            />
          </Block>
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TextField Flat</Text>
          <SizeBox width={10} />
          <TextField label={'Flat'} typeInput={'flat'} />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TextField Outline</Text>
          <SizeBox width={10} />
          <TextField typeInput={'outline'} label={'Outline'} />
        </Block>
        <SizeBox height={10} />
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>TouchableScale</Text>
          <SizeBox width={10} />
          <TouchableScale>
            <Block padding={5} color={'#bbb'}>
              <Text>Press me!</Text>
            </Block>
          </TouchableScale>
        </Block>
        <SizeBox height={10} />
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Switch IOS</Text>
          <SizeBox width={10} />
          <Switch />
        </Block>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>Switch Android</Text>
          <SizeBox width={10} />
          <Switch type={'android'} />
        </Block> */}

        {/* <FormLogin onSubmit={_onSubmit} /> */}
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
