/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {memo, forwardRef} from "react";
import equals from "react-fast-compare";

import {InputFlat} from "./components/Flat/InputFlat";
import {InputOutline} from "./components/OutLine/InputOutline";
import {TextFieldProps} from "./TextField.props";

const TextFieldComponent = forwardRef<any, TextFieldProps>((props, refs) => {
  const {typeInput} = props;
  return typeInput === "flat" ? (
    <InputFlat {...props} ref={refs} />
  ) : (
    <InputOutline {...props} ref={refs} />
  );
});
export const TextField = TextFieldComponent;
