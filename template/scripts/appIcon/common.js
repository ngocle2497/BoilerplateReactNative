/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

module.exports = {
  getConfig: () => {
    const argv = process.argv.slice(2);
    console.log(argv);
    if (argv.length <= 0 || !fs.existsSync(argv[0])) {
      throw new Error('Path App Icon invalid!');
    }
    const params = argv.slice(1);
    const obj = {};
    params.forEach(e => {
      const split = e.replace('--', '').split('=');
      if (split.length === 2) {
        const [key, value] = split;
        if (value === 'true' || value === 'false') {
          obj[key] = value === 'true';
        } else {
          obj[key] = value;
        }
      }
    });
    console.log({ obj });
    return {
      pathImage: argv[0],
      withIpad: obj?.ipad || false,
      appIconFolderName: obj?.iconName,
    };
  },
  mergeArray: (arr1, arr2) => {
    const merged = [...arr1, ...arr2];
    return merged.filter((item, pos) => merged.indexOf(item) === pos);
  },
};
