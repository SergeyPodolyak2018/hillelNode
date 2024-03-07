import { LOG_DELIMETTER } from '../envConstants.js';
import stream from 'node:stream';

const create = () =>
  new stream.Transform({
    writableObjectMode: true,
    transform({ date, level, category, message }, encoding, next) {
      const data = [
        date,
        category,
        level,
        message.map((el) => JSON.stringify(el)).join(LOG_DELIMETTER),
      ].join(',');
      next(null, data + '\n');
    },
  });

export default { create };
