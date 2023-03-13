import {
  EventKeyName,
  EventParamsList,
  ListenerCallback,
  Listeners,
} from './type';

const listeners: Listeners = [];

export const subscribeEvent = <T extends EventKeyName>(
  eventKey: T,
  listener: ListenerCallback<EventParamsList[T]>,
) => {
  const uuid = String.prototype.randomUniqueId();

  listeners.push({
    uuid,
    eventKey,
    listener,
  });

  return () => {
    const index = listeners.findIndex(x => x.uuid === uuid);

    listeners.slice(index, 1);
  };
};

export const subscribeEventById = <T extends EventKeyName>(
  id: string,
  eventKey: T,
  listener: ListenerCallback<EventParamsList[T]>,
) => {
  listeners.push({
    uuid: id,
    eventKey,
    listener,
  });

  return () => {
    const index = listeners.findIndex(x => x.uuid === id);

    listeners.slice(index, 1);
  };
};

export const emitEvent = <T extends EventKeyName>(
  ...args: undefined extends EventParamsList[T] ? [T] : [T, EventParamsList[T]]
) => {
  for (let index = 0; index < listeners.length; index++) {
    const element = listeners[index];

    if (element.eventKey === args[0]) {
      element.listener(args[1]);
    }
  }
};

export const unSubscribeAllEvent = () => {
  listeners.length = 0;
};
