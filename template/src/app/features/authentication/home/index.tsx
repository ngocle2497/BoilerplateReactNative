import React, { memo } from 'react';
import { Text, View } from 'react-native';

import isEqual from 'react-fast-compare';

const HomeComponent = () => {
  // render
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export const Home = memo(HomeComponent, isEqual);
