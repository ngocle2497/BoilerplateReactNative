export const EVENT_NAME = {
  DEMO: 'DEMO',
} as const;

export type EventParamsList = {
  [EVENT_NAME.DEMO]: undefined;
};

export type EventKeyName = keyof EventParamsList;

export type ListenerCallback<T> = T extends undefined
  ? () => void
  : (data: T) => void;

export type Listeners = Array<{
  uuid: string;
  eventKey: EventKeyName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: ListenerCallback<any>;
}>;
