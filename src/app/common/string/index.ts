import equals from 'react-fast-compare';
export const onChangeAlias = (value: string | number): string => {
  var str = value + '';
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
export const padStart = (value, maxPad = 2, stringPad = '0') => {
  const stringP = Array(maxPad)
    .fill(stringPad)
    .join('');
  return String(stringP + value).slice(-maxPad);
};
export const padEnd = (value, maxPad = 2, stringPad = '1') => {
  const stringP = Array(maxPad)
    .fill(stringPad)
    .join('');
  return String(value + stringP).slice(0, maxPad);
};
export const replaceAll = (source = '', textReplace = '', textInstead = '') => {
  return source.split(textReplace).join(textInstead);
};
export const removeHtmlTag = (source = '') => {
  return source.replace(/<\/?[^>]+(>|$)/g, '');
};
export const compareValue = (val1: any, val2: any) => {
  return equals(val1, val2);
};
export const removeChar = (source = '') => {
  return source.replace(/[^0-9]/g, '');
};
