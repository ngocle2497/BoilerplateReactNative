import React, {useEffect, memo} from 'react';
import Splash from 'react-native-splash-screen';
import {Wallpaper, Text, Screen, Button, Block} from '@components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import isEqual from 'react-fast-compare';

type RegisterProps = StackScreenProps<RootStackParamList, APP_SCREEN.REGISTER>;

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
