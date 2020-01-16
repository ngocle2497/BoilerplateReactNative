import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {onLogin} from '../redux/action';
import {styles} from './style';
import {LoginState} from '../redux/type';
export const Login = props => {
  const dispatch = useDispatch();
  const {}: LoginState = useSelector((x: any) => x.LoginReducer);
  useEffect(() => {
    dispatch(
      onLogin({
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
