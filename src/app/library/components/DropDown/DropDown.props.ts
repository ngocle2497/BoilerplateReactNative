/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import {StyleProp, ViewStyle, TextStyle} from "react-native";
import Animated from "react-native-reanimated";

export interface RowDropDown {
  /**
   * text to display
   */
  label: string;

  /**
   * item pass to call back function when click one item dropdown or set selected
   */
  value: string | number | any;
}

export interface ItemProps {
  /**
   * Item of list dropdown
   */
  item: RowDropDown;

  /**
   * Additional styles for the items.
   * @default undefined
   */
  containerStyleItem?: StyleProp<ViewStyle>;

  /**
   * Additional styles for the labels.
   * @default undefined
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Additional styles for the active item.
   * @default undefined
   */
  activeItemStyle?: StyleProp<ViewStyle>;

  /**
   * Additional styles for the active label.
   * @default undefined
   */
  activeLabelStyle?: StyleProp<TextStyle>;

  /**
   * Customize the tick icon for item picker.
   * @default undefined
   */
  customTickIcon?: () => React.ReactNode;

  /**
   * item selected or not
   * @default false
   */
  selected: boolean;

  /**
   * function when click one item
   */
  onPressItem: (value: string) => void;
}

export interface DropDownProps
  extends Pick<
    ItemProps,
    | "containerStyleItem"
    | "labelStyle"
    | "activeItemStyle"
    | "activeLabelStyle"
    | "customTickIcon"
  > {
  /**
   * The list item of dropdown
   */
  data: Array<RowDropDown>;

  /**
   * The value of default item.(If multiple = {true}, its takes an array of pre-selected value: ['someValue])
   * @default undefined
   */
  defaultValue?: Array<string> | string;

  /**
   * Default text to be shown to the user when defaultValue={null} or defaultValue={[]}
   * @default 'Select an item'
   */
  placeHolder?: string;

  /**
   * Additional styles for the placeholder text.
   * @default undefined
   */
  placeholderStyle?: StyleProp<TextStyle>;

  /**
   * Additional styles for the picker.
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;

  /**
   * 	Additional styles for the dropdown box.
   * @default undefined
   */
  dropDownStyle?: StyleProp<ViewStyle>;

  /**
   * 	Additional styles for the container view.
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An option to show/hide the arrow.
   * @default true
   */
  showArrow?: boolean;

  /**
   * Overwrite animated arrow component
   * @default undefined
   */
  renderArrow?: (progress: Animated.SharedValue<number>) => React.ReactNode;

  /**
   * Disables the component.
   * @default false
   */
  disabled?: boolean;

  /**
   * If set to true selecting multiple items is possible.
   * @default false
   */
  multiple?: boolean;

  /**
   * a Text to inform the user how many items have been selected.
   * @default '%d items have been selected'
   * %d is required to display number of selected
   */
  multipleText?: string;

  /**
   * Shows a TextInput to search for specific items.
   * @default true
   */
  searchable?: boolean;

  /**
   * Additional styles for the TextInput.
   * @default undefined
   */
  searchableStyle?: boolean;

  /**
   * Shows a message when nothing found.
   * @default 'Not Found'
   */
  searchableError?: boolean;

  /**
   * Fires when you open the picker.
   * @default undefined
   */
  onOpen?: () => void;

  /**
   * Fires when you close the picker.
   *  @default undefined
   */
  onClose?: () => void;

  /**
   * Callback which returns item and index. The item is the selected object or an array of the selected values.
   *  @default undefined
   */
  onChangeItem?: (item: string, index: number) => void;
}
