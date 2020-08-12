import isEqual from 'react-fast-compare';
import {
  useEffect,
  useRef,
  useState,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  shallowEqual,
  TypedUseSelectorHook,
} from 'react-redux';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {Clipboard} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '@config/type';
import {RootState} from '@store/allReducers';
type UseStateFull<T = any> = {
  value: T;
  setValue: React.Dispatch<SetStateAction<T>>;
};
const customSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

function useSelector<T>(
  selector: (state: RootState) => T,
  equalityFn = isEqual,
): T {
  const state = customSelector(x => x, equalityFn);
  return selector(state);
}
function useDispatch() {
  const dispatch = useReduxDispatch();
  return dispatch;
}

//#region useInterval
function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

//#endregion useInterval

//#region useClippy
type ClipboardTuple = [string, (clipboard: string) => void];
function useClippy(): ClipboardTuple {
  const [clipboard, setClipboard] = useState<string>('');
  const syncClipboard = (text: any) => {
    Clipboard.setString(text);
  };
  useEffect(() => {
    Clipboard.getString().then((val: string) => {
      setClipboard(val);
    });
  });
  return [clipboard, syncClipboard];
}
//#endregion useClippy

//#region useNetWorkStatus
type NetInfoTuple = [boolean, boolean];
function useNetWorkStatus(): NetInfoTuple {
  const [status, setStatus] = useState<boolean>(false);
  const [canAccess, setCanAccess] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus(state.isConnected);
      setCanAccess(state.isInternetReachable ?? false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return [status, canAccess];
}
//#endregion useNetWorkStatus

//#region useArray
type UseArrayActions<T> = {
  setValue: UseStateFull<T[]>['setValue'];
  add: (value: T | T[]) => void;
  push: (value: T | T[]) => void;
  pop: () => void;
  shift: () => void;
  unshift: (value: T | T[]) => void;
  clear: () => void;
  move: (from: number, to: number) => void;
  removeById: (
    id: T extends {id: string}
      ? string
      : T extends {id: number}
      ? number
      : unknown,
  ) => void;
  modifyById: (
    id: T extends {id: string}
      ? string
      : T extends {id: number}
      ? number
      : unknown,
    newValue: Partial<T>,
  ) => void;
  removeIndex: (index: number) => void;
};
type UseArray<T = any> = [T[], UseArrayActions<T>];

function useArray<T = any>(initial: T[]): UseArray<T> {
  const [value, setValue] = useState(initial);
  const push = useCallback(a => {
    setValue(v => [...v, ...(Array.isArray(a) ? a : [a])]);
  }, []);
  const unshift = useCallback(
    a => setValue(v => [...(Array.isArray(a) ? a : [a]), ...v]),
    [],
  );
  const pop = useCallback(() => setValue(v => v.slice(0, -1)), []);
  const shift = useCallback(() => setValue(v => v.slice(1)), []);
  const move = useCallback(
    (from: number, to: number) =>
      setValue(it => {
        const copy = it.slice();
        copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0]);
        return copy;
      }),
    [],
  );
  const clear = useCallback(() => setValue(() => []), []);
  const removeById = useCallback(
    // @ts-ignore not every array that you will pass down will have object with id field.
    id => setValue(arr => arr.filter(v => v && v.id !== id)),
    [],
  );
  const removeIndex = useCallback(
    index =>
      setValue(v => {
        const copy = v.slice();
        copy.splice(index, 1);
        return copy;
      }),
    [],
  );
  const modifyById = useCallback(
    (id, newValue) =>
      // @ts-ignore not every array that you will pass down will have object with id field.
      setValue(arr => arr.map(v => (v.id === id ? {...v, ...newValue} : v))),
    [],
  );
  const actions = useMemo(
    () => ({
      setValue,
      add: push,
      unshift,
      push,
      move,
      clear,
      removeById,
      removeIndex,
      pop,
      shift,
      modifyById,
    }),
    [
      modifyById,
      push,
      unshift,
      move,
      clear,
      removeById,
      removeIndex,
      pop,
      shift,
    ],
  );
  return [value, actions];
}
//#endregion useArray

//#region useBoolean
type UseBooleanActions = {
  setValue: React.Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};
type UseBoolean = [boolean, UseBooleanActions];

function useBoolean(initial: boolean): UseBoolean {
  const [value, setValue] = useState<boolean>(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const actions = useMemo(() => ({setValue, toggle, setTrue, setFalse}), [
    setFalse,
    setTrue,
    toggle,
  ]);
  return useMemo(() => [value, actions], [actions, value]);
}
//#endregion useBoolean

//#region useNumber
type UseNumberActions = {
  setValue: React.Dispatch<SetStateAction<number>>;
  increase: (value?: number) => void;
  decrease: (value?: number) => void;
};
type UseNumber = [number, UseNumberActions];

function useNumber(
  initial: number,
  {
    upperLimit,
    lowerLimit,
    loop,
    step = 1,
  }: {
    upperLimit?: number;
    lowerLimit?: number;
    loop?: boolean;
    step?: number;
  } = {},
): UseNumber {
  const [value, setValue] = useState<number>(initial);
  const decrease = useCallback(
    (d?: number) => {
      setValue(aValue => {
        const decreaseBy = d !== undefined ? d : step;
        const nextValue = aValue - decreaseBy;

        if (lowerLimit !== undefined) {
          if (nextValue < lowerLimit) {
            if (loop && upperLimit) {
              return upperLimit;
            }

            return lowerLimit;
          }
        }

        return nextValue;
      });
    },
    [loop, lowerLimit, step, upperLimit],
  );
  const increase = useCallback(
    (i?: number) => {
      setValue(aValue => {
        const increaseBy = i !== undefined ? i : step;
        const nextValue = aValue + increaseBy;

        if (upperLimit !== undefined) {
          if (nextValue > upperLimit) {
            if (loop) {
              return initial;
            }
            return upperLimit;
          }
        }

        return nextValue;
      });
    },
    [initial, loop, step, upperLimit],
  );
  const actions = useMemo(
    () => ({
      setValue,
      increase,
      decrease,
    }),
    [decrease, increase],
  );
  return [value, actions];
}
//#endregion useNumber

//#region useStateFull
function useStateFull<T = any>(initial: T): UseStateFull<T> {
  const [value, setValue] = useState(initial);
  return useMemo(
    () => ({
      value,
      setValue,
    }),
    [value],
  );
}
//#endregion useStateFull

//#region usePrevious
function usePrevious<T = any>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
//#endregion usePrevious
type UseSetArrayStateAction<T extends object> = React.Dispatch<
  SetStateAction<Partial<T>>
>;
type UseSetStateArray<T extends object> = [
  T,
  UseSetArrayStateAction<T>,
  () => void,
];
function useSetStateArray<T extends object>(
  initialValue: T,
): UseSetStateArray<T> {
  const [value, setValue] = useState<T>(initialValue);
  const setState = useCallback(
    (v: SetStateAction<Partial<T>>) => {
      return setValue(oldValue => ({
        ...oldValue,
        ...(typeof v === 'function' ? v(oldValue) : v),
      }));
    },
    [setValue],
  );
  const resetState = useCallback(() => setValue(initialValue), []);

  return [value, setState, resetState];
}
type UseSetStateAction<T extends object> = React.Dispatch<
  SetStateAction<Partial<T>>
>;
type UseSetState<T extends object> = {
  setState: UseSetStateAction<T>;
  state: T;
  resetState: () => void;
};
function useSetState<T extends object>(initialValue: T): UseSetState<T> {
  const [state, setState, resetState] = useSetStateArray(initialValue);
  return useMemo(
    () => ({
      setState,
      resetState,
      state,
    }),
    [setState, resetState, state],
  );
}
function useStyle<T>(style: (theme: AppTheme) => T): T {
  const theme: AppTheme = useTheme();
  return style(theme);
}
export {
  useInterval,
  useDispatch,
  useSelector,
  useClippy,
  useNetWorkStatus,
  useArray,
  useBoolean,
  useNumber,
  useStateFull,
  usePrevious,
  useSetState,
  useStyle,
};
