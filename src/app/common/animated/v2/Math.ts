export const sharedClamp = (
  value: number,
  lowerValue: number,
  upperValue: number,
) => {
  "worklet";
  return Math.min(Math.max(lowerValue, value), upperValue);
};
export const sharedMin = (...args: number[]) => {
  "worklet";
  return args.reduce((acc, arg) => Math.min(acc, arg));
};

export const SharedSnapPoint = (
  value: number,
  velocity: number,
  points: number[],
) => {
  "worklet";
  const point = value + velocity * 0.2;
  const diffPoint = (p: number) => Math.abs(point - p);
  const deltas = points.map((p) => diffPoint(p));
  const minDelta = sharedMin(...deltas);
  return points.reduce((acc, p) => (diffPoint(p) === minDelta ? p : acc), 0);
};
