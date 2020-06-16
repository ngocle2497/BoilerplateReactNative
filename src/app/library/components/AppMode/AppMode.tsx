import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { App_Mode } from '@store/app_redux/type';
import isEqual from 'react-fast-compare';
const modeToString = (mode: App_Mode): string => {
    switch (mode) {
        case 'dev':
            return "Dev Mode";
        case 'prod':
            return "Prod Mode";
        case 'staging':
            return "Staging Mode";
        default:
            return "";
    }
}
const AppModeComponent = ({ appMode }: { appMode: App_Mode }) => {
    return (
        <View pointerEvents={'none'} style={[styles.wrapMode]}>
            <Text adjustsFontSizeToFit={true} style={[styles.textMode]}>{modeToString(appMode)}</Text>
        </View>
    )
}

export const AppMode = memo(AppModeComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))

const styles = StyleSheet.create({
    textMode: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 11,
        textAlign: 'center'
    },
    wrapMode: {
        position: 'absolute',
        right: -20,
        top: 0,
        zIndex: 999,
        width: 150,
        backgroundColor: '#bc9372',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        transform: [{ rotate: '45deg' }, { translateX: 30 }]
    }
})
