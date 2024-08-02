import 'dotenv/config';

import express from 'express';
import { ServerController } from './server';

const app = express();
const server = new ServerController(app);

server.loadGlobalMiddleware();
server.loadControllers();
server.run();
