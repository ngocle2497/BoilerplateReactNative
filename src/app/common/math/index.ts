export const isNumber = (num: any) => {
    return !isNaN(parseFloat(String(num)));
};
export const tryParseNumber = (num: any) => {
    if (isNumber(num)) {
        return parseFloat(String(num));
    }
    return num;
};

