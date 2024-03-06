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

  process.on('beforeExit', () => {
    log.destroy();
    client.destroy();
  });

  ee.on(eventName, (date, level, category, message) => {
    const options = { objectMode: true };
    const readable = stream.Readable.from(
      [{ date, level, category, message }],
      options
    );
    readable.pipe(transformer).pipe(log);
  });
};

export default { create };
