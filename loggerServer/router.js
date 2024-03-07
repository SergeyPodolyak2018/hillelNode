import url from 'url';
import { getLogs } from './controllers/logs.js';
import { types } from './utils.js';
import { BASE_URI } from './const.js';

const routing = {
  [`${BASE_URI}/logs`]: getLogs,
};

const router = async (req, res) => {
  //write logic to parse request url and choose method from taskController according to endpoint
  const path = url.parse(req.url).pathname;
  console.log(path);
  //const metod = req.method;
  const rout = routing[path];
  const type = typeof rout;
  const serializer = types[type];
  const result = await serializer(rout, req, res);
  res.end(JSON.stringify(result));
};

export default router;
