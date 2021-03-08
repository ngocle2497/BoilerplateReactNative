import React, {memo} from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {AuthorizeParamsList, APP_SCREEN} from '@navigation/screenTypes';

type HomeProps = StackScreenProps<AuthorizeParamsList, APP_SCREEN.HOME>;

// eslint-disable-next-line no-empty-pattern
const HomeComponent = ({}: HomeProps) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export const Home = memo(HomeComponent, isEqual);
