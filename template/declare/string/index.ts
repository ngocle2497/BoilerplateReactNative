/* eslint-disable no-extend-native */
import { processColor } from 'react-native';

import { KANA_FULL_HALF_MAP } from './constant';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.changeAlias = function () {
  let str = this + '';
  str = str.toLowerCase();

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');

  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');

  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');

  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');

  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');

  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');

  str = str.replace(/đ/g, 'd');

  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    '',
  );

  str = str.replace(/ + /g, ' ');

  str = str.trim();

  return str;
};

String.prototype.removeHtmlTag = function () {
  return this.replace(/<\/?[^>]+(>|$)/g, '');
};

String.prototype.isEmpty = function () {
  return this.trim().length === 0;
};

String.prototype.removeChar = function () {
  return this.replace(/\D/g, '');
};

String.prototype.getURL = function () {
  const detectUrls =
    /((?:[a-z]+:\/\/)?(?:(?:[a-z0-9\-]+\.)+(?:[a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(?::[0-9]{1,5})?(?:\/[a-z0-9_\-.~]+)*(?:\/(?:[a-z0-9_\-.]*)(?:\?[a-z0-9+_\-.%=&amp;]*)?)?(?:#[a-zA-Z0-9!$&'(?:)*+.=-_~:@/?]*)?)(?:\s+|$)/;

  return this.split(detectUrls).filter(v => detectUrls.test(v));
};

String.prototype.replaceAll = function (
  searchValue: string,
  replaceValue: string,
) {
  return this.split(searchValue).join(replaceValue);
};

String.prototype.toHexColor = function () {
  const processedColor = processColor(this as string);

  const colorStr = `${(processedColor ?? '').toString(16)}`;

  const withoutAlpha = colorStr.substring(2, colorStr.length);

  const alpha = colorStr.substring(0, 2);

  return `#${withoutAlpha}${alpha}`;
};

String.prototype.toHalfWidth = function () {
  const reg = new RegExp(
    '(' + Object.keys(KANA_FULL_HALF_MAP).join('|') + ')',
    'g',
  );

  return this.replace(reg, function (match) {
    return KANA_FULL_HALF_MAP[match];
  })
    .replace(/゛/g, 'ﾞ')
    .replace(/゜/g, 'ﾟ');
};

String.prototype.toFullWidth = function () {
  const kanaHalfFullMap: Record<string, string> = {};

  Object.keys(KANA_FULL_HALF_MAP).forEach(key => {
    kanaHalfFullMap[KANA_FULL_HALF_MAP[key]] = key;
  });

  const reg = new RegExp(
    '(' + Object.keys(kanaHalfFullMap).join('|') + ')',
    'g',
  );

  return this.replace(reg, function (match) {
    return kanaHalfFullMap[match];
  })
    .replace(/ﾞ/g, '゛')
    .replace(/ﾟ/g, '゜');
};

String.prototype.randomUniqueId = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
};

export {};
