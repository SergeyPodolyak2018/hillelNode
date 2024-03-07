import { STATUS, CONTENT_JSON } from '../constTipicalData.js';
import { readLogs } from '../utils.js';

const getLogs = async (req, res) => {
  res.writeHead(STATUS.OK, CONTENT_JSON);
  const logs = await readLogs();
  return logs;
};
const writeLogs = async () => {};

export { getLogs, writeLogs };
