import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {onLogins} from '../redux/action';
import {styles} from './style';
export const Login = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      onLogins({
        url: 'api/',
        data: {password: '123456', userName: '1234567890'},
      }),
    );
  }, []);
  return (
    <View>
      <Text> Login </Text>
    </View>
  );
};
