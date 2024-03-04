import stream from 'node:stream';
import process from 'node:process';

const log = new stream.Writable({
  write(chunk, encoding, next) {
    console.log(chunk);
    next();
  },
});

process.on('beforeExit', () => {
  log.destroy();
});

const create = (ee, eventName, transformer) => {
  ee.on(eventName, (date, level, category, message) => {
    console.log('appender log');
    const options = { objectMode: true };
    const readable = stream.Readable.from(
      [{ date, level, category, message }],
      options
    );
    readable.pipe(transformer).pipe(log);
  });
};

export default { create };
