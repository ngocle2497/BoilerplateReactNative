import React, {memo} from "react";
import isEqual from "react-fast-compare";

import {LightBoxOverlay} from "./Context";
import {LightBoxProps} from "./LightBox.props";
import {ChildrenBox} from "./ChildrenBox";
const LightBoxComponent = (props: LightBoxProps) => {
  return (
    <LightBoxOverlay>
      <ChildrenBox {...props} />
    </LightBoxOverlay>
  );
};

export const LightBox = memo(LightBoxComponent, isEqual);
