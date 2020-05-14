import Animated from 'react-native-reanimated';
import { TextStyle, ViewStyle } from 'react-native';

export interface ItemData {
    text: string;

    itemCallBack?: any;
}
export interface DataSection {
    title: string;

    data: Array<ItemData>;
}
export interface ItemSectionListProps {
    item: ItemData;

    index: number;

    itemTextStyle?: TextStyle | TextStyle[];

    containerItemStyle?: ViewStyle | ViewStyle[];

    onItemPress?: (item: ItemData, index: number) => void;
}

export interface HeaderListProps {
    data: DataSection;

    headerTextStyle?: TextStyle | TextStyle[];

    containerHeaderStyle?: ViewStyle | ViewStyle[];
}

export interface ListAlphabetProps extends Pick<ItemSectionListProps, 'itemTextStyle' | 'containerItemStyle' | 'onItemPress'>,
    Pick<HeaderListProps, 'headerTextStyle' | 'containerHeaderStyle'> {

    data: Array<DataSection>;

    renderItem?: (item: ItemData, index: number) => React.ReactElement;

    renderHeader?: (data: DataSection) => React.ReactElement;
}

export interface ItemAlphabetProps {

    index: number;

    title: string;
}

export interface AlphabetProps {

    dataTitle: Array<ItemAlphabetProps>;

    selectedAlphaIndex: Animated.Value<number>;

    handlerScroll:(index:number)=>void;
}
