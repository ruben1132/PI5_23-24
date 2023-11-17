import { Request, Response, NextFunction, CookieOptions } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';
import { IUserWithRoleDTO, IUserDTO } from '../dto/IUserDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class UserController implements IUserController /* TODO: extends ../core/infra/BaseController */ {
    constructor(@Inject(config.services.user.name) private userServiceInstance: IUserService) {}

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = (await this.userServiceInstance.createUser(req.body as IUserDTO)) as Result<IUserWithRoleDTO>;

            if (userOrError.isFailure) {
                return res.status(400).send({ error: userOrError.errorValue() });
            }

            const UserDTO = userOrError.getValue();
            return res.json(UserDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const usersOrError = (await this.userServiceInstance.getUsers()) as Result<Array<IUserWithRoleDTO>>;

            if (usersOrError.isFailure) {
                return res.status(400).send({ error: usersOrError.errorValue() });
            }

            return res.json(usersOrError.getValue()).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = (await this.userServiceInstance.getUserById(req.params.id)) as Result<IUserWithRoleDTO>;

            if (userOrError.isFailure) {
                return res.status(400).send({ error: userOrError.errorValue() });
            }

            return res.json(userOrError.getValue()).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = (await this.userServiceInstance.updateUser(req.body as IUserDTO)) as Result<IUserWithRoleDTO>;

            if (userOrError.isFailure) {
                return res.status(400).send({ error: userOrError.errorValue() });
            }

            const userDTO = userOrError.getValue();
            return res.json(userDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = (await this.userServiceInstance.deleteUser(req.params.id)) as Result<void>;

            if (userOrError.isFailure) {
                return res.status(400).send({ error: userOrError.errorValue() });
            }

            //204 - No content  - The server successfully processed the request, but is not returning any content
            //we will use 200 - OK and return a success message
            return res.status(200).send({ Success: 'User deleted successfully' });
        } catch (e) {
            return next(e);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.userServiceInstance.login(req.body.email, req.body.password);

            if (result.isFailure) {
                return res.status(400).send({ error: result.errorValue() });
            }

            const { token, userDTO } = result.getValue();

            // set token in cookie
            const cookieOptions: CookieOptions = {
                httpOnly: true,
                sameSite: 'none', // Allows cross-origin cookies
                secure: process.env.NODE_ENV === 'production', // Requires HTTPS if in production
            };

            res.cookie(config.cookieName, token, cookieOptions);


            return res.json(userDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            // destroy cookie
            res.clearCookie(config.cookieName);
            return res.json({}).status(201);
        } catch (e) {
            return next(e);
        }
    }
}
