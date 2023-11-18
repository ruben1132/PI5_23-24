import { Request, Response, NextFunction, CookieOptions } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IAuthController from './IControllers/IAuthController';
import IAuthService from '../services/IServices/IAuthService';
import { IUserWithRoleDTO } from '../dto/IUserDTO';
import { Result } from '../core/logic/Result';

@Service()
export default class AuthController implements IAuthController /* TODO: extends ../core/infra/BaseController */ {
    constructor(@Inject(config.services.auth.name) private authServiceInstance: IAuthService) {}

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.authServiceInstance.login(req.body.email, req.body.password);

            if (result.isFailure) {
                return res.status(400).send({ error: result.errorValue() });
            }

            const { token, userDTO } = result.getValue();

            this.setCookie(res, token);

            return res.json(userDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = (await this.authServiceInstance.signup(req.body)) as Result<{
                userDTO: IUserWithRoleDTO;
                token: string;
            }>;

            if (userOrError.isFailure) {
                return res.status(400).send({ error: userOrError.errorValue() });
            }

            const { token, userDTO } = userOrError.getValue();

            this.setCookie(res, token);

            return res.json(userDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            // destroy cookie
            res.clearCookie(config.cookieName);
            return res.json({message: "logged out successfully!"}).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async session(req: Request, res: Response, next: NextFunction) {
        try {
  
            const token = req.cookies[config.cookieName];
            
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized: Missing token' });
            }

            const result = await this.authServiceInstance.session(token);

            if (result.isFailure) {
                return res.status(400).send({ error: result.errorValue() });
            }

            const userDTO = result.getValue();

            return res.json(userDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    private setCookie(res: Response, token: string) {
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            sameSite: 'none', // Allows cross-origin cookies
            secure: process.env.NODE_ENV === 'production', // Requires HTTPS if in production
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        };

        res.cookie(config.cookieName, token, cookieOptions);
    }
}
