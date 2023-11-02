import { SharedValue } from 'react-native-reanimated';

import { I18nKeys } from '@utils/i18n/locales';

export type Tab = {
  title: I18nKeys;
  key: string;
};

export type TabsProps = {
  /**
   * Start index
   * @default 0
   */
  initialIndex?: number;
  /**
   * data for tabs
   */
  tabs: Array<Tab>;
};

export type TabItemProps = {
  tab: Tab;
  index: number;
  selectedIndex: SharedValue<number>;
};
