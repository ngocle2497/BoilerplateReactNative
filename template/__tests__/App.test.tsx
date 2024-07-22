/**
 * @format
 */

import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';

import { MyApp } from '../src/app';

it('renders correctly', () => {
  renderer.create(<MyApp />);
});
