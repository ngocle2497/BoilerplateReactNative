import React, {
  useState,
  useRef,
  cloneElement,
  Children,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {View} from 'react-native';
import {LightBoxProps} from './LightBox.props';
import {Button} from '../Button/Button';
import {LightBoxOverlayContext} from './Context';

export const ChildrenBox = (props: LightBoxProps) => {
  const {
    children,
    backgroundColor = 'black',
    renderContent,
    renderHeader,
    swipeToDismiss = true,
  } = props;
  const _root = useRef<View>();
  const {value: activeContext, fn: setActiveContext} = useContext<any>(
    LightBoxOverlayContext,
  );
  const [activeChild, setActiveChild] = useState<any>({});
  const _onOpen = useCallback(() => {
    setActiveContext(activeChild);
  }, [activeChild]);
  const _onClose = useCallback(() => {
    setActiveContext(null);
  }, []);
  const getContent = useCallback(() => {
    if (renderContent) {
      return renderContent();
    }
    return cloneElement(Children.only(children), {});
  }, [renderContent]);
  useEffect(() => {
    _root.current?.measure(
      (
        ox: number,
        oy: number,
        width: number,
        height: number,
        px: number,
        py: number,
      ) => {
        setActiveChild({
          viewRef: _root.current,
          origin: {
            width,
            height,
            x: px,
            y: py,
          },
          renderHeader: renderHeader,
          swipeToDismiss: swipeToDismiss,
          backgroundColor: backgroundColor,
          children: getContent(),
          onClose: _onClose,
        });
      },
    );
  }, [props, _root]);
  return (
    <View ref={_root} collapsable={false}>
      <Button preset={'link'} onPress={_onOpen}>
        {children && children}
      </Button>
    </View>
  );
};
