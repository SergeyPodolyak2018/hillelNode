import fs from 'fs';
import stream from 'node:stream';
import { MAIN_LOG_FILE, ERROR_LOG_FILE } from '../envConstants.js';
import { level as constLevele } from '../constants.js';
import process from 'node:process';

const create = (ee, eventName, transformer) => {
  const logFile = fs.createWriteStream(
    MAIN_LOG_FILE.split('.').join(`-${Date.now()}.`)
  );

  const readableLog = new stream.Readable({
    objectMode: true,
    read(size) {},
  });

  const localTrans = transformer.create();

  process.on('beforeExit', () => {
    readableLog.destroy();
    logFile.destroy();
    errorFile.destroy();
    localTrans.destroy();
  });

  readableLog.pipe(localTrans).pipe(logFile);

  ee.on(eventName, (date, level, category, message) => {
    readableLog.push({ date, level, category, message });
  });
};

export default { create };
