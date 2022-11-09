/* eslint-disable no-extend-native */

Number.prototype.toTime = function () {
  let totalSeconds = Number(this);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return {
    hours,
    minutes,
    seconds,
  };
};

Number.prototype.currencyFormat = function (comma = ',') {
  return String(this).replace(/(\d)(?=(\d{3})+\b)/g, `$1${comma}`);
};

Number.prototype.roundMaxFixed = function (maxDecimals = 2) {
  return Number(
    Math.round(Number(String(this + 'e' + maxDecimals))) + 'e-' + maxDecimals,
  );
};

export {};
