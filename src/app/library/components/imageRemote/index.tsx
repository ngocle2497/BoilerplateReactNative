import * as React from 'react';
import { View, ImageStyle } from 'react-native';
import FastImage from 'react-native-fast-image'
import { ImageRemoteProps } from './imageRemote.props';
import Axios from 'axios'
import { mergeAll, flatten } from 'ramda';
import { Img } from '../image/image';
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};
const resizeMode: ImageStyle = {
  resizeMode: 'contain'
}
export const ImageRemote = (props: ImageRemoteProps) => {
  const { style: styleOverride, imgSource, styleDefault, resizeMode = 'contain', containerStyle, dependency = [], ...rest } = props;
  const [url, setUrl] = React.useState('')
  const style: ImageStyle = mergeAll(flatten([ROOT, styleOverride]));
  const styleImgDefault: ImageStyle = mergeAll(flatten([resizeMode, styleDefault]));
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
  return React.useMemo(() => (
    <View style={containerStyle}>
      {url === '' ? <Img style={styleImgDefault} source={'default'} /> :
        <FastImage
          resizeMode={resizeMode}
          style={style}
          source={{ uri: url }}
          {...rest} />}
    </View>
  ), dependencyList)
}
