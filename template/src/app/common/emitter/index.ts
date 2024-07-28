/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventKeyName, EventParamsList, Listeners } from './type';

export { EVENT_NAME } from './type';

export type { EventKeyName } from './type';

export * from './event-type';

const listeners: Listeners = [];

export const subscribeEvent = <P, T extends string = string>(
  ...args: T extends EventKeyName
    ? [
        eventKey: T,
        listener: undefined extends EventParamsList[T]
          ? () => void
          : (data: EventParamsList[T]) => void,
      ]
    : [eventKey: T, listener: (data: P) => void]
) => {
  const uuid = randomUniqueId();

  listeners.push({
    eventKey: args[0],
    listener: args[1],
    uuid,
  });

  return () => {
    const index = listeners.findIndex(x => x.uuid === uuid);

    listeners.splice(index, 1);
  };
};

export const emitEvent = <P, T extends string = string>(
  ...args: T extends EventKeyName
    ? undefined extends EventParamsList[T]
      ? [eventName: T]
      : [eventName: T, payload: P | EventParamsList[T]]
    : [eventName: T, payload?: P]
) => {
  for (const element of listeners) {
    if (element.eventKey === args[0]) {
      element.listener(args[1]);
    }
  }
};

export const unSubscribeAllEvent = () => {
  listeners.length = 0;
};
