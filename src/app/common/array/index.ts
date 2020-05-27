import { onChangeAlias } from '../string/index';

export const onSearchAllProperties = (source: Array<any>, textSearch: string | number): Array<any> => {
    return source.filter(x => onChangeAlias(Object.values(x).join('')).search(onChangeAlias(textSearch)))
}