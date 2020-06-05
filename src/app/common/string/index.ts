import equals from 'react-fast-compare'
export const onChangeAlias = (value: string | number): string => {
    var str = value + "";
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' ',
    );
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    return str;
};
export const padEnd = (value: string, lengthPad: number, textEntry?: string): string => {
    if (!value) {
        return '';
    }
    if (typeof value !== 'string') {
        return ''
    }
    let str = value.trim();

    if (str.length <= lengthPad) {
        return str;
    }
    str = str.slice(0, lengthPad) + Array(str.slice(lengthPad, str.length).length).fill(0).map((x: string) => textEntry ?? "*").join('');
    return str;
}
export const padStart = (value: string, lengthPad: number, textEntry?: string): string => {
    if (!value) {
        return '';
    }
    if (typeof value !== 'string') {
        return ''
    }
    let str = value.trim();

    if (str.length <= lengthPad) {
        return str;
    }
    str = Array(str.slice(lengthPad, str.length).length).fill(0).map((x: string) => textEntry ?? "*").join('') + str.slice(lengthPad);
    return str;
}
export const compareValue = (val1: any, val2: any) => {
    return equals(val1, val2);
};