import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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
function createSelector<T, TSelected = unknown>(selector: (state: any) => T, equalityFn?: (left: TSelected, right: TSelected) => boolean): T {
  const state = useSelector((x: any) => x.toJS());
  return selector(state);
};
export { useInterval, createSelector };
