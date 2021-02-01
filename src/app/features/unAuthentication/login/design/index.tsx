import React, {useRef, memo, useState, useEffect} from "react";
import isEqual from "react-fast-compare";
import {
  Wallpaper,
  Screen,
  ModalAppMode,
  ModalAppModeRef,
  Block,
  ActionSheet,
  AnimProcess,
  CheckBox,
  DropDown,
  HelperText,
  ImageRemote,
  Progress,
  RadioButton,
  Slider,
} from "@components";
import {onSetToken, onSetAppMode} from "@store/app_redux/reducer";
import {dispatch} from "@common";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList, APP_SCREEN} from "@navigation/screenTypes";

import {FormLogin} from "./components";

type LoginProps = StackScreenProps<RootStackParamList, APP_SCREEN.LOGIN>;

const LoginComponent = ({navigation, route}: LoginProps) => {
  const _modalMode = useRef<ModalAppModeRef>();
  const [visible, setVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState(10);
  const _onSubmit = (data: any) => {
    alert(JSON.stringify(data));
    // dispatch(onSetAppMode("staging"));
    // dispatch(onSetToken("s"));
  };
  return (
    <Block block>
      <Wallpaper />
      <ModalAppMode ref={_modalMode} />
      <Screen scroll backgroundColor={"transparent"}>
        <CheckBox onToggle={setVisible} />
        <Progress type={"circle"} progress={progress} />
        <RadioButton />
        <Block paddingHorizontal={80}>
          <Slider />
        </Block>
        {/* <FormLogin onSubmit={_onSubmit} /> */}
      </Screen>
    </Block>
  );
};
export const Login = memo(LoginComponent, isEqual);
