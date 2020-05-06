import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTab, LikesTab, ProfileTab, SearchTab } from '@features/authentication/main/home/tab';
import { APP_SCREEN } from '@navigation'
const HomeBottomTab = createBottomTabNavigator();
import { useTranslation } from 'react-i18next';
import TabBarBubble, { TabsConfigsType } from '@library/navigationAnimated/BottomNavigation';
import IconTab from './IconTab';

const tabs: TabsConfigsType = {
    [APP_SCREEN.AUTHORIZE.HOME_DRAWER.HOME_TAB.ROOT]: {
        labelStyle: {
            color: '#5c3cb9'
        },
        icon: {
            component: ({ color, size ,colorTintIcon}) => <IconTab {...{ color, size, icon: 'home',colorTintIcon }} />,
            activeColor: '#5c3cb9',
            inactiveColor: '#000'
        },
        background: {
            activeColor: 'rgba(92,60,185,0.3)',
            inactiveColor: 'transparent'
        }
    },
    [APP_SCREEN.AUTHORIZE.HOME_DRAWER.LIKE_TAB.ROOT]: {
        labelStyle: {
            color: '#c6419e'
        },
        icon: {
            component: ({ color, size,colorTintIcon }) => <IconTab {...{ color, size, icon: 'heart',colorTintIcon }} />,
            activeColor: '#c6419e',
            inactiveColor: '#000'
        },
        background: {
            activeColor: 'rgba(198,65,158,0.3)',
            inactiveColor: 'transparent'
        }
    },
    [APP_SCREEN.AUTHORIZE.HOME_DRAWER.SEARCH_TAB.ROOT]: {
        labelStyle: {
            color: '#e3a916'
        },
        icon: {
            component: ({ color, size ,colorTintIcon}) => <IconTab {...{ color, size, icon: 'search',colorTintIcon }} />,
            activeColor: '#e3a916',
            inactiveColor: '#000'
        },
        background: {
            activeColor: 'rgba(227,169,22,0.3)',
            inactiveColor: 'transparent'
        }
    },
    [APP_SCREEN.AUTHORIZE.HOME_DRAWER.PROFILE_TAB.ROOT]: {
        labelStyle: {
            color: '#3a9598'
        },
        icon: {
            component: ({ color, size,colorTintIcon }) => <IconTab {...{ color, size, icon: 'user',colorTintIcon }} />,
            activeColor: '#3a9598',
            inactiveColor: '#000'
        },
        background: {
            activeColor: 'rgba(58,149,152,0.3)',
            inactiveColor: 'transparent'
        }
    },
}
export const HomeBottomTabScreen = () => {
    const [t] = useTranslation()
    return (
        <HomeBottomTab.Navigator tabBar={props => <TabBarBubble tabs={tabs} duration={500} {...props} />}>
            <HomeBottomTab.Screen options={{ title: t("main:homeTab:tvHome") || undefined }} name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.HOME_TAB.ROOT} component={HomeTab} />
            <HomeBottomTab.Screen options={{ title: t("main:likesTab:tvLike") || undefined }} name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.LIKE_TAB.ROOT} component={LikesTab} />
            <HomeBottomTab.Screen options={{ title: t("main:searchTab:tvSearch") || undefined }} name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.SEARCH_TAB.ROOT} component={SearchTab} />
            <HomeBottomTab.Screen options={{ title: t("main:profileTab:tvProfile") || undefined }} name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.PROFILE_TAB.ROOT} component={ProfileTab} />
        </HomeBottomTab.Navigator>
    )
}
