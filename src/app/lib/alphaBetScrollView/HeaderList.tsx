import React, { memo, useMemo } from 'react'
import { Text, View } from 'react-native'
import isEqual from 'react-fast-compare'
import { HeaderListProps } from './type'
import { styles } from './style';
import { flatten, mergeAll } from 'ramda';
const HeaderListComponent = ({ data, containerHeaderStyle = {}, headerTextStyle = {} }: HeaderListProps) => {
    // style

    const containerStyle = useMemo(() => mergeAll(flatten([styles.wrapHeader, containerHeaderStyle])), [containerHeaderStyle])
    const textStyle = useMemo(() => mergeAll(flatten([styles.headerTextStyle, headerTextStyle])), [headerTextStyle])

    // render
    return (
        <View style={containerStyle}>
            <Text style={textStyle} numberOfLines={1}>{data.title}</Text>
        </View>
    )
}

export default memo(HeaderListComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))

