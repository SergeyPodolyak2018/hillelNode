import net from 'node:net';
import { writeLogs } from './utils.js';

const socketServer = net.createServer((client) => {
  // 'connection' listener.
  console.log('client connected');
  client.on('end', () => {
    console.log('client disconnected');
  });
  client.on('data', (data) => {
    console.log(data.toString());
    writeLogs(data.toString());
  });
});
socketServer.on('error', (err) => {
  throw err;
});

export default socketServer;
