import 'reflect-metadata'; // We need this in order to use @Decorators

import config from '../config';

import express from 'express';

import Logger from './loaders/logger';

import cors from 'cors';

import cookieParser from 'cookie-parser';

import https from 'https'; // Import HTTPS module
import fs from 'fs'; // Import file system module

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

    let httpsServer;

    // if (process.env.NODE_ENV === 'production') {
    //     console.log('production');
    //     const privateKeyPath = '/home/ubuntu/API/key.pem'; // Path to private key
    //     const certificatePath = '/home/ubuntu/API/cert.pem'; // Path to certificate

    //     const privateKey = fs.readFileSync(privateKeyPath, 'utf8'); // Read private key file
    //     const certificate = fs.readFileSync(certificatePath, 'utf8'); // Read certificate file

    //     const credentials = { key: privateKey, cert: certificate }; // Create credentials object

    //     httpsServer = https.createServer(credentials, app); // Create HTTPS server
    // } else {
    //     httpsServer = app; // Use regular HTTP server for development
    // }

    httpsServer = app; // Use regular HTTP server for development

    const PORT = process.env.NODE_ENV === 'production' ? config.port : 2226; // Set different ports for production and development

    httpsServer
        .listen(PORT, () => {
            console.log(`Server listening on port:: ${PORT} in ${process.env.NODE_ENV} mode`);

            Logger.info(`
            ################################################
            🛡️  Server listening on port: ${PORT} 🛡️
            ################################################
        `);
        })
        .on('error', err => {
            Logger.error(err);
            process.exit(1);
            return;
        });
}

startServer();
