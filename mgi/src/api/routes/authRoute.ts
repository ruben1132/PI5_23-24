import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';


import { celebrate, Joi } from 'celebrate';

import config from '../../../config';
import IUserController from '../../controllers/IControllers/IUserController';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    const ctrl = Container.get(config.controllers.user.name) as IUserController;

    // route.post(
    //     '/signup',
    //     celebrate({
    //         body: Joi.object({
    //             firstName: Joi.string().required(),
    //             lastName: Joi.string().required(),
    //             email: Joi.string().required(),
    //             password: Joi.string().required(),
    //             role: Joi.string().required(),
    //         }),
    //     }),
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         const logger = Container.get('logger') as winston.Logger;
    //         logger.debug('Calling Sign-Up endpoint with body: %o', req.body);

    //         try {
    //             const authServiceInstance = Container.get(AuthService);
    //             const userOrError = await authServiceInstance.SignUp(req.body as IUserDTO);

    //             if (userOrError.isFailure) {
    //                 logger.debug(userOrError.errorValue());
    //                 return res.status(401).send(userOrError.errorValue());
    //             }

    //             const { userDTO, token } = userOrError.getValue();
    //             return res.status(201).json({ userDTO, token });
    //         } catch (e) {
    //             //logger.error('🔥 error: %o', e);
    //             return next(e);
    //         }
    //     },
    // );

    route.post(
        '/login',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.login(req, res, next),
    );

    route.post('/logout', (req, res, next) => ctrl.logout(req, res, next));
};
