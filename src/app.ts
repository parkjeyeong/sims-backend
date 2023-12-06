import express, { Express } from 'express';
const app: Express = express();

/**
 * dotenv
 */
import dotenv from 'dotenv';
dotenv.config();

/**
 * bodyParser
 */
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * cors
 */
import cors from 'cors';
app.use(cors({
  origin: true,
  credentials: true
}));

import indexRouter from './routes';
app.use('/sims-api', indexRouter);

export default app;