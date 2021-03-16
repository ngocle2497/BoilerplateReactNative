import {Block, Button, Screen, Text, Wallpaper} from '@components';
import {APP_SCREEN, UnAuthorizeParamsList} from '@navigation/screenTypes';
import {StackScreenProps} from '@react-navigation/stack';
import React, {memo, useEffect} from 'react';
import isEqual from 'react-fast-compare';
import Splash from 'react-native-splash-screen';

type RegisterProps = StackScreenProps<
  UnAuthorizeParamsList,
  APP_SCREEN.REGISTER
>;

const RegisterComponent = ({navigation}: RegisterProps) => {
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <Block block>
      <Wallpaper />
      <Screen forceInset={['top']}>
        <Block block justifyContent={'center'} middle>
          <Button
            onPress={() => {
              navigation.goBack();
            }}>
            <Text color={'red'}>Back</Text>
          </Button>
        </Block>
      </Screen>
    </Block>
  );
};
export const Register = memo(RegisterComponent, isEqual);
