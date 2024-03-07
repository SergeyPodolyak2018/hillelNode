import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const SOCKET_PORT = process.env['SOCKET_PORT'];
const SERVER_PORT = process.env['SERVER_PORT'];
const BASE_URI = process.env['BASE_URI'] || '';

export { SOCKET_PORT, SERVER_PORT, BASE_URI };
