import chalk from 'chalk';
import http from 'node:http';
import app from '../src/app.js';

const normalizePort = value => {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    return value;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      break;
  }
  throw error;
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  const message = `\nserver run at ${bind}\n`;
  console.log(chalk.green(message));
};

const port = normalizePort(process.env.PORT || '8080');
const server = http.createServer(app.callback());

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
