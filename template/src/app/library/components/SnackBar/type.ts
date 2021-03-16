export interface SnackBarProps {
  borderLeftColorInfo?: string;
  borderLeftColorSuccess?: string;
  borderLeftColorError?: string;
  borderLeftColorWarn?: string;
}

export type TypeMessage = 'success' | 'error' | 'info' | 'warn';

export type Item = {
  id: number;
  msg: string;
  type: TypeMessage;
  interval: number;
};
export interface SnackBarItemProps
  extends Pick<
    SnackBarProps,
    | 'borderLeftColorInfo'
    | 'borderLeftColorSuccess'
    | 'borderLeftColorError'
    | 'borderLeftColorWarn'
  > {
  item: Item;
  onPop: (item: Item) => void;
}
