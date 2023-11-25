import 'reflect-metadata';
import config from '../config';
import express, { Request, Response } from 'express';
import Logger from './loaders/logger';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import https from 'https';
import http from 'http'; // Import the 'http' module
import fs from 'fs';

async function startServer() {
    const app = express();

    console.log(process.env.NODE_ENV === 'production');

    app.use(cookieParser());

    const allowedOrigins = [config.clientURL, 'http://localhost:3000'];

    app.use(
        cors({
            origin: allowedOrigins,
            credentials: true,
        }),
    );

    await require('./loaders').default({ expressApp: app });

    app.get('/', (req: Request, res: Response) => {
        return res.send('Express Typescript on Vercel');
    });

    let server;

    if (process.env.NODE_ENV === 'production') {
        // Create HTTPS server for production
        server = https.createServer(
            {
                key: fs.readFileSync('/home/ubuntu/API/key.pem'),
                cert: fs.readFileSync('/home/ubuntu/API/cert.pem'),
            },
            app,
        );
    } else {
        // Create HTTP server for development
        server = http.createServer(app); // Use http.createServer for HTTP
    }

    server
        .listen(config.port, () => {
            console.log('Server listening on port:: ' + config.port);

            Logger.info(`
          ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
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
