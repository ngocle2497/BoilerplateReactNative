/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useRef,
  cloneElement,
  Children,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {View} from "react-native";

import {Button} from "../Button/Button";

import {LightBoxProps} from "./LightBox.props";
import {LightBoxOverlayContext} from "./Context";

export const ChildrenBox = (props: LightBoxProps) => {
  const {
    children,
    backgroundColor = "black",
    renderContent,
    renderHeader,
    swipeToDismiss = true,
  } = props;
  const _root = useRef<View>(null);
  const {fn: setActiveContext} = useContext<any>(LightBoxOverlayContext);
  const [activeChild, setActiveChild] = useState<any>({});
  const _onOpen = useCallback(() => {
    setActiveContext(activeChild);
  }, [activeChild, setActiveContext]);
  const _onClose = useCallback(() => {
    setActiveContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getContent = useCallback(() => {
    if (renderContent) {
      return renderContent();
    }
    return cloneElement(Children.only(children), {});
  }, [children, renderContent]);
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
  }, [
    props,
    _root,
    renderHeader,
    swipeToDismiss,
    backgroundColor,
    getContent,
    _onClose,
  ]);
  return (
    <View ref={_root} collapsable={false}>
      <Button preset={"link"} onPress={_onOpen}>
        {children && children}
      </Button>
    </View>
  );
};
