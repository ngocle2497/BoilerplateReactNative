export const sharedClamp = (
  value: number,
  lowerValue: number,
  upperValue: number,
) => {
  'worklet';
  return Math.min(Math.max(lowerValue, value), upperValue);
};
export const sharedSub = (...args: number[]) => {
  'worklet';
  if (args.length <= 0) {
    return 0;
  }
  return args
    .slice(1)
    .reduce((accumulator, curr) => accumulator - curr, args[0]);
};
export const sharedMin = (...args: number[]) => {
  'worklet';
  return args.reduce((accumulator, curr) => Math.min(curr, accumulator));
};
export const sharedMax = (...args: number[]) => {
  'worklet';
  return args.reduce((accumulator, curr) => Math.max(accumulator, curr));
};
export const SharedSnapPoint = (
  value: number,
  velocity: number,
  points: number[],
) => {
  'worklet';
  const point = value + velocity * 0.2;
  const diffPoint = (p: number) => Math.abs(point - p);
  const deltas = points.map((p) => diffPoint(p));
  const minDelta = sharedMin(...deltas);
  return points.reduce((acc, p) => (diffPoint(p) === minDelta ? p : acc), 0);
};
export const sharedToDeg = (rad: number) => {
  'worklet';
  return (rad * 180) / Math.PI;
};
export const sharedToRad = (deg: number) => {
  'worklet';
  return (deg * Math.PI) / 180;
};
export const sharedAvg = (...args: number[]) => {
  'worklet';
  return args.reduce((a, v) => a + v, 0) / args.length;
};
export const sharedRound = (value: number, precision = 0) => {
  'worklet';
  const p = Math.pow(10, precision);
  return Math.round(value * p) / p;
};
export const sharedBin = (value: boolean): 0 | 1 => {
  'worklet';
  return value ? 1 : 0;
};
