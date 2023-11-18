import { Router } from 'express';
import { Container } from 'typedi';


import { celebrate, Joi } from 'celebrate';

import config from '../../../config';
import IAuthController from '../../controllers/IControllers/IAuthController';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    const ctrl = Container.get(config.controllers.auth.name) as IAuthController;

    route.post(
        '/signup',
        celebrate({
            body: Joi.object({
                username: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.string().required(),
            }),
        }),
    (req, res, next) => ctrl.signup(req, res, next),
    );

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

    route.get('/session', (req, res, next) => ctrl.session(req, res, next));

    route.post('/logout', (req, res, next) => ctrl.logout(req, res, next));
};
