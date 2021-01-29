import React, {createContext, useState} from "react";

import {ChildrenTransition} from "./ChildrenTransition";

export const LightBoxOverlayContext = createContext(null);

export const LightBoxOverlay = ({children}: {children: React.ReactNode}) => {
  const [activeChildren, setActiveChildren] = useState<any>(null);
  return (
    <LightBoxOverlayContext.Provider
      value={{value: activeChildren, fn: setActiveChildren}}>
      {children}
      {activeChildren && <ChildrenTransition {...activeChildren} />}
    </LightBoxOverlayContext.Provider>
  );
};
