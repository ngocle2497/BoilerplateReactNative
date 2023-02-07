/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatListProps } from 'react-native';

export type ListViewProps = CustomOmit<
  FlatListProps<any>,
  'onRefresh' | 'refreshControl' | 'refreshing'
> & {
  /**
   * Function when refreshing
   * @default undefined
   */
  onRefresh?: () => void;

  /**
   * Function when scroll to end
   * @default undefined
   */
  onLoadMore?: () => void;

  /**
   * Enable to load more when scroll to end
   * @default false
   */
  canLoadMore?: boolean;

  /**
   * State of Refresh Control
   * @default false
   */
  refreshing?: boolean;

  /**
   * Enable to render Refresh Control
   * @default true
   */
  canRefresh?: boolean;
};
