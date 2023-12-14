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
    const allowedOrigins = [config.clientURL, config.mptAPI,'http://localhost:5095', 'http://localhost:2223'];

    app.use(
        cors({
            origin: allowedOrigins,
            credentials: true,
        }),
    );
    // app.all('/*', function (req, res, next) {
    //     // CORS headers
    //     res.header("Access-Control-Allow-Origin", "http://localhost:2223"); // restrict it to the required domain
    //     res.header("Access-Control-Allow-Credentials", "true");
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    //     // Set custom headers for CORS
    //     res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, save-path, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, X-Access-Token, X-Key');
    //     if (req.method == 'OPTIONS') {
    //       res.status(200).end();
    //     } else {
    //       next();
    //     }
    //   });
    // app.use(function(req, res, next) {
    //     res.header('Access-Control-Allow-Origin', req.header('origin') );
    //     next();
    //   });

    // app.use((req, res, next) => {
    //     const origin = req.get('origin');
    //     console.log('Request Origin:', origin);
        
    //     if (!origin || allowedOrigins.includes(origin)) {
    //         res.header('Vary', 'Origin'); // Add this line
    //         res.header('Access-Control-Allow-Credentials', 'true');
    //         res.header('Access-Control-Allow-Origin', origin);
    //         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //         res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
