import {
  take as rawTake,
  takeMaybe as rawTakeMaybe,
  takeEvery as rawTakeEvery,
  takeLatest as rawTakeLatest,
  takeLeading as rawTakeLeading,
  put as rawPut,
  putResolve as rawPutResolve,
  call as rawCall,
  apply as rawApply,
  cps as rawCps,
  fork as rawFork,
  spawn as rawSpawn,
  join as rawJoin,
  cancel as rawCancel,
  select as rawSelect,
  actionChannel as rawActionChannel,
  flush as rawFlush,
  cancelled as rawCancelled,
  setContext as rawSetContext,
  getContext as rawGetContext,
  delay as rawDelay,
  throttle as rawThrottle,
  debounce as rawDebounce,
  retry as rawRetry,
  all as rawAll,
  race as rawRace,
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
