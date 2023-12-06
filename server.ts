import app from './src/app';
import logger from './src/configs/logger.config';

function startServer() {
  const port = Number(process.env.PORT) || 7001;
  app.listen(port, '0.0.0.0', () => {
    const msg = 'server is listening at : ' + port;
    console.log(msg);
    logger.info(msg);
  });
}

startServer();