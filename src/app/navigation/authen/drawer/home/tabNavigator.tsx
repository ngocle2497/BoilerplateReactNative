import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatTabScreen } from './tabs/chatTab';
import { NotifyTabScreen } from './tabs/notifyTab';
import { APP_SCREEN } from '../../../screenTypes'
const HomeBottomTab = createBottomTabNavigator();
import { useTranslation } from 'react-i18next';

export const HomeBottomTabScreen = () => {
    const [t] = useTranslation()
    return (
        <HomeBottomTab.Navigator>
            <HomeBottomTab.Screen options={{ title: t("main:chatTab:tvTabLabel") || undefined }} name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.CHAT_TAB.ROOT} component={ChatTabScreen} />
            <HomeBottomTab.Screen options={{ title: t("main:profileTab:tvTabLabel") || undefined }} name={APP_SCREEN.AUTHORIZE.HOME_DRAWER.NOTIFY_TAB.ROOT} component={NotifyTabScreen} />
        </HomeBottomTab.Navigator>
    )
}
