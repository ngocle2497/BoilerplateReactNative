import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    root:{
        flex: 1,
        width: '100%',
        position:'relative',
        justifyContent:'center'
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },
    wrapHeader: {
        paddingVertical: 5,
        backgroundColor: '#dbdbdb',
        paddingLeft: 5,
    },
    wrapItem: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 5,
        paddingVertical: 5,
    },
    headerTextStyle: {
        color: '#000000'
    },
    itemTextStyle: {
        color: '#333333'
    },
    containerAlphabet:{
        position:'absolute',
        right: 0,
        alignSelf:'center',
        backgroundColor: 'green',
    }
})