import { StyleSheet } from "react-native"

export const MAX_HEIGHT = 250

export const styles = StyleSheet.create({
    wrap: {
        width: '100%'
    },
    buttonDrop: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 0,
        paddingVertical: 8,
        paddingLeft: 5,
    },
    row: {
        flexDirection: 'row'
    },
    wrapList: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        position: 'absolute',
        maxHeight: MAX_HEIGHT,
        zIndex: 999
    },
    backDrop: {
        position: 'absolute',
        left: 0,
        opacity:0,
        zIndex: 998,
    },
    root: {
        width: '100%',
        zIndex: 999
    },
    text: {
        flex: 1,
    }
})

export const stylesItem = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingVertical: 15,
        width:'100%',
        paddingLeft:5,
        backgroundColor: '#FFFFFF',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        borderRadius: 0,
    },
    textOption:{
        fontFamily:undefined,
        fontSize:14,
        fontWeight:'normal'
    }
})