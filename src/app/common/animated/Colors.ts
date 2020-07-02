import Animated from "react-native-reanimated";

const {
    add,
    multiply,
    proc,
    color,
    greaterThan,
    cond,
} = Animated;
export const colorForBackground = proc(
    (
        r: Animated.Adaptable<number>,
        g: Animated.Adaptable<number>,
        b: Animated.Adaptable<number>
    ) => {
        const L = add(multiply(0.299, r), multiply(0.587, g), multiply(0.114, b));
        return cond(greaterThan(L, 186), color(0, 0, 0), color(255, 255, 255));
    }
);