import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import { celebrate, Joi } from 'celebrate';

import config from '../../../config';
import IUserController from '../../controllers/IControllers/IUserController';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    const ctrl = Container.get(config.controllers.user.name) as IUserController;

    route.post(
        '',
        celebrate({
            body: Joi.object({
                username: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.string().required(),
            }),
        }),
        (req: Request, res: Response, next: NextFunction) => {
            return ctrl.createUser(req, res, next);
        },
    );

    route.get('', (req, res, next) => ctrl.getUsers(req, res, next));

    route.get(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.getUserById(req, res, next),
    );

    route.put(
        '',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                username: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.updateUser(req, res, next),
    );

    route.delete(
        '/:id',
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
        }),
        (req, res, next) => ctrl.deleteUser(req, res, next),
    );
};
