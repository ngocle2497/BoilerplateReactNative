import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Splash from 'react-native-splash-screen';
import {Wallpaper, Text, Screen, Button} from '@components';
export const Register = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    Splash.hide();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Wallpaper />
      <Screen forceInset={{top: 'always'}} customInsetBottom={false}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: 'red'}}>Back</Text>
          </Button>
        </View>
      </Screen>
    </View>
  );
};
