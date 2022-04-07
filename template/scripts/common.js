/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

module.exports = {
  loadEnvFile: () => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join('./', process.argv[2]), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        const envJson = data.split('\n').reduce((prev, curr) => {
          const firstEqualSign = curr.indexOf('=');
          const key = curr.slice(0, firstEqualSign);
          const value = curr.slice(firstEqualSign + 1);
          prev[key] = value;
          return prev;
        }, {});
        console.log({ envJson });
        resolve(envJson);
      });
    });
  },
};
