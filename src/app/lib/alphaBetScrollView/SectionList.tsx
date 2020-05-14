import React, { memo, useMemo, useRef } from 'react'
import { View, SectionList } from 'react-native'
import Alphabet from './alphabet/AlphabetContainer'
import isEqual from 'react-fast-compare'
import { ListAlphabetProps, ItemData } from './type'
import ItemList from './ItemList'
import HeaderList from './HeaderList'
import { styles } from './style';
import { useValues } from 'react-native-redash'
import { useCode, call, set, cond, eq, onChange } from 'react-native-reanimated'

const SectionListComponent = ({ data, renderItem, containerHeaderStyle, headerTextStyle, onItemPress, renderHeader, itemTextStyle, containerItemStyle }: ListAlphabetProps) => {

    const _sectionRef = useRef<SectionList>()
    const [selectedAlphaIndex] = useValues([0])

    const _keyExtractor = (item: any, index: number) => item + index;
    const _renderItem = ({ item, index }: { item: ItemData, index: number }) => {
        if (typeof renderItem === 'function') {
            return renderItem(item, index)
        }
        return <ItemList onItemPress={onItemPress} index={index} itemTextStyle={itemTextStyle} containerItemStyle={containerItemStyle} item={item} />
    }
    const _renderSectionHeader = (info: { section: any }) => {
        if (typeof renderHeader === 'function') {
            return renderHeader(info.section)
        }
        return <HeaderList key={info.section.title} containerHeaderStyle={containerHeaderStyle} headerTextStyle={headerTextStyle} data={info.section} />
    }
    const dataTitle = useMemo(() => data.map(x => ({ title: x.title })), [data])
    const handlerScroll = (index: number) => {
        if (_sectionRef.current) {
            _sectionRef.current.scrollToLocation({ itemIndex: 0, sectionIndex: index, animated: false, viewPosition: 0 })
        }
    }
    useCode(() => call([selectedAlphaIndex], ([selectedAlphaIndex]) => {
        handlerScroll(selectedAlphaIndex)
    }), [selectedAlphaIndex])
    return (
        <View style={styles.root}>
            <SectionList
                ref={_sectionRef}
                style={styles.container}
                sections={data}
                onScrollToIndexFailed={info => { }}
                stickySectionHeadersEnabled={true}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                renderSectionHeader={_renderSectionHeader}
                showsVerticalScrollIndicator={false}
            />
            <Alphabet handlerScroll={handlerScroll} selectedAlphaIndex={selectedAlphaIndex} dataTitle={dataTitle} />
        </View>
    )
}

export default memo(SectionListComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))
