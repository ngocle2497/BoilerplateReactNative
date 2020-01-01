import React, {Component, useRef, useState, useEffect} from 'react';
import I18n from '../../i18n/index';
import {
  Text,
  View,
  TouchableOpacity,
  InteractionManager,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  FlatList,
  TextInput,
} from 'react-native';
export const authorized = props => {
  const {screenProps} = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{screenProps.t('greeting:a')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
