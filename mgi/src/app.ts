import 'reflect-metadata'; // We need this in order to use @Decorators

import config from '../config';

import express from 'express';

import Logger from './loaders/logger';

import cors from 'cors';

import cookieParser from 'cookie-parser';

async function startServer() {
    const app = express();

    console.log(process.env.NODE_ENV === 'production');

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
   

    // app.use((req, res, next) => {
    //     const origin = req.get('origin');
    //     if (!origin || allowedOrigins.includes(origin)) {
    //       res.header('Access-Control-Allow-Credentials', 'true');
    //       res.header('Access-Control-Allow-Origin', origin);
    //       res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //       res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //     }
    //     next();
    // });


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
