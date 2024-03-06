import fs from 'fs';
import stream from 'node:stream';
import { MAIN_LOG_FILE, ERROR_LOG_FILE } from '../envConstants.js';
import { level as constLevele } from '../constants.js';
import process from 'node:process';

const create = (ee, eventName, transformer) => {
  const logFile = fs.createWriteStream(
    MAIN_LOG_FILE.split('.').join(`-${Date.now()}.`)
  );
  const errorFile = fs.createWriteStream(
    ERROR_LOG_FILE.split('.').join(`-${Date.now()}.`)
  );
  const readable = new stream.Readable({
    objectMode: true,
    read(size) {
      console.log(size);
    },
  });

  process.on('beforeExit', () => {
    readable.destroy();
    logFile.destroy();
    errorFile.destroy();
  });
  ee.on(eventName, async (date, level, category, message) => {
    console.log('appender file');
    const options = { objectMode: true };
    readable.push({ date, level, category, message });
    try {
      await readable.pipe(transformer).pipe(logFile);
      if (level === constLevele.ERROR) {
        console.log('PIPE TO ERROR');
        await readable.pipe(transformer).pipe(errorFile);
      }
      readable.push(null);
    } catch (err) {
      console.log(err);
    }
  });
};

export default { create };
