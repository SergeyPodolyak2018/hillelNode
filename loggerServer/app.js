import http from 'http';
import router from './router.js';

const app = http.createServer(router);

export default app;
