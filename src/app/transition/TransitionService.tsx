import * as React from 'react';
import { TransitioningView, Transition } from 'react-native-reanimated'
export const _transitionApp = React.createRef<TransitioningView>();

const DURATION = 150;

export function requestAnimation() {
    _transitionApp.current?.animateNextTransition();
}
export const transition = (
    <Transition.Together>
        <Transition.In type="fade" interpolation='easeInOut' durationMs={DURATION} />
        <Transition.Out type="fade" interpolation='easeInOut' durationMs={DURATION} />
        <Transition.Change interpolation="linear" durationMs={DURATION} />
    </Transition.Together>
);
