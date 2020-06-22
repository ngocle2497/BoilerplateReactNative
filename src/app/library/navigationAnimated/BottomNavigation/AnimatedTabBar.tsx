import React, {useMemo, useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  TabBarViewProps,
  TabBarItemConfigurableProps,
  TabBarAnimationConfigurableProps,
  TabsConfigsType,
} from './type';
import {Route, CommonActions} from '@react-navigation/native';
import {useValues} from 'react-native-redash';
import {useCode, onChange, call, set} from 'react-native-reanimated';
import BubbleTabBar from './bubble/BubbleTabBar';

interface AnimatedTabBarProps
  extends Pick<BottomTabBarProps, 'state' | 'descriptors' | 'navigation'>,
    Pick<TabBarViewProps, 'style'>,
    TabBarItemConfigurableProps,
    TabBarAnimationConfigurableProps {
  /**
   * Tabs configuartions
   */
  tabs: TabsConfigsType;
}
export const AnimatedTabBar = (props: AnimatedTabBarProps) => {
  // props
  const {
    navigation,
    tabs,
    descriptors,
    style,
    itemInnerSpace,
    itemOuterSpace,
    iconSize,
    duration,
    easing,
  } = props;
  const {
    routes,
    index: navigationIndex,
    key: navigationKey,
  }: {routes: Route<string>[]; index: number; key: string} = useMemo(() => {
    return props.state;
  }, [props]);
  const [selectedIndex] = useValues([0], []);

  const getRouteTitle = useCallback(
    (route: Route<string>) => {
      const {options} = descriptors[route.key];
      return options.tabBarLabel !== undefined &&
        typeof options.tabBarLabel === 'string'
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;
    },
    [descriptors],
  );

  const getRouteTabConfigs = useCallback(
    (route: Route<string>) => {
      return tabs[route.name];
    },
    [tabs],
  );

  const getRoutes = useCallback(() => {
    return routes.map((route) => ({
      title: getRouteTitle(route),
      key: route.key,
      ...getRouteTabConfigs(route),
    }));
  }, [routes, getRouteTitle, getRouteTabConfigs]);

  const handleSelectedIndexChange = (index: number) => {
    const {key, name} = routes[index];
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true,
    });
    if (!event.defaultPrevented) {
      navigation.dispatch({
        ...CommonActions.navigate(name),
        target: navigationKey,
      });
    }
  };
  useCode(() => [set(selectedIndex, navigationIndex)], [
    navigationIndex,
    selectedIndex,
  ]);

  useCode(
    () =>
      onChange(
        selectedIndex,
        call([selectedIndex], (args) => {
          handleSelectedIndexChange(args[0]);
        }),
      ),
    [selectedIndex],
  );
  return (
    <BubbleTabBar
      style={style}
      selectedIndex={selectedIndex}
      routes={getRoutes()}
      itemOuterSpace={itemOuterSpace}
      itemInnerSpace={itemInnerSpace}
      iconSize={iconSize}
      easing={easing}
      duration={duration}
    />
  );
};

const styles = StyleSheet.create({});
