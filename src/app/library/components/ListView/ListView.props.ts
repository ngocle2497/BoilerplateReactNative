import { FlatListProps } from 'react-native';
export interface ListViewProps extends FlatListProps<any> {
    onRefreshing?: Function;

    onLoadMore?: Function;

    /**
     * @default false
     */
    canLoadMore?: boolean;
    /**
     * @default false
     */
    refreshing?: boolean;

        /**
     * @default true
     */
    canRefresh?: boolean;
}