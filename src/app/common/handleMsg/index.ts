export const HandleMsg = msg => {
  switch (typeof msg) {
    case 'object':
      if (msg[Object.keys(msg)[0]][0]) {
        return msg[Object.keys(msg)[0]][0];
      }
      return msg[Object.keys(msg)[0]];
    case 'string':
      return msg;
    case 'undefined':
    case 'boolean':
    case 'function':
    case 'bigint':
    case 'symbol':
    case 'number':
      return '';
    default:
      return '';
  }
};
