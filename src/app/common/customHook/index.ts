import {useEffect, useRef, useState, useMemo} from 'react';

function useInterval(callback?: any, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function useArray(initialList) {
  const [list, setList] = useState(
    Array.isArray(initialList) ? initialList : [],
  );
  const utils = useMemo(
    () => ({
      setList,
      clear: () => setList([]),
      updateAt: (index, entry) =>
        setList(currentList => [
          ...currentList.slice(0, index),
          entry,
          ...currentList.slice(index + 1),
        ]),
      remove: index =>
        setList(currentList => [
          ...currentList.slice(0, index),
          ...currentList.slice(index + 1),
        ]),
      push: (...entry) => setList(currentList => [...currentList, ...entry]),
      filter: fn => setList(currentList => currentList.filter(fn)),
      sort: (fn?) => setList(currentList => [...currentList].sort(fn)),
      reset: () => setList([...initialList]),
    }),
    [setList],
  );

  return [list, utils];
}
export {useInterval, useArray};
