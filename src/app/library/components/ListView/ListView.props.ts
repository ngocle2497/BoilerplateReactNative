import { FlatListProps } from 'react-native';
export interface ListViewProps extends FlatListProps<any> {

    /**
     * Function when refreshing
     * @default undefined
     */
    onRefreshing?: Function;

    /**
     * Function when scroll to end
     * @default undefined
     */
    onLoadMore?: Function;

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
}