import stream from 'node:stream';
import process from 'node:process';

const create = (ee, eventName, transformer) => {
  const log = new stream.Writable({
    write(chunk, encoding, next) {
      console.log(chunk);
      next();
    },
  });
  const readable = new stream.Readable({
    objectMode: true,
    read(size) {
      console.log(size);
    },
  });

  const localTrans = transformer.create();

  process.on('beforeExit', () => {
    log.destroy();
    localTrans.destroy();
  });

  readable.pipe(transformer).pipe(log);

  ee.on(eventName, (date, level, category, message) => {
    console.log('appender log');
    readable.push({ date, level, category, message });
  });
};

export default { create };
