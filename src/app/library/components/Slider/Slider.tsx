/* eslint-disable camelcase */
import React, {memo} from "react";
import isEqual from "react-fast-compare";

import {Slider_Linear} from "./Slider_Linear";
import {SliderProps} from "./type";

const SliderComponent = (props: SliderProps) => {
  return <Slider_Linear {...props} />;
};

export const Slider = memo(SliderComponent, isEqual);
