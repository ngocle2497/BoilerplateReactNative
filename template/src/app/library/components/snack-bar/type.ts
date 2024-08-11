export const TYPE_MESSAGE = {
  ERROR: 'error',
  LINK: 'link',
  SUCCESS: 'success',
  WARN: 'warn',
} as const;

export type TypeMessage = (typeof TYPE_MESSAGE)[keyof typeof TYPE_MESSAGE];

export type Item = {
  id: string;
  msg: string;
  type: TypeMessage;
  interval: number;
};

export interface SnackBarItemProps {
  item: Item;
  index: number;
  onPop: (item: Item) => void;
}

export type DataShowMessage = {
  msg: string;
  type: TypeMessage;
  interval?: number;
};
