export interface WheelPickerProps {
    data: Array<any>;

    renderItem?: (data: Array<any>, index: number, isSelected: boolean) => React.ReactNode;

    onValueChange?: (selectedItem: any, selectedIndex: number) => void;

    hightLightLineColor?: string;
    
    placeHolderColor?: string;

    wrapperHeight?: number;

    itemHeight?: number;

}