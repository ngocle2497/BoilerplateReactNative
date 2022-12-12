/* eslint-disable no-extend-native */
export {};

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

Number.prototype.toStringKMG = function (digits = 1) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const thisValue = Number(this);
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (l) {
      return thisValue >= l.value;
    });
  return item
    ? (thisValue / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};
