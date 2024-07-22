/* eslint-disable no-extend-native */

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.changeAlias = function () {
  let str = this.toLowerCase();

  // Replace Vietnamese diacritics
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');

  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');

  str = str.replace(/[ìíịỉĩ]/g, 'i');

  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');

  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');

  str = str.replace(/[ỳýỵỷỹ]/g, 'y');

  str = str.replace(/đ/g, 'd');

  // Remove special characters
  str = str.replace(/[!@%^*()+=<>,.?/:;'"&#[]~$_`{|}|\\-]+/g, '');

  // Replace multiple spaces with single space
  str = str.replace(/ +/g, ' ');

  // Trim leading and trailing spaces
  str = str.trim();

  return str;
};

String.prototype.isEmpty = function () {
  return this.trim().length === 0;
};

String.prototype.removeChar = function () {
  return this.replace(/\D/g, '');
};

String.prototype.getURL = function () {
  // Simplified URL detection regex
  const detectUrls =
    /\b(?:https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|$!:,.;]*[A-Z0-9+&@#/%=~_|$]/gi;

  return this.match(detectUrls) || [];
};

export {};
