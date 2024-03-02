import config from './config.js';
import { EventEmitter } from 'node:events';

import { scoreLevel, level } from './constants.js';
import * as appenderStrategy from './appenderStrategy.js';
import * as formatterStrategy from './formatterStrategy.js';

const ee = new EventEmitter();
const EVENT_NAME = 'log';

const logger = (category) => ({
  info: (...message) => {
    executeLog(level.INFO, category, message);
  },
  warn: (...message) => {
    executeLog(level.WARN, category, message);
  },
  error: (...message) => {
    executeLog(level.ERROR, category, message);
  },
  debug: (...message) => {
    executeLog(level.DEBUG, category, message);
  },
  trace: (...message) => {
    executeLog(level.TRACE, category, message);
  },
});

const formatter = formatterStrategy.getFormatter();
appenderStrategy.initAppenders(ee, EVENT_NAME, formatter);

function executeLog(level, category, message) {
  if (scoreLevel[level] <= config.scoreLevel) {
    ee.emit(EVENT_NAME, Date.now(), level, category, message);
  }
}

export default {
  getLogger(category) {
    return logger(category);
  },
};
