import 'reflect-metadata'; // We need this in order to use @Decorators

import config from '../config';

import express from 'express';

import Logger from './loaders/logger';

import cors from 'cors';

import cookieParser from 'cookie-parser';

async function startServer() {
    const app = express();

    // cookies middleware
    app.use(cookieParser());

    // Use the cors middleware
    const allowedOrigins = [config.clientURL, 'http://localhost:3000'];

    app.use(
        cors({
            origin: allowedOrigins,
            credentials: true,
        }),
    );

    app.options(
        '*',
        cors({
            origin: allowedOrigins,
            credentials: true,
        }),
    );

    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, () => {
        console.log('Server listening on port:: ' + config.port);

        Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
        return;
    });
}

startServer();
