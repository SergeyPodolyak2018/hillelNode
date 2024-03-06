import { LOG_DELIMETTER } from '../envConstants.js';
import stream from 'node:stream';

// const formater = new stream.Transform({
//   readableObjectMode: true,
//   writableObjectMode: true,
//   transform({ date, level, category, message }, encoding, next) {
//     const data = `Date: ${date}, category:${category}, level:${level}, message:${message
//       .map((el) => JSON.stringify(el))
//       .join(LOG_DELIMETTER)}\n`;
//     next(null, data);
//   },
// });

const create = () =>
  new stream.Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform({ date, level, category, message }, encoding, next) {
      const data = `Date: ${date}, category:${category}, level:${level}, message:${message
        .map((el) => JSON.stringify(el))
        .join(LOG_DELIMETTER)}\n`;
      next(null, data);
    },
  });

export default { create };
