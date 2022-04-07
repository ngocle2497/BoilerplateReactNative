import React from 'react';

import renderer from 'react-test-renderer';

import 'react-native';
import { MyApp } from '../src/app';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<MyApp />);
});
