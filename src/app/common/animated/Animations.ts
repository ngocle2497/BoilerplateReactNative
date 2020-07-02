import Animated from "react-native-reanimated";
import { clamp, max, min } from "./Math";

export type SpringConfig = Partial<Omit<Animated.SpringConfig, "toValue">>;
export type TimingConfig = Partial<Omit<Animated.TimingConfig, "toValue">>;

const {
    Value,
    set,
    add,
    multiply,
    cond,
    eq,
    block,
    defined,
    abs,
    sub,
    lessThan,
    divide,
    modulo,
    proc,
} = Animated;

export const mix = proc(
    (
        value: Animated.Adaptable<number>,
        x: Animated.Adaptable<number>,
        y: Animated.Adaptable<number>
    ) => add(x, multiply(value, sub(y, x)))
);

export const step = proc(
    (value: Animated.Adaptable<number>, edge: Animated.Adaptable<number>) =>
        lessThan(value, edge)
);

export const smoothStep = proc(
    (
        value: Animated.Adaptable<number>,
        edge0: Animated.Adaptable<number>,
        edge1: Animated.Adaptable<number>
    ) => {
        const t = clamp(divide(sub(value, edge0), sub(edge1, edge0)), 0, 1);
        return multiply(t, t, sub(3, multiply(2, t)));
    }
);

export const diff = (v: Animated.Node<number>) => {
    const stash = new Value(0);
    const prev = new Value<number>();
    return block([
        set(stash, cond(defined(prev), sub(v, prev), 0)),
        set(prev, v),
        stash,
    ]);
};

export const diffClamp = (
    a: Animated.Node<number>,
    minVal: Animated.Adaptable<number>,
    maxVal: Animated.Adaptable<number>
) => {
    const value = new Value<number>();
    return set(
        value,
        min(max(add(cond(defined(value), value, a), diff(a)), minVal), maxVal)
    );
};

export const snapPoint = (
    value: Animated.Adaptable<number>,
    velocity: Animated.Adaptable<number>,
    points: Animated.Adaptable<number>[]
) => {
    const point = add(value, multiply(0.2, velocity));
    const diffPoint = (p: Animated.Adaptable<number>) => abs(sub(point, p));
    const deltas = points.map((p) => diffPoint(p));
    const minDelta = min(...deltas);
    return points.reduce(
        (acc, p) => cond(eq(diffPoint(p), minDelta), p, acc),
        new Value()
    ) as Animated.Node<number>;
};

export const addTo = proc(
    (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
        set(value, add(value, node))
);

export const subTo = proc(
    (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
        set(value, sub(value, node))
);

export const multiplyTo = proc(
    (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
        set(value, multiply(value, node))
);

export const divideTo = proc(
    (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
        set(value, divide(value, node))
);

export const moduloTo = proc(
    (value: Animated.Value<number>, node: Animated.Adaptable<number>) =>
        set(value, modulo(value, node))
);