import { EventSelectDate } from './event-type';

export const EVENT_NAME = {
  DATE_SELECTED: 'DATE_SELECTED',
} as const;

export interface EventParamsList {
  [EVENT_NAME.DATE_SELECTED]: EventSelectDate;
}

export type EventKeyName = keyof EventParamsList;

export type ListenerCallback<P, T> = T extends EventKeyName
  ? (data: EventParamsList[T]) => void
  : (data: P) => void;

export type Listeners = Array<{
  uuid: string;
  eventKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: any;
}>;
