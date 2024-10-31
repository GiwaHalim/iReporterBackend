require('express-async-errors')
// const express = require('express')
import express from 'express'
const app = express()
// const portDebugger = require('debug')('app:port')
import logger from './logger';
import logging from './startup/logging';
import config from './startup/config';
import db from './startup/db';
import routes from './startup/routes';

logging();
config();
db();
routes(app);


const port = process.env.PORT || 3005;
const server = app.listen(port, ()=> logger.info(`Listening on port ${port}...`))

module.exports = server