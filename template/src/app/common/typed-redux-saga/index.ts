/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionMatchingPattern, Buffer, SagaIterator } from '@redux-saga/types';
import { Action } from 'redux';
import {
  Channel,
  END,
  FlushableChannel,
  PuttableChannel,
  TakeableChannel,
  Task,
} from 'redux-saga';
import {
  ActionChannelEffect,
  ActionPattern,
  AllEffect,
  CallEffect,
  CallEffectDescriptor,
  CancelEffect,
  CancelledEffect,
  ChannelPutEffect,
  ChannelTakeEffect,
  CpsCallback,
  CpsEffect,
  CpsFunctionParameters,
  Effect,
  FlushEffect,
  ForkEffect,
  GetContextEffect,
  HelperWorkerParameters,
  JoinEffect,
  Pattern,
  PutEffect,
  RaceEffect,
  SelectEffect,
  SetContextEffect,
  Tail,
  TakeEffect,
} from 'redux-saga/effects';
export type SagaReturnType<
  S extends (...args: any[]) => any,
  T = ReturnType<S>,
> = T extends SagaIterator<infer RT>
  ? RT
  : T extends Promise<infer RT>
  ? RT
  : T extends infer RT
  ? RT
  : never;
export type SagaGenerator<RT, E extends Effect = Effect<any, any>> = Generator<
  E,
  RT
>;

export declare function take<A extends Action>(
  pattern?: ActionPattern<A>,
): SagaGenerator<A, TakeEffect>;
export declare function take<T>(
  channel: TakeableChannel<T>,
  multicastPattern?: Pattern<T>,
): SagaGenerator<T, ChannelTakeEffect<T>>;
export declare function take(
  pattern?: ActionPattern,
): SagaGenerator<any, TakeEffect>;

export declare function takeMaybe<A extends Action>(
  pattern?: ActionPattern<A>,
): SagaGenerator<A, TakeEffect>;
export declare function takeMaybe<T>(
  channel: TakeableChannel<T>,
  multicastPattern?: Pattern<T>,
): SagaGenerator<T, ChannelTakeEffect<T>>;
export declare function takeMaybe(
  pattern?: ActionPattern,
): SagaGenerator<any, TakeEffect>;

export declare function takeEvery<P extends ActionPattern>(
  pattern: P,
  worker: (action: ActionMatchingPattern<P>) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeEvery<
  P extends ActionPattern,
  Fn extends (...args: any[]) => any,
>(
  pattern: P,
  worker: Fn,
  ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeEvery<A extends Action>(
  pattern: ActionPattern<A>,
  worker: (action: A) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeEvery<
  A extends Action,
  Fn extends (...args: any[]) => any,
>(
  pattern: ActionPattern<A>,
  worker: Fn,
  ...args: HelperWorkerParameters<A, Fn>
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeEvery<T>(
  channel: TakeableChannel<T>,
  worker: (item: T) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeEvery<T, Fn extends (...args: any[]) => any>(
  channel: TakeableChannel<T>,
  worker: Fn,
  ...args: HelperWorkerParameters<T, Fn>
): SagaGenerator<never, ForkEffect<never>>;

export declare function takeLatest<P extends ActionPattern>(
  pattern: P,
  worker: (action: ActionMatchingPattern<P>) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLatest<
  P extends ActionPattern,
  Fn extends (...args: any[]) => any,
>(
  pattern: P,
  worker: Fn,
  ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLatest<A extends Action>(
  pattern: ActionPattern<A>,
  worker: (action: A) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLatest<
  A extends Action,
  Fn extends (...args: any[]) => any,
>(
  pattern: ActionPattern<A>,
  worker: Fn,
  ...args: HelperWorkerParameters<A, Fn>
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLatest<T>(
  channel: TakeableChannel<T>,
  worker: (item: T) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLatest<T, Fn extends (...args: any[]) => any>(
  channel: TakeableChannel<T>,
  worker: Fn,
  ...args: HelperWorkerParameters<T, Fn>
): SagaGenerator<never, ForkEffect<never>>;

export declare function takeLeading<P extends ActionPattern>(
  pattern: P,
  worker: (action: ActionMatchingPattern<P>) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLeading<
  P extends ActionPattern,
  Fn extends (...args: any[]) => any,
>(
  pattern: P,
  worker: Fn,
  ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLeading<A extends Action>(
  pattern: ActionPattern<A>,
  worker: (action: A) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLeading<
  A extends Action,
  Fn extends (...args: any[]) => any,
>(
  pattern: ActionPattern<A>,
  worker: Fn,
  ...args: HelperWorkerParameters<A, Fn>
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLeading<T>(
  channel: TakeableChannel<T>,
  worker: (item: T) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function takeLeading<T, Fn extends (...args: any[]) => any>(
  channel: TakeableChannel<T>,
  worker: Fn,
  ...args: HelperWorkerParameters<T, Fn>
): SagaGenerator<never, ForkEffect<never>>;

export declare function put<A extends Action>(
  action: A,
): SagaGenerator<A, PutEffect<A>>;
export declare function put<T>(
  channel: PuttableChannel<T>,
  action: T | END,
): SagaGenerator<T, ChannelPutEffect<T>>;

export declare function putResolve<A extends Action>(
  action: A,
): SagaGenerator<A, PutEffect<A>>;

export declare function call<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;
export declare function call<
  Ctx extends {
    [P in Name]: (this: Ctx, ...args: any[]) => any;
  },
  Name extends string,
>(
  ctxAndFnName: [Ctx, Name],
  ...args: Parameters<Ctx[Name]>
): SagaGenerator<
  SagaReturnType<Ctx[Name]>,
  CallEffect<SagaReturnType<Ctx[Name]>>
>;
export declare function call<
  Ctx extends {
    [P in Name]: (this: Ctx, ...args: any[]) => any;
  },
  Name extends string,
>(
  ctxAndFnName: { context: Ctx; fn: Name },
  ...args: Parameters<Ctx[Name]>
): SagaGenerator<
  SagaReturnType<Ctx[Name]>,
  CallEffect<SagaReturnType<Ctx[Name]>>
>;
export declare function call<
  Ctx,
  Fn extends (this: Ctx, ...args: any[]) => any,
>(
  ctxAndFn: [Ctx, Fn],
  ...args: Parameters<Fn>
): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;
export declare function call<
  Ctx,
  Fn extends (this: Ctx, ...args: any[]) => any,
>(
  ctxAndFn: { context: Ctx; fn: Fn },
  ...args: Parameters<Fn>
): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;

export declare function apply<
  Ctx extends {
    [P in Name]: (this: Ctx, ...args: any[]) => any;
  },
  Name extends string,
>(
  ctx: Ctx,
  fnName: Name,
  args: Parameters<Ctx[Name]>,
): SagaGenerator<
  SagaReturnType<Ctx[Name]>,
  CallEffect<SagaReturnType<Ctx[Name]>>
>;
export declare function apply<
  Ctx,
  Fn extends (this: Ctx, ...args: any[]) => any,
>(
  ctx: Ctx,
  fn: Fn,
  args: Parameters<Fn>,
): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;

export declare function cps<Fn extends (cb: CpsCallback<any>) => any>(
  fn: Fn,
): SagaGenerator<ReturnType<Fn>, CpsEffect<ReturnType<Fn>>>;
export declare function cps<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: CpsFunctionParameters<Fn>
): SagaGenerator<ReturnType<Fn>, CpsEffect<ReturnType<Fn>>>;
export declare function cps<
  Ctx extends {
    [P in Name]: (this: Ctx, ...args: any[]) => void;
  },
  Name extends string,
>(
  ctxAndFnName: [Ctx, Name],
  ...args: CpsFunctionParameters<Ctx[Name]>
): SagaGenerator<ReturnType<Ctx[Name]>, CpsEffect<ReturnType<Ctx[Name]>>>;
export declare function cps<
  Ctx extends {
    [P in Name]: (this: Ctx, ...args: any[]) => void;
  },
  Name extends string,
>(
  ctxAndFnName: { context: Ctx; fn: Name },
  ...args: CpsFunctionParameters<Ctx[Name]>
): SagaGenerator<ReturnType<Ctx[Name]>, CpsEffect<ReturnType<Ctx[Name]>>>;
export declare function cps<
  Ctx,
  Fn extends (this: Ctx, ...args: any[]) => void,
>(
  ctxAndFn: [Ctx, Fn],
  ...args: CpsFunctionParameters<Fn>
): SagaGenerator<ReturnType<Fn>, CpsEffect<ReturnType<Fn>>>;
export declare function cps<
  Ctx,
  Fn extends (this: Ctx, ...args: any[]) => void,
>(
  ctxAndFn: { context: Ctx; fn: Fn },
  ...args: CpsFunctionParameters<Fn>
): SagaGenerator<ReturnType<Fn>, CpsEffect<ReturnType<Fn>>>;

// FIXME This should be done upstream.
interface FixedTask<A> extends Task {
  result: <T = A>() => T | undefined;
  toPromise: <T = A>() => Promise<T>;
}
export declare function fork<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): SagaGenerator<FixedTask<SagaReturnType<Fn>>, ForkEffect<SagaReturnType<Fn>>>;
export declare function fork<
  Ctx extends {
    [P in Name]: (this: Ctx, ...args: any[]) => any;
  },
  Name extends string,
>(
  ctxAndFnName: [Ctx, Name],
  ...args: Parameters<Ctx[Name]>
): SagaGenerator<
  FixedTask<SagaReturnType<Ctx[Name]>>,
  ForkEffect<SagaReturnType<Ctx[Name]>>
>;
export declare function fork<
  Ctx extends {
    [P in Name]: (this: Ctx, ...args: any[]) => any;
  },
  Name extends string,
>(
  ctxAndFnName: { context: Ctx; fn: Name },
  ...args: Parameters<Ctx[Name]>
): SagaGenerator<
  FixedTask<SagaReturnType<Ctx[Name]>>,
  ForkEffect<SagaReturnType<Ctx[Name]>>
>;
export declare function fork<
  Ctx,
  Fn extends (this: Ctx, ...args: any[]) => any,
>(
  ctxAndFn: [Ctx, Fn],
  ...args: Parameters<Fn>
): SagaGenerator<FixedTask<SagaReturnType<Fn>>, ForkEffect<SagaReturnType<Fn>>>;
export declare function fork<
  Ctx,
  Fn extends (this: Ctx, ...args: any[]) => any,
>(
  ctxAndFn: { context: Ctx; fn: Fn },
  ...args: Parameters<Fn>
): SagaGenerator<FixedTask<SagaReturnType<Fn>>, ForkEffect<SagaReturnType<Fn>>>;

export declare function spawn<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): SagaGenerator<FixedTask<SagaReturnType<Fn>>, ForkEffect<SagaReturnType<Fn>>>;
export declare function spawn<
  Ctx extends {
    [P in Name]: (this: Ctx, ...args: any[]) => any;
  },
  Name extends string,
>(
  ctxAndFnName: [Ctx, Name],
  ...args: Parameters<Ctx[Name]>
): SagaGenerator<
  FixedTask<SagaReturnType<Ctx[Name]>>,
  ForkEffect<SagaReturnType<Ctx[Name]>>
>;
export declare function spawn<
  Ctx extends {
    [P in Name]: (this: Ctx, ...args: any[]) => any;
  },
  Name extends string,
>(
  ctxAndFnName: { context: Ctx; fn: Name },
  ...args: Parameters<Ctx[Name]>
): SagaGenerator<
  FixedTask<SagaReturnType<Ctx[Name]>>,
  ForkEffect<SagaReturnType<Ctx[Name]>>
>;
export declare function spawn<
  Ctx,
  Fn extends (this: Ctx, ...args: any[]) => any,
>(
  ctxAndFn: [Ctx, Fn],
  ...args: Parameters<Fn>
): SagaGenerator<FixedTask<SagaReturnType<Fn>>, ForkEffect<SagaReturnType<Fn>>>;
export declare function spawn<
  Ctx,
  Fn extends (this: Ctx, ...args: any[]) => any,
>(
  ctxAndFn: { context: Ctx; fn: Fn },
  ...args: Parameters<Fn>
): SagaGenerator<FixedTask<SagaReturnType<Fn>>, ForkEffect<SagaReturnType<Fn>>>;

export declare function join(task: Task): SagaGenerator<void, JoinEffect>;
export declare function join(tasks: Task[]): SagaGenerator<void, JoinEffect>;

export declare function cancel(task: Task): SagaGenerator<void, CancelEffect>;
export declare function cancel(
  tasks: Task[],
): SagaGenerator<void, CancelEffect>;
export declare function cancel(): SagaGenerator<void, CancelEffect>;

export declare function select(): SagaGenerator<any, SelectEffect>;
export declare function select<Fn extends (state: any, ...args: any[]) => any>(
  selector: Fn,
  ...args: Tail<Parameters<Fn>>
): SagaGenerator<ReturnType<Fn>, SelectEffect>;

export declare function actionChannel<A extends Action>(
  pattern: ActionPattern<A>,
  buffer?: Buffer<A>,
): SagaGenerator<Channel<A>, ActionChannelEffect>;
export declare function actionChannel(
  pattern: ActionPattern,
  buffer?: Buffer<Action>,
): SagaGenerator<Channel<Action>, ActionChannelEffect>;

export declare function flush<T>(
  channel: FlushableChannel<T>,
): SagaGenerator<T[], FlushEffect<T>>;

export declare function cancelled(): SagaGenerator<boolean, CancelledEffect>;

// eslint-disable-next-line @typescript-eslint/ban-types
export declare function setContext<C extends object>(
  props: C,
): SagaGenerator<void, SetContextEffect<C>>;

export declare function getContext<T = unknown>(
  prop: string,
): SagaGenerator<T, GetContextEffect>;

export declare function delay<T = true>(
  ms: number,
  val?: T,
): SagaGenerator<T, CallEffect<T>>;

export declare function throttle<P extends ActionPattern>(
  ms: number,
  pattern: P,
  worker: (action: ActionMatchingPattern<P>) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function throttle<
  P extends ActionPattern,
  Fn extends (...args: any[]) => any,
>(
  ms: number,
  pattern: P,
  worker: Fn,
  ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
): SagaGenerator<never, ForkEffect<never>>;
export declare function throttle<A extends Action>(
  ms: number,
  pattern: ActionPattern<A>,
  worker: (action: A) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function throttle<
  A extends Action,
  Fn extends (...args: any[]) => any,
>(
  ms: number,
  pattern: ActionPattern<A>,
  worker: Fn,
  ...args: HelperWorkerParameters<A, Fn>
): SagaGenerator<never, ForkEffect<never>>;
export declare function throttle<T>(
  ms: number,
  channel: TakeableChannel<T>,
  worker: (item: T) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function throttle<T, Fn extends (...args: any[]) => any>(
  ms: number,
  channel: TakeableChannel<T>,
  worker: Fn,
  ...args: HelperWorkerParameters<T, Fn>
): SagaGenerator<never, ForkEffect<never>>;

export declare function debounce<P extends ActionPattern>(
  ms: number,
  pattern: P,
  worker: (action: ActionMatchingPattern<P>) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function debounce<
  P extends ActionPattern,
  Fn extends (...args: any[]) => any,
>(
  ms: number,
  pattern: P,
  worker: Fn,
  ...args: HelperWorkerParameters<ActionMatchingPattern<P>, Fn>
): SagaGenerator<never, ForkEffect<never>>;
export declare function debounce<A extends Action>(
  ms: number,
  pattern: ActionPattern<A>,
  worker: (action: A) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function debounce<
  A extends Action,
  Fn extends (...args: any[]) => any,
>(
  ms: number,
  pattern: ActionPattern<A>,
  worker: Fn,
  ...args: HelperWorkerParameters<A, Fn>
): SagaGenerator<never, ForkEffect<never>>;

export declare function debounce<T>(
  ms: number,
  channel: TakeableChannel<T>,
  worker: (item: T) => any,
): SagaGenerator<never, ForkEffect<never>>;
export declare function debounce<T, Fn extends (...args: any[]) => any>(
  ms: number,
  channel: TakeableChannel<T>,
  worker: Fn,
  ...args: HelperWorkerParameters<T, Fn>
): SagaGenerator<never, ForkEffect<never>>;

export declare function retry<Fn extends (...args: any[]) => any>(
  maxTries: number,
  delayLength: number,
  fn: Fn,
  ...args: Parameters<Fn>
): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>>;

type EffectReturnType<T> = T extends SagaGenerator<infer RT, any>
  ? RT
  : T extends CallEffect
  ? T['payload'] extends CallEffectDescriptor<infer RT>
    ? RT
    : never
  : T extends TakeEffect
  ? ActionPattern
  : unknown;

export declare function all<T>(
  effects: T[],
): SagaGenerator<EffectReturnType<T>[], AllEffect<T>>;
export declare function all<T extends { [key: string]: any }>(
  effects: T,
): SagaGenerator<
  { [K in keyof T]: EffectReturnType<T[K]> },
  AllEffect<T[keyof T]>
>;

export declare function race<T>(
  effects: T[],
): SagaGenerator<(EffectReturnType<T> | undefined)[], RaceEffect<T>>;
export declare function race<T extends { [key: string]: any }>(
  effects: T,
): SagaGenerator<
  { [K in keyof T]: EffectReturnType<T[K]> | undefined },
  RaceEffect<T[keyof T]>
>;
