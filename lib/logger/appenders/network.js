import stream from 'node:stream';
import process from 'node:process';
import { LOGGER_SERVER_PORT, LOGGER_SERVER_HOST } from '../envConstants.js';
import net from 'net';

const create = (ee, eventName, transformer) => {
  const client = new net.Socket();

  client.setEncoding('utf8');

  client.connect(LOGGER_SERVER_PORT, LOGGER_SERVER_HOST, function () {
    console.log('Logger: Connected to server');
  });

  const log = new stream.Writable({
    write(chunk, encoding, next) {
      client.write(chunk);
      next();
    },
  });

  const localTrans = transformer.create();

  const readableLog = new stream.Readable({
    objectMode: true,
    read(size) {
      console.log(size);
    },
  });

  process.on('beforeExit', () => {
    log.destroy();
    readableLog.destroy();
    client.destroy();
    localTrans.destroy();
  });

  readableLog.pipe(localTrans).pipe(log);

  ee.on(eventName, (date, level, category, message) => {
    console.log('network appender');
    readableLog.push({ date, level, category, message });
  });
};

export default { create };
