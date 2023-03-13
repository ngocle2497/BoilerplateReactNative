/**
 * Clamp value on UI thread.
 */
export const sharedClamp = (
  value: number,
  lowerValue: number,
  upperValue: number,
) => {
  'worklet';

  return Math.min(Math.max(lowerValue, value), upperValue);
};

/**
 * Takes two or more animated nodes or values, and when evaluated,
 * returns the result of subtracting their values in the exact order on UI thread
 */
export const sharedSub = (...args: number[]) => {
  'worklet';
  if (args.length <= 0) {
    return 0;
  }

  return args
    .slice(1)
    .reduce((accumulator, curr) => accumulator - curr, args[0]);
};

/**
 * Get min number of array parameters on UI thread.
 */
export const sharedMin = (...args: number[]) => {
  'worklet';

  return args.reduce((accumulator, curr) => Math.min(curr, accumulator));
};

/**
 * Get max number of array parameters on UI thread.
 */
export const sharedMax = (...args: number[]) => {
  'worklet';

  return args.reduce((accumulator, curr) => Math.max(accumulator, curr));
};

/**
 * Select a point where the animation should snap to given the value of the gesture and it's velocity on UI thread.
 */
export const sharedSnapPoint = (
  value: number,
  velocity: number,
  points: number[],
) => {
  'worklet';
  const point = value + velocity * 0.2;

  const diffPoint = (p: number) => Math.abs(point - p);

  const deltas = points.map(p => diffPoint(p));

  const minDelta = sharedMin(...deltas);

  return points.reduce((acc, p) => (diffPoint(p) === minDelta ? p : acc), 0);
};

/**
 * Convert radian to degree on UI thread.
 */
export const sharedToDeg = (rad: number) => {
  'worklet';

  return (rad * 180) / Math.PI;
};

/**
 * Convert degree to radian on UI thread.
 */
export const sharedToRad = (deg: number) => {
  'worklet';

  return (deg * Math.PI) / 180;
};

/**
 * Calculator the average value of an array parameters UI thread.
 */
export const sharedAvg = (...args: number[]) => {
  'worklet';

  return args.reduce((a, v) => a + v, 0) / args.length;
};

/**
 * Round number of UI thread.
 */
export const sharedRound = (value: number, precision = 0) => {
  'worklet';
  const p = Math.pow(10, precision);

  return Math.round(value * p) / p;
};

/**
 * Convert boolean to 0 or 1 on UI thead
 */
export const sharedBin = (value: boolean): 0 | 1 => {
  'worklet';

  return value ? 1 : 0;
};
