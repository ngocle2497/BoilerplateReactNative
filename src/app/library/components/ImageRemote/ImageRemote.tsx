import * as React from 'react';
import { View, ImageStyle } from 'react-native';
import FastImage from 'react-native-fast-image'
import { ImageRemoteProps } from './ImageRemote.props';
import Axios from 'axios'
import { mergeAll, flatten, equals } from 'ramda';
import { Img } from '../Image/Image';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};
const defaultStyle: ImageStyle = {
  resizeMode: 'contain'
}
const ImageRemoteComponent = (props: ImageRemoteProps) => {
  const { style: styleOverride = {}, imgSource, styleDefault = {}, resizeMode = 'contain', containerStyle, dependency = [], ...rest } = props;
  const [url, setUrl] = React.useState('')
  const style: ImageStyle = mergeAll(flatten([ROOT, styleOverride]));
  const styleImgDefault: ImageStyle = mergeAll(flatten([defaultStyle, styleDefault]));
  const dependencyList = [style, url, styleImgDefault, containerStyle, resizeMode, imgSource, ...dependency]
  React.useEffect(() => {
    Axios.get(imgSource).then((res) => {
      if (res.status === 200) {
        setUrl(imgSource)
      } else {
        setUrl('')
      }
    }).catch((err) => {
      setUrl('')
    })
  }, [imgSource])
  return (
    <View style={containerStyle}>
      {url === '' ? <Img style={styleImgDefault} source={'default'} /> :
        <FastImage
          resizeMode={resizeMode}
          style={style}
          source={{ uri: url }}
          {...rest} />}
    </View>
  )
}
export const ImageRemote = React.memo(ImageRemoteComponent, (prevProps, nextProps) => equals(prevProps, nextProps))