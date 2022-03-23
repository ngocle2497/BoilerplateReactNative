import {
  actionChannel as rawActionChannel,
  all as rawAll,
  apply as rawApply,
  call as rawCall,
  cancel as rawCancel,
  cancelled as rawCancelled,
  cps as rawCps,
  debounce as rawDebounce,
  delay as rawDelay,
  flush as rawFlush,
  fork as rawFork,
  getContext as rawGetContext,
  join as rawJoin,
  put as rawPut,
  putResolve as rawPutResolve,
  race as rawRace,
  retry as rawRetry,
  select as rawSelect,
  setContext as rawSetContext,
  spawn as rawSpawn,
  take as rawTake,
  takeEvery as rawTakeEvery,
  takeLatest as rawTakeLatest,
  takeLeading as rawTakeLeading,
  takeMaybe as rawTakeMaybe,
  throttle as rawThrottle,
} from 'redux-saga/effects';

export function* take(...args) {
  return yield rawTake(...args);
}

export function* takeMaybe(...args) {
  return yield rawTakeMaybe(...args);
}

export function* takeEvery(...args) {
  return yield rawTakeEvery(...args);
}

export function* takeLatest(...args) {
  return yield rawTakeLatest(...args);
}

export function* takeLeading(...args) {
  return yield rawTakeLeading(...args);
}

export function* put(...args) {
  return yield rawPut(...args);
}

export function* putResolve(...args) {
  return yield rawPutResolve(...args);
}

export function* call(...args) {
  return yield rawCall(...args);
}

export function* apply(...args) {
  return yield rawApply(...args);
}

export function* cps(...args) {
  return yield rawCps(...args);
}

export function* fork(...args) {
  return yield rawFork(...args);
}

export function* spawn(...args) {
  return yield rawSpawn(...args);
}

export function* join(...args) {
  return yield rawJoin(...args);
}

export function* cancel(...args) {
  return yield rawCancel(...args);
}

export function* select(...args) {
  return yield rawSelect(...args);
}

export function* actionChannel(...args) {
  return yield rawActionChannel(...args);
}

export function* flush(...args) {
  return yield rawFlush(...args);
}

export function* cancelled(...args) {
  return yield rawCancelled(...args);
}

export function* setContext(...args) {
  return yield rawSetContext(...args);
}

export function* getContext(...args) {
  return yield rawGetContext(...args);
}

export function* delay(...args) {
  return yield rawDelay(...args);
}

export function* throttle(...args) {
  return yield rawThrottle(...args);
}

export function* debounce(...args) {
  return yield rawDebounce(...args);
}

export function* retry(...args) {
  return yield rawRetry(...args);
}

export function* all(...args) {
  return yield rawAll(...args);
}

export function* race(...args) {
  return yield rawRace(...args);
}
