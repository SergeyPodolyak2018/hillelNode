import { LOG_DELIMETTER } from '../envConstants.js';
import stream from 'node:stream';

const formater = new stream.Transform({
  //readableObjectMode: true,
  writableObjectMode: true,
  transform({ date, level, category, message }, encoding, next) {
    console.log('formater csv');
    const data = [
      date,
      category,
      level,
      message.map((el) => JSON.stringify(el)).join(LOG_DELIMETTER),
    ].join(',');
    next(null, data + '\n');
  },
});

export default formater;
