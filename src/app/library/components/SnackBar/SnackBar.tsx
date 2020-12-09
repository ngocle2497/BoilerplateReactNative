import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DURATION_HIDE } from './constants';
import { SnackItem } from './SnackBarItem';
import { Item, SnackBarProps, TypeMessage } from './type';

const styles = StyleSheet.create({
    container: {
        minHeight: 50,
        paddingHorizontal: 15
    }
})

const SnackBarComponent = forwardRef((props: SnackBarProps, ref) => {
    const inset = useSafeAreaInsets()
    useImperativeHandle(
        ref,
        () => ({
            show: (msg: string, interval: number = DURATION_HIDE, type: TypeMessage = 'success') => {
                setData(d => d.concat(
                    [
                        {
                            id: new Date().getTime(),
                            msg,
                            type,
                            interval,
                        }
                    ]))
            }
        }),
        [],
    )
    const [data, setData] = useState<Item[]>([])
    const _onPop = useCallback(
        (item: Item) => {
            setData(d => d.filter(x => x.id !== item.id))
        },
        [],
    )
    const _renderItem = useCallback((item: Item) => <SnackItem key={item.id} {...{ item, onPop: _onPop }} {...props} />, [])
    return (
        <Animated.View pointerEvents={'box-none'} style={[StyleSheet.absoluteFillObject, styles.container, { marginTop: inset.top }]}>
            {data.map(_renderItem)}
        </Animated.View>
    )
})
export type SnackBarRef = {
    show: (msg: string, interval?: number, type?: TypeMessage) => void;
}
export const SnackBar = memo(SnackBarComponent, isEqual)