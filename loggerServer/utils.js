import { STATUS, CONTENT_JSON } from './constTipicalData.js';

const logs = [];

const readLogs = async () => {
  return logs;
};

const writeLogs = (log) => {
  logs.push(log);
};

const types = {
  undefined: (fn, req, res) => {
    res.writeHead(STATUS.NOT_FOUND, CONTENT_JSON);
    return {
      message: `Route Not Found`,
    };
  },
  function: (fn, req, res) => fn(req, res),
};

export { types, writeLogs, readLogs };
