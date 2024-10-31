import winston from 'winston';
import 'winston-mongodb';


export default winston.createLogger({
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log'}),
      new winston.transports.MongoDB({db: 'mongodb://localhost:27017/'}),
      new winston.transports.Console()
    ],
  });