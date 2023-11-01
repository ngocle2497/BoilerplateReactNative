import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Text, View } from '@rn-core';

const HomeComponent = () => {
  // render
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export const Home = memo(HomeComponent, isEqual);
