import { LOG_DELIMETTER } from '../envConstants.js';
import stream from 'node:stream';

const create = () =>
  new stream.Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform({ date, level, category, message }, encoding, next) {
      const data = {
        date,
        category,
        level,
        message: message.map((el) => JSON.stringify(el)).join(LOG_DELIMETTER),
      };
      const res = JSON.stringify(data, null, 2) + ',';
      next(null, res);
    },
  });

export default { create };
