import {TextStyle, ViewStyle, StyleProp} from 'react-native';
import Animated from 'react-native-reanimated';
export interface TabBarConfigsType {
  labelStyle: TextStyle;
  icon: {
    component:
      | ((props: {
          color: Animated.Node<string | number>;
          colorTintIcon: Animated.Node<string>;
          size: number;
        }) => React.ReactNode)
      | React.ReactNode;
    activeColor: string;
    inactiveColor: string;
  };
  background: {
    activeColor: string;
    inactiveColor: string;
  };
}

export interface TabsConfigsType {
  [key: string]: TabBarConfigsType;
}

export interface TabBarAnimationConfigurableProps {
  /**
   * Animation duration
   * @default 500
   */
  duration?: number;
  /**
   * Animated easing function
   * @default Easing.out(Easing.exp)
   */
  easing?: Animated.EasingFunction;
}

export interface Space {
  vertical: number;
  horizontal: number;
}

export interface TabBarItemConfigurableProps {
  /**
   * Item padding space
   * @default 12
   */
  itemInnerSpace?: number | Space;
  /**
   * Item margin space
   * @default 12
   */
  itemOuterSpace?: number | Space;
  /**
   * Icon size
   * @default 24
   */
  iconSize?: number;
}

export interface TabRoute extends TabBarConfigsType {
  title: string;
  key: string;
}

export interface TabBarViewProps
  extends TabBarAnimationConfigurableProps,
    TabBarItemConfigurableProps {
  /**
   * Selected animated index
   */
  selectedIndex: Animated.Value<number>;
  /**
   * Mapped routes with tab configs to be presented
   */
  routes: TabRoute[];
  /**
   * Root container style
   */
  style?: StyleProp<ViewStyle>;
}

export interface TabBarItemProps
  extends Required<TabBarAnimationConfigurableProps>,
    Required<TabBarItemConfigurableProps>,
    TabBarConfigsType {
  /**
   * Selected animated index
   */
  selectedIndex: Animated.Value<number>;
  index: number;
  label: string;
}
