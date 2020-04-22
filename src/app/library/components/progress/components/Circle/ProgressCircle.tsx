import React from 'react'
import { Circular } from "./Circular";
import { StyleSheet, View } from "react-native";
import { ProgressCircleProps } from "./ProgressCircle.props";
import { Text } from '../../../Text/Text';
import { mergeAll, flatten } from 'ramda';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    textProgress: {
        position: 'absolute',
        zIndex: 3,
        alignSelf: 'center',
    }
});

export const ProgressCircle = (props: ProgressCircleProps) => {
    const { bg, fg, radius, progress, strokeWidth, showTextProgress, textProgressStyle } = props;
    const textStyles = mergeAll(flatten([styles.textProgress, textProgressStyle]))
    const renderText = (): string => {
        if (progress < 0) {
            return 0 + "";
        }
        if (progress > 100) {
            return 100 + "";
        }
        return progress + "";
    }
    return (
        <View style={styles.container}>
            {showTextProgress && <Text style={[textStyles]} text={renderText()} />}
            <View>
                <Circular bg={bg} fg={fg} radius={radius} progress={progress} />
            </View>
            <View style={styles.overlay}>
                <View
                    style={{
                        width: radius * 2 - strokeWidth,
                        height: radius * 2 - strokeWidth,
                        borderRadius: radius - strokeWidth / 2,
                        backgroundColor: bg,
                    }}
                />
            </View>
        </View>
    );
}