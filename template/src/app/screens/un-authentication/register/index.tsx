import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Button, Screen, Text, Wallpaper } from '@components';
import { goBack } from '@navigation/navigation-service';

const RegisterComponent = () => {
  // render
  return (
    <Block block>
      <Wallpaper />
      <Screen>
        <Block block justifyContent={'center'} middle>
          <Button
            onPress={() => {
              goBack();
            }}>
            <Text color={'red'}>Back</Text>
          </Button>
        </Block>
      </Screen>
    </Block>
  );
};

export const Register = memo(RegisterComponent, isEqual);
