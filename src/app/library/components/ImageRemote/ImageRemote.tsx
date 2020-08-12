import * as React from 'react';
import {ImageStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageRemoteProps} from './ImageRemote.props';
import Axios from 'axios';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import {Img} from '../Image/Image';
import {Block} from '../Block/Block';

const ROOT: ImageStyle = {
  resizeMode: 'contain',
};
const defaultStyle: ImageStyle = {
  resizeMode: 'contain',
};
const ImageRemoteComponent = (props: ImageRemoteProps) => {
  const {
    style: styleOverride = {},
    imgSource,
    styleDefault = {},
    resizeMode = 'contain',
    containerStyle,
    ...rest
  } = props;
  const [url, setUrl] = React.useState('');
  const style: ImageStyle = React.useMemo(
    () => enhance([ROOT, styleOverride]),
    [],
  );
  const styleImgDefault: ImageStyle = React.useMemo(
    () => enhance([defaultStyle, styleDefault]),
    [],
  );
  React.useEffect(() => {
    Axios.get(imgSource)
      .then(res => {
        if (res.status === 200) {
          setUrl(imgSource);
        } else {
          setUrl('');
        }
      })
      .catch(err => {
        setUrl('');
      });
  }, [imgSource]);
  return (
    <Block style={containerStyle}>
      {url === '' ? (
        <Img style={styleImgDefault} source={'default'} />
      ) : (
        <FastImage
          resizeMode={resizeMode}
          style={style}
          source={{uri: url}}
          {...rest}
        />
      )}
    </Block>
  );
};
export const ImageRemote = React.memo(ImageRemoteComponent, equals);
