import app from './app.js';
import server from './socketApp.js';

import { SERVER_PORT, SOCKET_PORT } from './const.js';

server.listen(SOCKET_PORT, () => {
  console.log(`The socket server is listening on port ${SOCKET_PORT}`);
});

app.listen(SERVER_PORT, () =>
  console.log(`The server is listening on port ${SERVER_PORT}`)
);
