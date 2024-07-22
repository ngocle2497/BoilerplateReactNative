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
  const numberStr = this.toString();

  console.log(numberStr);

  // Split the number into integer and decimal parts
  let [integerPart, decimalPart] = numberStr.split('.');

  // Function to add commas to a part of the number
  function addCommas(part: string) {
    let result = '';
    let count = 0;

    // Traverse the part from right to left and add commas
    for (let i = part.length - 1; i >= 0; i--) {
      result = part[i] + result;

      count++;

      if (count === 3 && i !== 0) {
        result = comma + result;

        count = 0;
      }
    }

    return result;
  }

  // Format integer and decimal parts
  integerPart = addCommas(integerPart);

  if (decimalPart) {
    decimalPart = addCommas(decimalPart);

    return `${integerPart}.${decimalPart}`;
  } else {
    return integerPart;
  }
};

Number.prototype.roundMaxFixed = function (maxDecimals = 2) {
  return Number(
    Math.round(Number(String(this + 'e' + maxDecimals))) + 'e-' + maxDecimals,
  );
};

Number.prototype.toStringKMG = function () {
  const abbreviations = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

  let actualNumber = Number(this);
  let index = 0;
  while (actualNumber >= 1000 && index < abbreviations.length - 1) {
    actualNumber /= 1000;

    index++;
  }

  return Math.floor(actualNumber * 10) / 10 + abbreviations[index];
};
